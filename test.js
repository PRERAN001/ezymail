const {send} = require("./index.js");


send({
  from: "preran866@gmail.com",
    to: "preran248@gmail.com",
    subject: "checking the version 2.0.2 version of ezymail",    
    html: `<!DOCTYPE html>
      <html>
        <body style="font-family: Arial; background:#f4f4f4; padding:20px;">
          <h1 style="color:#4f46e5;">🚀 EzyMail</h1>
          <p>This is a HTML email.</p>

          <a href="https://example.com"
            style="background:#4f46e5; color:white; padding:10px 15px; text-decoration:none;">
            Visit Website
          </a>
        </body>
      </html>`
}).then((d) => {console.log("Email sent successfully")
  console.log("email sent??",d)
})
.catch((err) => console.error("Failed to send email:", err));
    
