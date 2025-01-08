import nodemailer from 'nodemailer'
export async function sendRealMail({to,name,subject,body}:{to:string;name:string;subject:string;body:string})
{
    const {SMTP_EMAIL,SMTP_PASSWORD}=process.env
    const  transporter=nodemailer.createTransport({
        service:'gmail',
        port:587,
        secure:false,
        host:'smtp.gmail.com',
        
        auth:{
            user:"mansourmaher77@gmail.com",
            pass:"rvxe zpfz dgfy juyh"
        }
    })
    try{
        const testresult=await transporter.verify()
        console.log('Connected to email server')
    }catch(e)
    {
        console.log(e)
    }
    try{
        const sendResult=await transporter.sendMail({
            from:SMTP_EMAIL,
            to,
            subject,
            html:body
        })
    }catch(e)
    {
        console.log(e)
    }
}
export async function sendPasswordResetEmail(email:string,token:string){ {
    const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
        secure: false,
        host: "smtp.gmail.com",
      auth: {
        user: "mansourmaher@gmail.com",
        pass:"rvxe zpfz dgfy juyh"
    },
    });
  
    const template = `
      <html>
        <body>
          <h1>Reset Password</h1>
          <p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">here</a> to reset your password</p>
        </body>
      </html>
    `;

  
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Reset Password",
        html: template,
    });
  
    transporter.close();
    }
}