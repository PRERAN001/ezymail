const dotenv=require("dotenv")
dotenv.config()
const express = require("express");
const { sendMail } = require("./lib/mailer");

const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
   res.send("EzyMail API is running");
})
app.post("/send", async (req, res) => {
   try {
      const { from, to, subject, body } = req.body;
      console.log("from",from,"to",to,"subject",subject,"body",body)

      const result = await sendMail({
         from,
         to,
         subject,
         body
      });

      res.json({
         success: true,
         result
      });


   } catch (err) {
      console.log("error",err)
      res.status(500).json({
         success: false,
         error: err.message
      });
   }
});

app.listen(3000, () => {
   console.log("Server running");
});