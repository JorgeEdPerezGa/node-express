const express = require('express');
const app = express();

app.use(express.static('public'));

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);

app.get('/', (request, response) => {});

//route handeler - defines the route displayed in the browser
app.get('/json', (request, response) => {
  response.sendFile(__dirname + '/data.json');
});

app.get('/sunsets', (request, response) => {
  response.sendFile(__dirname + '/public/sunsets.html');
})

app.use((request, response, next) => {
  response.status(404).sendFile(__dirname + '/public/404.html')
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
