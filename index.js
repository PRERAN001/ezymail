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
      "http://54.90.254.81:3000/send",
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