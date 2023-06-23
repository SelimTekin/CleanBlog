const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const path = require('path');
const Post = require('./models/Post');
const pageController = require('./controllers/pageControllers');
const postController = require('./controllers/postControllers');

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
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

app.get('/', postController.getAllPosts);

app.get('/posts/:id', postController.getPost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);

app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
