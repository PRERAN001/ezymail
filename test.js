const {send} = require("./index.js");

async function run() {
  const payload = {
    from: "preran248@gmail.com",
    to: "preran866@gmail.com",
    subject: "checking the version 2.0.2 version of ezymail",
    body:"hi there how are you doing???",
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
  };

  console.log("sending payload keys:", Object.keys(payload));
  const result = await send(payload);
  console.log("api response:", result);
}

run().catch((err) => {
  console.error("test failed:", err?.message || String(err));
});