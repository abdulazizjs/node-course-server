const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method}  ${req.url}`;
  console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      console.log('Unable to append to server.log.');
    });
  next();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
    })
})


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
})

app.listen(3000, (err) => {
  if(err) throw err;
  console.log('Hey, Server is running on port 3000');
});
