const express = require('express');
// const login = require('./controllers/login.controller');
const user = require('./controllers/user.controller');
const category = require('./controllers/categories.controller');
const post = require('./controllers/post.controller');
// const validateToken = require('./token/validateToken');
const authent = require('./middlewares/authentication');
const { 
  validationPassword, 
  validationEmail, 
  verifyUserAndPasswordDB, 
} = require('./middlewares/validationUser');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post(
  '/login', 
  validationPassword, 
  validationEmail, 
  verifyUserAndPasswordDB, 
  authent.tokenGenerator,
  async () => {},
);
app.post('/user', user.createUser);
app.get(
  '/user', 
  authent.verifyEmptyToken,
  authent.tokenValidation,
  user.getAllUsers,
);
app.get(
  '/user/:id',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  user.getUserById,
  );
app.post(
  '/categories', 
  authent.verifyEmptyToken,
  authent.tokenValidation,
  category.createCategory,
);
app.get(
  '/categories',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  category.getAllCategories,
);
app.get(
  '/post',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  post.getAllPosts,
);
app.get(
  '/post/:id',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  post.getPostById,
);
app.post(
  '/post',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  post.newPost,
);
app.put(
  '/post/:id', 
  authent.verifyEmptyToken,
  authent.tokenValidation, 
  post.editPost,
);
app.delete(
  '/post/:id',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  post.deletePost,
);
app.delete(
  '/user/me',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  user.deleteUser,
);
app.get(
  '/post/search',
  authent.verifyEmptyToken,
  authent.tokenValidation,
  post.search,
);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
