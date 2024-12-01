
import UserModel from '../models/userModel.js'
import bcryptjs from  'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import sendEmail from '../config/sendEmail.js'

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