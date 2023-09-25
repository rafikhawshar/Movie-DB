// Making the app works with express
const express = require("express");
const port = 5000;
const app = express();

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 },
];
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
app.get('/movies/create', (req, res) => {
  res.status(200).json({ status: 200, message: 'Create a movie' });
});

app.get('/movies/read', (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});
app.get('/movies/update', (req, res) => {
  res.status(200).json({ status: 200, message: 'Update a movie' });
});
app.get('/movies/delete', (req, res) => {
  res.status(200).json({ status: 200, message: 'Delete a movie' });
});

app.get('/movies/read/by-date', (req, res) => {
  const ByDate = movies.sort((a, b) => a.year - b.year);
  res.status(200).json({ status: 200, data: ByDate });
});


app.get('/movies/read/by-rating', (req, res) => {
  const ByRating = movies.sort((a, b) => b.rating - a.rating);
  res.status(200).json({ status: 200, data: ByRating });
});


app.get('/movies/read/by-title', (req, res) => {
  const ByTitle = movies.sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).json({ status: 200, data: ByTitle });
});
app.get('/movies/read/id/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (movie) {
    res.status(200).json({ status: 200, data: movie });
  } else {
    res.status(404).json({ status: 404, error: true, message: `The movie ${id} does not exist` });
  } 
});
app.get('/movies/add', (req,res)=>{

  let NewTitle=req.query.title;
  let NewYear = parseInt(req.query.year);
  let NewRating = parseFloat(req.query.rating) ;

  
  if(!req.query.title || !req.query.year){
      res.status(403).json({status:403, error:true, 
          message:'You cannot create a movie without providing a title and a year'})
  }
 else if(req.query.year.length !==4 || isNaN(req.query.year)){
          res.status(403).json({status:403, error:true, 
              message:'You cannot create a movie without providing a title and a year'})
  }
else  if(!NewRating) {
      NewRating=4;
  }
      const newmovie = {title : NewTitle, year:NewYear, rating:NewRating}
      movies.push(newmovie)
      res.status(200).json(movies)

})
app.get('/movies/delete/:id', (req,res)=>{
  const {id}=req.params;
  if(id>movies.length || id<1){
      res.status(404).json({status:404, error:true, message:`The movie ${id} does not exist`})
  } else{
      movies.splice(id-1, 1);
      res.status(200).json(movies)
  }
})
