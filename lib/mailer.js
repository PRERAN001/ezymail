const tls = require("tls");

const b64 = (str) => Buffer.from(str).toString("base64");

function sendMail({ from, to, subject, body, user, pass }) {
  return new Promise((resolve, reject) => {
    let step = 0;
    let buffer = "";

    const EMAIL=user||"ezymail0001@gmail.com"
    const PASSWORD=pass||"lfdw ipec avyv ipom"

    if (!EMAIL || !PASSWORD) {
      return reject("Missing SMTP credentials");
    }

    const socket = tls.connect(465, "smtp.gmail.com", {
      servername: "smtp.gmail.com"
    }, () => {
      
    });

    socket.setTimeout(10000);

    socket.on("timeout", () => {
      socket.destroy();
      reject("SMTP timeout");
    });

    socket.on("error", reject);

    socket.on("data", (data) => {
      buffer += data.toString();

      
      if (!buffer.endsWith("\r\n")) return;

      const msg = buffer;
      buffer = "";

      handleResponse(msg);
    });

    function handleResponse(msg) {
     

      if (msg.startsWith("220") && step === 0) {
        step++;
        socket.write("EHLO ezymail\r\n");
      }
      else if (msg.includes("AUTH") && step === 1) {
        step++;
        socket.write("AUTH LOGIN\r\n");
      }
      else if (msg.startsWith("334") && step === 2) {
        step++;
        socket.write(b64(EMAIL) + "\r\n");
      }
      else if (msg.startsWith("334") && step === 3) {
        step++;
        socket.write(b64(PASSWORD) + "\r\n");
      }
      else if (msg.startsWith("235") && step === 4) {
        step++;
        socket.write(`MAIL FROM:<${from}>\r\n`);
      }
      else if (msg.startsWith("250") && step === 5) {
        step++;
        socket.write(`RCPT TO:<${to}>\r\n`);
      }
      else if (msg.startsWith("250") && step === 6) {
        step++;
        socket.write("DATA\r\n");
      }
      else if (msg.startsWith("354") && step === 7) {
        step++;
        const boundary = "EZYM_BOUNDARY_" + Date.now();
        socket.write(
          `Subject: ${subject}\r\n` +
          `From: ${from}\r\n` +
          `To: ${to}\r\n` +
          `MIME-Version: 1.0\r\n` +
          `Content-Type: multipart/alternative; boundary="${boundary}"\r\n` +
          `\r\n` +

          `--${boundary}\r\n` +
          `Content-Type: text/plain; charset="UTF-8"\r\n` +
          `\r\n` +
          `${body}\r\n` +

          `--${boundary}\r\n` +
          `Content-Type: text/html; charset="UTF-8"\r\n` +
          `\r\n` +
          `${body}\r\n` +

          `--${boundary}--\r\n` +
          `.\r\n`
        );
        }
      else if (msg.startsWith("250") && step === 8) {
        socket.write("QUIT\r\n");
        resolve("Email sent");
      }
    }
  });
}

module.exports = { sendMail };


