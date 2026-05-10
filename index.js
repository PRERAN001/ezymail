async function send(data) {

   const res = await fetch(
      "https://racks-endangered-staffing-remark.trycloudflare.com/send",
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