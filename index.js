async function send(data) {
   const htmlContent = data?.html ?? data?.body;

   if (!htmlContent) {
      throw new Error("Missing content: provide html or body");
   }

   const payload = {
      ...data,
      html: htmlContent,
      body: data?.body ?? htmlContent
   };

   const res = await fetch(
      "https://racks-endangered-staffing-remark.trycloudflare.com/send",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(payload)
      }
   );

   return res.json();
}

module.exports = { send };