// Making the app works with express
const express = require ('express');
 const port = 5000 ;
 const app = express ();

// when opennig the local host it answers with ok
app.get('/', (req,res) => {
    res.send('Ok');

});

app.listen (5000, ()=> {
    console.log('running the server ')
})