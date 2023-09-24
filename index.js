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
app.get('/hello/:id?', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 200, message: `Hello, ${id}` });
});

app.get('/search', (req, res) => {
  const { s } = req.query;

  if (s) {
    res.status(200).json({ status: 200, message: 'ok', data: s });
  } else {
    res.status(500).json({ status: 500, error: true, message: 'You have to provide a search' });
  }
});