const http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder('utf-8');
  let body = '';
  req.on('data', function (data) {
    body += decode.write(data);
  });
  req.on('end', function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split('&');
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split('=');
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let number = Math.floor(Math.random() * 100);
let guessNumber = undefined;
// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <h1>Guess The Number Game</h1>
  <p>${
    guessNumber === undefined || isNaN(guessNumber)
      ? 'Input your number'
      : guessNumber > number
      ? 'Your number is high'
      : guessNumber < number
      ? 'Your number is low'
      : `Number ${guessNumber} is corrent`
  }</p>
  <form method="POST">
  <input name="guessNumber"></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log('req.method is ', req.method);
  console.log('req.url is ', req.url);
  if (req.method === 'POST') {
    getBody(req, (body) => {
      console.log('The body of the post is ', body);
      // here, you can add your own logic
      if (body['guessNumber']) {
        guessNumber = body['guessNumber'];
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: '/',
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log('The server is listening on port 3000.');
