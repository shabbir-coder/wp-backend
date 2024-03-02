// index.js
const express = require('express');
const connectDB = require('./connection/db');
const {initSocket} = require('./connection/socket');
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./api/routes');
require('dotenv').config();
const app = express();
const port = 3000;

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(bodyParser.json());

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('',(req,res)=>{
  res.send('Welcome to Backend')
})

const io = initSocket(server); // Initialize socket

app.use(express.json());

// Use the aggregated routes
app.use('/api', routes);

// Socket.io events can be handled here using 'io' object
// For example:
// io.on('someEvent', (data) => { /* handle event */ });
