# ezymail

A lightweight email-sending package built from scratch using raw SMTP, TLS, and Node.js sockets.

No heavy dependencies. No SMTP wrappers. Just direct protocol-level email handling.

---

# Features

- Raw SMTP communication
- TLS-secured email sending
- Promise-based API
- Supports plain text and HTML emails
- Minimal and lightweight
- Built for learning and experimentation

---

# Installation

```bash
npm install ezymail
```

---

# Usage

```js
const ezymail = require("ezymail");

ezymail.send({
  from: "your@gmail.com",
  to: "receiver@gmail.com",
  subject: "Test Email",
  html: "<p>Hello from ezymail</p>",
  user: "your@gmail.com",
  pass: "your_app_password"
})

```

If you call the HTTP API directly, send valid JSON with double-quoted keys:

```json
{
  "from": "your@gmail.com",
  "to": "receiver@gmail.com",
  "subject": "Hello",
  "html": "<h1>Hello from ezymail</h1>"
}
```

---

# Parameters

| Field     | Type   | Required | Description |
|-----------|--------|----------|-------------|
| from      | string | Yes | Sender email address |
| to        | string | Yes | Recipient email address |
| subject   | string | Yes | Email subject |
| html      | string | Yes | Email content (sned html) |
| body      | string | No  | Alias for `html` when using the HTTP API |
| user      | string | Yes | SMTP username |
| pass      | string | Yes | SMTP password or App Password |

---

# Gmail Setup

To use Gmail SMTP:

1. Enable 2-Step Verification
2. Generate an App Password
3. Use the App Password instead of your real password

Google may block insecure or suspicious SMTP logins from some cloud platforms.

---

# Example

```js
const ezymail = require("ezymail");

ezymail.send({
  from: "your@gmail.com",
  to: "friend@gmail.com",
  subject: "Hello",
  html: "<h1>Hello from ezymail</h1>",
  user: "your@gmail.com",
  pass: "your_app_password"
});
```

---

# How It Works

ezymail manually implements the SMTP protocol:

1. Connects to the SMTP server
2. Establishes a TLS-secured connection
3. Authenticates using `AUTH LOGIN`
4. Sends SMTP commands directly
5. Delivers the email
6. Closes the connection

---

# Deployment Notes

Some serverless platforms block outbound SMTP ports such as:

- 25
- 465
- 587

Because of this, raw SMTP may not work on platforms like:

- Vercel
- Netlify
- Cloudflare Workers

For production deployments, it is recommended to use:
- VPS hosting
- Dedicated servers
- Or an API-based mail transport layer

---

# Limitations

- No attachments yet
- No connection pooling
- Basic SMTP parsing
- Limited provider compatibility
- SMTP ports may be blocked on some cloud platforms

---

# Why This Package Exists

ezymail is primarily built for:

- Learning how SMTP works internally
- Understanding TLS and sockets
- Exploring low-level networking
- Building custom mail infrastructure

It is not intended to fully replace mature solutions like Nodemailer.

---

# Security Notes

- Never expose SMTP credentials publicly
- Always use App Passwords instead of your real password
- Do not hardcode credentials inside source code
- Use environment variables in production

Example:

```env
EMAIL=your@gmail.com
PASSWORD=your_app_password
```

---

# License

MIT