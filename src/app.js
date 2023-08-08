const express = require('express');
const login = require('./controllers/login.controller');
const user = require('./controllers/user.controller');
const category = require('./controllers/categories.controller');
const post = require('./controllers/post.controller');
const validateToken = require('./token/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login.loginUser);
app.post('/user', user.createUser);
app.get('/user', validateToken, user.getAllUsers);
app.get('/user/:id', validateToken, user.getUserById);
app.post('/categories', validateToken, category.createCategory);
app.get('/categories', validateToken, category.getAllCategories);
app.get('/post', validateToken, post.getAllPosts);
app.get('/post/:id', validateToken, post.getPostById);
app.post('/post', validateToken, post.newPost);
app.put('/post/:id', validateToken, post.editPost);
app.delete('/post/:id', validateToken, post.deletePost);
app.delete('/user/me', validateToken, user.deleteUser);
app.get('/post/search', validateToken, post.search);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
