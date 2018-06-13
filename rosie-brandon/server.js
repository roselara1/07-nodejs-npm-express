'use strict';

//DONE-TODO: Finish out the server code according to the instructions in the lab README
//Why are files in the public directory and how does ExpressJS serve local files?
//The public directory acts as a server directory. It receives the requests from ExpressJS and processes it. Then ExpressJS returns the information provided by the static file directory to the user.
const express = require('express');
//Instantiate Express dependency
const app = express();
const PORT = process.env.PORT || 4000;

// Serve public directory
app.use(express.static('./public'));

// Tell express to listen
app.listen(PORT, () => console.log(`Yo bro! Server is listening on port ${PORT}`));

//This route serves new.html to the user browser
app.get('/new', (request, response) => {
  console.log('Linked to new.html!');
  response.sendFile('public/new.html', {root: '.'});
});

// REVIEW: POST route needs to parse the body passed in with the request.
// POST middleware 
app.use(express.urlencoded({ extended: true }));

app.post('/articles', (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

//Provide 404 status and 404.html for 
app.use((request, response, next) => {
  console.log('404');
  response.status(404).sendFile('404.html', { root: './public' });
});
