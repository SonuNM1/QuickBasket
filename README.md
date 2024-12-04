
### Resend 

- Account Creation/Verification Emails:

Sending a welcome email to new users.
Sending OTPs or verification links to verify email addresses.

- Password Reset (Forgot Password):

Sending secure password reset links with expiration.

- Order Confirmation and Updates:

Confirming a successful order.
Sending updates about order status (e.g., shipped, out for delivery).

 - Promotional Emails:

Sending offers, discounts, and promotional campaigns.

 - Receipt/Invoice Emails:

Sending a digital receipt or invoice for purchases.



### Login controller logic  (validate user input -> hash and compare passwords -> generate and store tokens )


1. User authentication workflow 

- check if the user exists in the dabatase 

- verify the user's account status (active, inactive or suspended)

- compare the provided password with the stored hashed password using bcryptjs 

2. Token Generation 

- An access token (short-lived) is generated for immeditate authentication 

- A refresh token (long-lived) is generated to renew the access token without requiring the user to log in again 

3. Secure Cookies 

- Cookies are used to store the tokens securely on the client side 

- The 'httpOnly' flag prevents client-side scripts from accessing the cookies 

- The 'secure' flag ensures cookies are only sent over HTTPS 

- The sameSite: none option allows cross-origin requests, essential for applications with frontend and backend hosted on different domains 

4. Response 

- If successful, tokens are returned in both the cookies and the response body 

- If any step fails, an appropriate error message is sent back to the client 


### RESEND, Cloudinary, Node.js streams and Multer 


- Resend is email-sending service, that allows to send, manage, and track emails through APIs. 

- Cloudinary: cloud-based service that simplifies storing, optimizing and delivering images and videos. 

- Multer: is a Node.js middleware for handling file uploads. Save files to the server or pass them to coud services like Cloudinary. 

- Node.js Streams: are a way to process data in chunks, making them idea for handling large amounts of data. Instead of loading an entire file into memory, streams allows us to proces it piece by piece, saving memory and speeding up the performance. 


### User API Controller 


- Register User

- Verify email

- Login User

- Logout 

- Upload image (avatar)

- Update user details 

- Forgot password 

- Verify forgot password

- Reset password 

- Refresh token 