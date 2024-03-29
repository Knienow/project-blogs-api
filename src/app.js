const express = require('express');
const user = require('./controllers/user.controller');
const category = require('./controllers/categories.controller');
const post = require('./controllers/post.controller');
const authent = require('./middlewares/authentication');
const { 
  validationPassword, 
  validationEmail, 
  verifyUserAndPasswordDB, 
} = require('./middlewares/validationUser');
const postValidation = require('./middlewares/validationPost');

const app = express();

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
  authent.tokenValidationWithoutBearer,
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
  postValidation.validateCreate,
  post.newPost,
);
// app.put(
//   '/post/:id', 
//   authent.verifyEmptyToken,
//   authent.tokenValidation, 
//   post.editPost,
// );
// app.delete(
//   '/post/:id',
//   authent.verifyEmptyToken,
//   authent.tokenValidation,
//   post.deletePost,
// );
// app.delete(
//   '/user/me',
//   authent.verifyEmptyToken,
//   authent.tokenValidation,
//   user.deleteUser,
// );
// app.get(
//   '/post/search',
//   authent.verifyEmptyToken,
//   authent.tokenValidation,
//   post.search,
// );

module.exports = app;
