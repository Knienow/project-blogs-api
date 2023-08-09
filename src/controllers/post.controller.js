// const jwt = require('jsonwebtoken'); 
const { Op } = require('sequelize');
const { BlogPost, Category, User, PostCategory } = require('../models');
const postService = require('../services/post.service');
const userService = require('../services/user.service');

const verifyCategories = async (category) => {
  const findCategory = await Category.findAll({
    where: { id: category },
  });
  return findCategory;
};

const formattedPost = (object) => ({
    id: object.id,
    title: object.title,
    content: object.content,
    userId: object.userId,
    updated: object.updatedAt,
    published: object.createdAt,
  });

// async function verifyUsers(req) {
//     // const { authorization } = req.headers; 
//     // const decoded = jwt.decode(authorization);
//     // console.log('decoded2', decoded);
//   const decoded = req.user;      
//   const findId = await User.findOne({ where: { email: decoded.email } }); 
//    return findId.id;
//  }

async function verifyUsers(req) {
  // const { authorization } = req.headers; 
  // const decoded = jwt.decode(authorization);
  const decoded = req.user; 
    
 const findId = await User.findOne({ where: { email: decoded.email } });
 return findId.id;
}
  
const newPost = async (req, res) => {
    // const { email } = req;
    const { title, content, categoryIds } = req.body;
    // const { id } = await userService.getUserByEmail(email);
    // const infos = { title, content, userId: id };
    // const dataPost = await postService.create(infos, categoryIds);
    if (!title || !content || !categoryIds) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const verify = await verifyCategories(categoryIds);
    if (verify.length === 0) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    const findMail = await verifyUsers(req);
    
    const createPost = await BlogPost.create({ title, content, categoryIds, userId: findMail });
    const toFormat = formattedPost(createPost);
    await categoryIds.map((a) => PostCategory.create({ postId: toFormat.id, categoryId: a }));
    return res.status(201).json(toFormat);
    // return res.status(201).json(dataPost);
};

// const getPostById = async (req, res) => {
//   const { id } = req.params;
//   // const post = await BlogPost.findOne({
//   const post = await BlogPost.findByPk({
//     where: { id },
//     include: [
//       { model: User, as: 'user', attributes: { exclude: ['password'] } },
//       { model: Category, as: 'categories', attributes: ['id', 'name'] },
//     ],
//   });
//   if (!post) {
//     return res.status(404).json({ message: 'Post does not exist' });
//   }

//     return res.status(200).json(post);
// };

const getPostById = async (req, res) => {
  const { post } = req;
  return res.status(200).json(post);
};

const getAllPosts = async (_req, res) => {
  try {
    const response = await postService.getAll();
    return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  // const list = await BlogPost.findAll({
  //     include: [
  //     { model: User, as: 'user', attributes: { exclude: ['password'] } },
  //     { model: Category, as: 'categories', attributes: ['id', 'name'] },
  //   ],
  //   });
  //   return res.status(200).json(list);
};

// const formatEditPost = async (id) => {
//   const result = await BlogPost.findOne({
//       where: { id },
//       include: [
//         { model: User, as: 'user', attributes: { exclude: ['password'] } },
//         { model: Category, as: 'categories', attributes: ['id', 'name'] },
//       ],
//     });
//   return result;
// };

const editPost = async (req, res) => {
  // const { id } = req.params;
  // const { title, content } = req.body;
  // const toVerify = await verifyUsers(req);

  // const findByUser = await BlogPost.findAll({
  //     where: { id, userId: toVerify },
  // });
  
  // if (findByUser.length === 0) {
  //     return res.status(401).json({ message: 'Unauthorized user' });
  // }
  // if (!title || !content) {
  //     return res.status(400).json({ message: 'Some required fields are missing' });
  // }
  // await BlogPost.update(
  //     { title, content },
  //     { where: { id } },
  // );
  // const result = await formatEditPost(id);
  // return res.status(200).json(result);
  const { content, title } = req.body;
  const { id } = req.params;
  const response = await postService.edit({ content, title }, id);
  const dataUser = await userService.getByEmail(req.email);
  if (response.userId !== dataUser.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return res.status(200).json(response);
};

const deletePost = async (req, res) => {
  // const { id } = req.params;
  // const toVerify = await verifyUsers(req);  

  // const findByUser = await BlogPost.findAll({
  //     where: { id, userId: toVerify },
  // });

  // const postExist = await BlogPost.findOne({ where: { id } });
  
  // if (!postExist) {
  //     return res.status(404).json({ message: 'Post does not exist' });
  // }    

  // if (findByUser.length === 0) {
  //     return res.status(401).json({ message: 'Unauthorized user' });
  // }
  //   await BlogPost.destroy({ where: { id } });

  //   return res.status(204).end();
  try {
    const { content, title } = req.body;
    const { id } = req.params;
    const response = await postService.edit({ content, title }, id);
    const dataUser = await userService.getByEmail(req.email);
    if (response.userId !== dataUser.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const responseDelete = await postService.deletePost(id);
    return res.status(204).json(responseDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  const { q } = req.query;
  const result = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories' },
      ],
    });
    return res.status(200).json(result);
};

module.exports = {
    newPost,
    getPostById,
    getAllPosts,
    editPost,
    deletePost,
    search,
};