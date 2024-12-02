import UserModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'

/*

This function generates a refresh token for a user and stores it in the database. 

Refresh tokens are long-lived tokens used to issue new access tokens without requiring the user to log in again. 

*/

const generateRefreshToken = async (userId) => {

    // Generate the refresh token 

    const token = await jwt.sign(
        {id: userId},   // Payload: contains the user's unique ID 
        process.env.SECRET_KEY_REFRESH_TOKEN,    // Secret key for signing 
        {expiresIn: '7d'}       // token expiration time set to 7 days  
    )

    const updateRefreshTokenUser = await UserModel.updateOne(
        {_id: userId}, 
        {
            refresh_token: token
        }
    )
    return token 
}

export default generateRefreshToken

// 2.27