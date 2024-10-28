import express from "express";
import posts from "../data/posts.js";
const router = express.Router();

router.get("/", (req, res) => {
  const queries = ["userId", "title", "content"];
  for(const queryKey of queries){
    if(req.query[queryKey]){
      const post = posts.filter(post => post[queryKey] == req.query[queryKey]);
      return post ? res.json(post) : next();
    }
  }
  res.json(posts)
})

router.get("/:userId", (req, res, next) => {
  const post = posts.filter(post => post.userId == req.params.userId);
  if(post) res.json(post);
  else next();
})

router.get("/:userId/:title", (req, res, next) => {
  const post = posts.filter(post => post.userId == req.params.userId && post.title == req.params.title)
  if(post) res.json(post);
  else next();
})

router.get("/:userId/:postId", (req, res, next) => {
  const post = posts.filter(post => post.userId == req.params.userId && post.postId == req.params.postId);
  if(post) res.json(post);
  else next();
})

router.post("/", (req, res) => {
  if(req.body.userId && req.body.title && req.body.content){
    const postNumber = posts.reduce((acc, post) => post.userId == req.body.userId ? acc + 1 : acc, 0);
    
    const newPost = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      postId: postNumber + 1,
      title: req.body.title,
      content: req.body.content
    }
    posts.push(newPost);
    res.json(newPost);
  }
  else res.status(400).json({ error: "Insufficient data" });
})

router.patch("/:userId/:postId", (req, res, next) => {
  const post = posts.find(post => post.userId == req.params.userId && post.postId == req.params.postId);
  if(post){
    if(req.body.content) post.content = req.body.content;
    else res.status(400).json({ error: "You can only change the content of the post" });
    res.json(post);
  }
  else next();
})

router.delete("/:userId/:postId", (req, res, next) => {
  const post = posts.find(post => post.userId == req.params.userId && post.postId == req.params.postId);
  if(post){
    posts.splice(posts.indexOf(post), 1);
    res.json(post);
  }
  else next();
})

export default router