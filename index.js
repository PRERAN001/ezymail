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

   return res.json();
}

module.exports = { send };