const express = require('express');
const mongoose = require('mongoose');
const router = express.Router(); // Création d"un router

const Blogpost = require('../models/blogpost');


// Le router ne reagira que si on fait une requète /ping
router.get('/ping', (req, res) => {
	res.status(200).json({ msg: 'pong', date: new Date() });
});//localhost:3000/ping

//permet de récupérer tous les blogpost depuis mongoDB et les afficher trié par date
router.get('/blog-posts', (req, res) => {
	Blogpost.find()
		.sort({ 'createdOn': -1 })
		.exec()
		.then(blogposts => res.status(200).json(blogposts))
		.catch(err => res.status(500).json({
			message:'blog post not found :\'(',
			error: err
		}));
	
	
	//res.status(200).json(posts);

} );

//Create document
router.post('/blog-posts', (req, res) => {
	console.log('req.body', req.body);
	const blogPost = new Blogpost(req.body);
	blogPost.save((err, blogPost) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(200).json(blogPost);
	});
});

//Read document by id
router.get('/blog-posts/:id', (req, res) => {
	const id = req.params.id;
	Blogpost.findById(id)
		.then(blogPost => res.status(200).json(blogPost))
		.catch(err => res.status(500).json({ message:`Blogpost with id : ${id} not found`,err:err }));
});

//DELETE document by id on blogposts
router.delete('/blog-posts/:id', (req,res) => {
	const id = req.params.id;
	Blogpost.findByIdAndDelete(id, (err, blogPost) =>{
		if(err){
			return err.status(404).json(err);
		}
		res.status(202).json({ msg: `blog post with id ${blogPost._id} has been deleted ` });
	});
});




module.exports = router;



