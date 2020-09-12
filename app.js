const express = require('express');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
})

app.get('/posts', (req, res) => {
  res.status(200).json({ message: 'posts'});
})

app.listen(3000, () => console.log('listening port 3000'));