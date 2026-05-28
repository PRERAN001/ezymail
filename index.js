const MailQueue = require("./lib/paralllel")

let queue;

async function readApiResponse(res) {
    const bodyText = await res.text();

    let parsedBody = bodyText;
    try {
        parsedBody = JSON.parse(bodyText);
    } catch (_) {
        // Keep the original text when the response is not JSON.
    }

    if (!res.ok) {
        const errorMessage = typeof parsedBody === "string"
            ? parsedBody.slice(0, 200)
            : parsedBody?.error || bodyText.slice(0, 200);

        throw new Error(`Request failed (${res.status}): ${errorMessage}`);
    }

    return parsedBody;
}

async function send(data) {
   const htmlContent = data?.html
   console.log("content ",data)

   if (!htmlContent) {
      throw new Error("Missing content: provide html");
   }

   const payload = {
      ...data,
      html: htmlContent,
      
   };

   const res = await fetch(
      "http://54.90.254.81:3000/send",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(payload)
      }
   );

    return readApiResponse(res);
}


function buildMailTask(data) {
    return async () => {
        const { html: htmlContent } = data
        if (!htmlContent) throw new Error("Missing content: provide html")

        console.log("Sending to:", data.to)

        const res = await fetch("http://54.90.254.81:3000/sendmailinseq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        return readApiResponse(res)
    }
}

async function sendseqmail(users, data, n) {
    const queue = new MailQueue({
        totalMails: n,
        batchSize: 20,
        concurrency: 5
    })

    
    const tasks = users.map(user =>
        buildMailTask({
            from:    data?.from,
            to:      user,
            subject: data?.subject,
            html:    data?.html,
            user:    data?.user,
            pass:    data?.pass
        })
    )

    
    await queue.process(tasks)
}
module.exports = { send ,sendseqmail};