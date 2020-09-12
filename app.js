const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to db')
});

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = require('./routes/posts');

app.use('/posts', posts);

app.get('/', async (req, res) => {
  await mongoose.connection.collections.posts.drop();
  res.status(200).json({
    message: 'ok'
  });
})


app.listen(3000, () => console.log('listening port 3000'));