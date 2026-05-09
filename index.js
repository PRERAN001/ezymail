async function send(data) {

   const res = await fetch(
      "https://ezymail.onrender.com/send",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
      }
   );

   return res.json();
}

module.exports = { send };