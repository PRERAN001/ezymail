
# ezymail

A minimal SMTP email sender built from scratch using Node.js sockets and TLS.

No external dependencies. No abstractions. Just raw SMTP.

---

## Features

- Direct SMTP communication (no third-party libraries)
- STARTTLS support (secure email sending)
- Promise-based API
- Fully dynamic fields (from, to, subject, body)
- Lightweight and simple

---

## Installation

```bash
npm install ezymail
````

---

## Usage

```js
const mailer = require("ezymail")

mailer.send({
  from: "your@gmail.com",
  to: "receiver@gmail.com",
  subject: "Test Email",
  body: "Hello from ezymail",
  user: "your@gmail.com",
  pass: "your_app_password"
})
.then(res => console.log(res))
.catch(err => console.error(err))
```

---

## Parameters

| Field   | Type   | Required | Description                              |
| ------- | ------ | -------- | ---------------------------------------- |
| from    | string | Yes      | Sender email address                     |
| to      | string | Yes      | Recipient email address                  |
| subject | string | Yes      | Email subject                            |
| body    | string | Yes      | Email body (plain text)                  |
| user    | string | Yes      | SMTP username (usually same as `from`)   |
| pass    | string | Yes      | SMTP password (App Password recommended) |

---

## Gmail Setup

To use with Gmail:

1. Enable 2-Step Verification
2. Generate an App Password
3. Use that App Password instead of your real password

---

## Example

```js
const { sendMail } = require("ezymail")

sendMail({
  from: "your@gmail.com",
  to: "friend@gmail.com",
  subject: "Hello",
  body: "This email was sent using raw SMTP",
  user: "your@gmail.com",
  pass: "app_password"
})
```

---

## How it works

This package implements the SMTP protocol manually:

1. Connects to SMTP server (TCP)
2. Upgrades connection using STARTTLS
3. Authenticates using base64 (AUTH LOGIN)
4. Sends email using SMTP commands
5. Closes connection

---

## Limitations

* Supports only plain text emails
* No attachments (yet)
* No HTML email support
* No connection pooling
* Basic error handling

---

## Why this package exists

This is not meant to replace libraries like Nodemailer.

Instead, it is built for:

* Learning how SMTP works internally
* Understanding low-level networking
* Building custom email systems

---

## Security Notes

* Do NOT use your real Gmail password
* Always use App Passwords
* Do not expose credentials in public repositories



## License

MIT

```

---
