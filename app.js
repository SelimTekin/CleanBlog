const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const app = express();

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// template engine'imizin ejs olduğunu belirttik
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public')); // static dosyalarımızın public klasörü içinde olduğunu belirtik.
app.use(express.urlencoded({ extended: true })); // url'deki datayı okumamızı sağlar.
app.use(express.json()); // url'deki datayı json formatına döndürür.

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});

app.get('/posts/:id', async (req, res) => {

  // tıklanan postun id'sini aldık
  const post = await Post.findById(req.params.id)
  
  // post.ejs dosyasına gönderdik postu
  res.render('post', {
    post
  });

});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
