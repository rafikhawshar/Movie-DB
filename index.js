// Making the app works with express
const express = require("express");
const port = 5000;
const app = express();

// when opennig the local it answers with ok
app.get("/", (req, res) => {
  res.send("Ok ");
});

app.listen(5000, () => {
  console.log("running the server ");
});

app.get("/test", (req, res) =>{

    res.send({ status: 200, message: "ok" })
})
app.get('/time',(req,res)=>{
    const currentDate = new Date ();
    res.send({status:200, message:`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`})
})