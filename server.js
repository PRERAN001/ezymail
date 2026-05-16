const dotenv=require("dotenv")
dotenv.config()
const express = require("express");
const { sendMail } = require("./lib/mailer");

const app = express();
const cors = require('cors');
app.use(cors()); 


app.use(cors({ origin: '*' }));
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
   res.send("EzyMail API is running v 2.0.5");
})
app.post("/send", async (req, res) => {
   try {
      const { from, to, subject, html } = req.body || {};
      
      const content = html;

      if (!from || !to || !subject || !content) {
         return res.status(400).json({
            success: false,
            error: "Missing required fields. Expected from, to, subject, and html."
         });
      }

      const result = await sendMail({
         from,
         to,
         subject,
         html: content,
         
      });

      return res.json({        // ← add return
         success: true,
         result
      });

   } catch (err) {
      return res.status(500).json({    // ← add return
         success: false,
         error: err?.message || String(err)
      });
   }
});

app.listen(3000, () => {
   console.log("Server running");
   console.log("v 2.0.5")
});
