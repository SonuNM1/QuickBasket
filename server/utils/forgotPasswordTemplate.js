
const forgotPasswordTemplate = ({name, otp}) => {
    return `
        <div>
            <p>Dear, ${name}</p>
            <p>You've requested a password reset. Please use following OTP code to reset your password.</p>
            <div style='background: yellow ; font-size: 20px ; padding: 20px; text-align: center; font-weight: 800'>
                ${otp}
            </div>
            <p>This OTP is valid for 1 hour only. Enter this OTP in the QuickBasket website to proceed with resetting your password.</p>
            </br>
            <br/>
            <p>Thanks</p>
            <p>QuickBasket</p>
        </div>
    `
}

export default forgotPasswordTemplate 