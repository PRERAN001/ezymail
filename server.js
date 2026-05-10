const dotenv=require("dotenv")
dotenv.config()
const express = require("express");
const { sendMail } = require("./lib/mailer");

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({
         success: false,
         error: "Invalid JSON payload. Make sure the request body uses double-quoted property names and string values."
      });
   }

   next(err);
});

app.get("/",(req,res)=>{
   res.send("EzyMail API is running");
})
app.post("/send", async (req, res) => {
   try {
      const { from, to, subject, html, body } = req.body || {};
      const content = html ?? body;

      if (!from || !to || !subject || !content) {
         return res.status(400).json({
            success: false,
            error: "Missing required fields. Expected from, to, subject, and html (or body)."
         });
      }

      console.log("from",from,"to",to,"subject",subject,"html",content)

      const result = await sendMail({
         from,
         to,
         subject,
         html: content
      });

      res.json({
         success: true,
         result
      });


   } catch (err) {
      console.log("error",err)
      res.status(500).json({
         success: false,
         error: err?.message || String(err)
      });
   }
});

app.listen(3000, () => {
   console.log("Server running");
   console.log("v 1.2.1")
});