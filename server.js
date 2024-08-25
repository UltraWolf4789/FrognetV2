const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use Replit's port or default to 3000

// Enable CORS
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

app.get('/fetch', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).send('Missing "url" parameter');
    return;
  }

  request(targetUrl, { followRedirect: true }, (error, response, body) => {
    if (error) {
      res.status(500).send('Error forwarding request');
      return;
    }

    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
