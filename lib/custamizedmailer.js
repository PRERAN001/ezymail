const tls = require("tls");

const b64 = (str) => Buffer.from(str).toString("base64");

function sendmailinseq({ from, to, subject, html, user, pass }) {
  return new Promise((resolve, reject) => {
   

    let step = 0;
    let buffer = "";
    let settled = false;

    
    

    if (!user || !pass) {
      return reject(new Error("Missing SMTP credentials"));
    }

    const socket = tls.connect(
      465,
      "smtp.gmail.com",
      { servername: "smtp.gmail.com" },
      () => {}
    );

    socket.setTimeout(15000);

    socket.on("timeout", () => {
      socket.destroy();
      if (!settled) {
        settled = true;
        reject(new Error("SMTP timeout"));
      }
    });

    socket.on("error", (err) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    });

    socket.on("data", (data) => {
      buffer += data.toString();

      
      const lines = buffer.split("\r\n");
      const lastMeaningfulLine = lines.filter(l => l.length > 0).pop() || "";

      const isComplete = /^\d{3} /.test(lastMeaningfulLine);
      if (!isComplete) return;

      const msg = buffer;
      buffer = "";

      handleResponse(msg);
    });

    function handleResponse(msg) {
      console.log(`[SMTP step ${step}]:`, msg.trim());

      if (step === 0 && msg.startsWith("220")) {
        step++;
        socket.write("EHLO ezymail\r\n");

      } else if (step === 1 && msg.includes("250")) {
        
        step++;
        socket.write("AUTH LOGIN\r\n");

      } else if (step === 2 && msg.startsWith("334")) {
        step++;
        socket.write(b64(user) + "\r\n");

      } else if (step === 3 && msg.startsWith("334")) {
        step++;
        socket.write(b64(pass) + "\r\n");

      } else if (step === 4 && msg.startsWith("235")) {
        step++;
        socket.write(`MAIL FROM:<${from}>\r\n`);

      } else if (step === 5 && msg.startsWith("250")) {
        step++;
        socket.write(`RCPT TO:<${to}>\r\n`);

      } else if (step === 6 && msg.startsWith("250")) {
        step++;
        socket.write("DATA\r\n");

      } else if (step === 7 && msg.startsWith("354")) {
        step++;

        const boundary = "myboundary123";
        

        socket.write(
        `Subject: ${subject}\r\n` +
        `From: ${from}\r\n` +
        `To: ${to}\r\n` +
        `MIME-Version: 1.0\r\n` +
        `Content-Type: text/html; charset="UTF-8"\r\n` +
        `\r\n` +
        `${html}\r\n` +
        `\r\n.\r\n`
      );

      } else if (step === 8 && msg.startsWith("250")) {
        socket.write("QUIT\r\n");
        if (!settled) {
          settled = true;
          resolve({ email_sent: true, status: 200 });
        }

      } else {
        console.error(`[SMTP] Unexpected response at step ${step}:`, msg.trim());
        socket.destroy();
        if (!settled) {
          settled = true;
          reject(new Error(`SMTP error at step ${step}: ${msg.trim()}`));
        }
      }
    }
  });
}

module.exports = { sendmailinseq };