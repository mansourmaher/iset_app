import { sendRealMail } from "./real_mail/mail"
import path from "path"
import fs from 'fs'



export const sendVerificationEmail=async(email:string,token:string)=>
{
    const confirmLink=`${process.env.NEXT_PUBLIC_APP_URL}/new-verification?token=${token}`
   

    const emailBody = `
     <!DOCTYPE html>
    
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 40px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify your account</h1>
    </div>
    <div class="content">
      <h2>Hello,</h2>
      <p>Thank you for signing up for our e-learning platform. To complete your registration, please click the button below to verify your account.</p>
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="${confirmLink}" class="button">Verify Account</a>
      </div>
      <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
    </div>
    <div class="footer">
      <p>&copy; 2023 E-Learning Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;
    

    await sendRealMail({
        
        to: email,
        name: email,
        subject: 'Confirm your email',
        body: emailBody,
    })


}

export const sendPasswordResetEmail=async(email:string,token:string)=>
{
    
    const confirmLink=`${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
    // const templatePath = path.join(process.cwd(), 'app', 'emailtemplates', 'resetpassword.html');
    // const source = fs.readFileSync(templatePath, 'utf8');
    // const template = handelbars.compile(source);
    // const htmlWithInlineStyles = juice(template({ confirmLink }));
    
    // await sendRealMail({
       
    //     to: email,
    //     name: email,
    //     subject: 'Reset your password',
    //     body: htmlWithInlineStyles,
    // })
    const emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset your password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 40px 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #007bff;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 40px;
        }
        .button {
          display: inline-block;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reset your password</h1>
        </div>
        <div class="content">
          <h2>Hello,</h2>
          <p>
            We received a request to reset your password. If you did not make this request, you can safely ignore this email.
          </p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${confirmLink}" class="button">
              Reset Password
            </a>
          </div>
          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
          <p>&copy; 2023 E-Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
    await sendRealMail({
        to:email,
        name:email,
        subject:'Reset your password',
        body:emailBody
    })
}
export const sendRejectionEmail = async (email: string, name: string, reason: string) => {
    // Update the path to match your directory structure
    const templatePath = path.join(process.cwd(), 'app', 'emailtemplates', 'rejectcourse.html');
    const source = fs.readFileSync(templatePath, 'utf8');
  
    // Use Handlebars to compile the template with dynamic data
    // const template = handelbars.compile(source);
    // const html = template({ name, reason });
  
    // // Inline the CSS styles
    // const htmlWithInlineStyles = juice(html);
  
    // // Send the email
    // await sendRealMail({
    //   to: email,
    //   name,
    //   subject: 'Your course submission has been rejected',
    //   body: htmlWithInlineStyles,
    // });
    }
  
   
  