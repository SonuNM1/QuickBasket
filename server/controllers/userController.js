
import UserModel from '../models/userModel.js'
import bcryptjs from  'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import sendEmail from '../config/sendEmail.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import uploadImageCloudinary from '../utils/uploadImageCloudinay.js'

// Controller function for User registration 

export async function registerUserController(req, res){
    try{

        // Extracting name, email, password from the request body 

        const {name, email, password} = req.body 

        // Check if all fields are provided

        if(!name || !email || !password){
            return res.status(400).json({
                message: 'Provide email, name and password',
                error: true,
                success: false
            })
        }

        // Check if a user with the given email already exists in the database 

        const user = await UserModel.findOne({email})

        if(user){
            return res.json({
                message: 'Already registered email',
                error: true, 
                success: false
            })
        }

        // Hash the user's password for security 

        const salt = await bcryptjs.genSalt(10)
        const hashPassword= await bcryptjs.hash(password, salt)

        // Payload for creating a new user 

        const payload = {
            name,
            email, 
            password: hashPassword
        }

        // Create a new user using the payload and save it to the database 

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        // Generate a verification email URL - Example: http://frontend-url.com/verify-email?code=USER_ID

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        // Send the verification email to the user 

        const verifyEmail = await sendEmail({
            sendTo : email,     // Recipient's email
            subject : 'Verify email from QuickBasket',      // Subject line of the email 
            html : verifyEmailTemplate({
                name,       // User's name for the personalized email 
                url: VerifyEmailUrl     // Verification link 
            })
        })

        // Respond with success if the user is registered and email is sent 

        return res.json({
            message: 'User registration successful', 
            error: false, 
            success: true,
            data: save
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message || error, 
            error: true, 
            success: false
        })
    }
}

/* The function handles the email verification process after the user clicks on the verification link sent during registration */

export async function verifyEmailController(req, res){
    try{

        // Extract the 'code' from the req body 

        const {code} = req.body 

        // find the user in the database with the provided code 

        const user = await UserModel.findOne({_id: code})

        // If no user found, return an error response

        if(!user){
            return res.status(400).json({
                message: 'Invalid code',
                error: true, 
                success: false
            })
        }

        // Update the user's 'verify_email' field to true to true to mark the email as verified - find the user by their ID (code), update the 'verify_email' field 

        const updateUser = await UserModel.updateOne({_id: code}, {
            verify_email: true
        })

        // respond with the success message 

        return res.json({
            message: 'Email verification done', 
            success: true, 
            error: false
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error, 
            error: true, 
            success: true
        })
    }
} 


/* Login controller - verify user credentials, generate authentication token , and securely store them in cookies */


export async function loginController(req, res){
    try{
        const {email, password} = req.body 

        if(!email || !password){
            return res.status(400).json({
                message: 'Provide email and password',
                error: true,
                success: false
            })
        }

        // checking if the user exists in the database 

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
               message: 'User not registered',
               error: true, 
               success: false 
            })
        }

        // Check if the user's account is active 

        if(user.status !== 'Active'){
            return res.status(400).json({
                message: 'Contact to Admin', 
                error: true,
                success: false
            })
        }

        // comparing the provided password with the hashed password stored 

        const checkPassword = await bcryptjs.compare(password, user.password)

        // if the password is incorrect, return an error response 

        if(!checkPassword){
            return res.status(400).json({
                message: 'Check your password',
                error: true,
                success: false
            })
        }

        // Generating an access token (short-lived) and a refresh token (long-lived)

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        // Set secure options for cookies 

        const cookiesOption = {
            httpOnly: true, // prevents Javascript from accessing the 
            secure: true,   // Ensures cookies are only sent over HTTPS
            sameSite: 'None'    // Enables cross-site requests 
        }

        // Send tokens as cookies to the client 

        res.cookie('accessToken', accessToken, cookiesOption )
        res.cookie('refreshToken', refreshToken, cookiesOption )

        // Send success response with tokens 

        return res.status(200).json({
            message: 'Login successfully', 
            error: false, 
            success: true,
            data: {
                accessToken,    // returns the access and refresh token in the response 
                refreshToken   
            }
        })

    }catch(error){
        return res.json({
            message: error.message || error, 
            error: true,
            success: false
        })
    }
}


/* Logout Controller */


export async function logoutController(req, res){
    try{
        
        const userid = req.userId   // auth middleware 

        // The 'cookiesOption' object contains configuration settings for cookies when they are sent to the user's browser. These options help define the security and behavior of the cookie. 

        const cookiesOption = {
            httpOnly: true, // protects the cookie from client-side scripts  
            secure: true,   // ensures cookies are sent only over HTTPS
            sameSite: 'None'    // governs how cookies are shared across domains
        }

        // Clearing cookies - remove the 'accessToken' and 'refreshToken' cookies from the user's browser 

        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        // Removing the refresh token from the database - updates the 'refresh_token' field in the user's database entry to an empty string 

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ''
        })

        return res.json({
            message: 'Logout successfully',
            error: false, 
            success: true
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false 
        })
    }
}


/* Upload user avatar */


export async function uploadAvatar(req, res){
    try{

        const userId = req.userId   // auth middleware 

        const image = req.file      // multer middleware 

        if(!image){
            return res.status(400).json({
                message: ' No file uploaded.'
            })
        }

        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.json({
            message: 'Profile picture uploaded successfully',
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
    }catch(error){
        return res.status(500).json({
            message: error.message || error, 
            error: true, 
            success: false
        })
    }
}

// 3.12 