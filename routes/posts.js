const express = require('express');
const Post = require('../models/Post');
const { Mongoose } = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Post.find({}).sort({
      date: -1
    }));
  } catch (err) {
    res.status(404).json(err)
  }

})

router.post('/', async (req, res) => {
  const {
    title,
    description
  } = req.body;
  const newPost = new Post({
    title,
    description
  });
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json(e);
  }
})

router.get('/:postId', async (req, res) => {
  try {
    res.status(200).json(await Post.findById(req.params.postId))
  } catch (e) {
    res.status(404).json(e)
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    const result = await Post.remove({
      _id: req.params.postId
    });
    res.status(200).json({
      message: "Successfully deleted"
    })
  } catch (e) {
    res.status(404).json(e)
  }
})

router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({
      _id: req.params.postId
    }, {
      $set: {
        title: req.body.title
      }
    });
    res.status(404).json(updatedPost);
  } catch (e) {
    res.status(404).json(e)
  }
})


module.exports = router;