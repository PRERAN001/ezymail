const net = require("net")
const tls = require("tls")
const b64 = (str) => Buffer.from(str).toString("base64")
function sendMail({ from, to, subject, body, user, pass }) {
  return new Promise((resolve, reject) => {
    let socket
    let step = 0

    EMAIL=user||"ezymail0001@gmail.com"
    PASSWORD=pass||"lfdw ipec avyv ipom"

if(!EMAIL||!PASSWORD)return reject("Missing SMTP credentials")
    function connect() {
      socket = net.createConnection(587, "smtp.gmail.com")
      socket.on("data", handleResponse)
      socket.on("error", reject)
    }

    function upgradeToTLS() {
      socket = tls.connect(
        { socket, servername: "smtp.gmail.com" },
        () => socket.write("EHLO ezymail\r\n")
      )

      socket.on("data", handleResponse)
    }

    function handleResponse(data) {
      const msg = data.toString()

      if (msg.startsWith("220") && step === 0) {
        step++
        socket.write("EHLO ezymail\r\n")
      }
      else if (msg.includes("STARTTLS") && step === 1) {
        step++
        socket.write("STARTTLS\r\n")
      }
      else if (msg.startsWith("220") && step === 2) {
        step++
        upgradeToTLS()
      }
      else if (msg.includes("AUTH") && step === 3) {
        step++
        socket.write("AUTH LOGIN\r\n")
      }
      else if (msg.startsWith("334") && step === 4) {
        step++
        socket.write(b64(EMAIL) + "\r\n")
      }
      else if (msg.startsWith("334") && step === 5) {
        step++
        socket.write(b64(PASSWORD) + "\r\n")
      }
      else if (msg.startsWith("235") && step === 6) {
        step++
        socket.write(`MAIL FROM:<${from}>\r\n`)
      }
      else if (msg.startsWith("250") && step === 7) {
        step++
        socket.write(`RCPT TO:<${to}>\r\n`)
      }
      else if (msg.startsWith("250") && step === 8) {
        step++
        socket.write("DATA\r\n")
      }
      else if (msg.startsWith("354") && step === 9) {
        step++
        socket.write(
          `Subject: ${subject}\r\n` +
          `From: ${from}\r\n` +
          `To: ${to}\r\n` +
          `\r\n` +
          `${body}\r\n` +
          `.\r\n`
        );
      }
      else if (msg.startsWith("250") && step === 10) {
        socket.write("QUIT\r\n");
        resolve("Email sent");
      }
    }

    connect();
  });
}

module.exports = { sendMail };