import jwt from "jsonwebtoken";

/*

This function generates a JSON Web Token (JWT) for a user, for user authentication. 

*/

const generateAccessToken = async (userId) => {

    // Create the JWT token 

  const token = await jwt.sign(
    { id: userId },     // Payload: contains the user's unique ID 
    process.env.SECRET_KEY_ACCESS_TOKEN,    // secret key for signing the 
    { expiresIn: "5h" }  // token expiration time set to 5 hours 
  );
  return token 
};

export default generateAccessToken
