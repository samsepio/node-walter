const express=require('express');
const Image=require('../model/database2');
const Comentary=require('../model/database3');
const Upload=require('../model/database4');
const router=express.Router();
const {isAuthenticated} = require('../helpers/auth');

router.get('/profile',isAuthenticated,(req,res,next)=>{
	res.render('profile');
});
router.post('/profile',async(req,res,next)=>{
	const {name,favorite,year,title,descript,description,religion} = req.body;
	const errors = [];
	if(name.length <= 0 || favorite.length <= 0 || year.length <= 0 || title.length <= 0 || descript.length <= 0 || description.length <= 0 || religion.length <= 0){
		errors.push({text: 'todos los campos son hobligatorios'});
	}
	if(year <= 8 || year >= 18){
		errors.push({text: 'edad invalida'});
	}
	if(errors.length > 0){
		res.render('profile',{name,favorite,email,year,title,descript,description,religion,errors});
	}else{
		const image = new Image();
		image.title = req.body.title;
		image.favorite = req.body.favorite;
		image.name = req.body.name;
		image.email = req.body.favorite;
		image.year = req.body.year;
		image.title = req.body.title;
		image.descript = req.body.descript;
		image.description = req.body.description;
		image.religion = req.body.religion;
		image.originalname = req.file.originalname;
		image.mimetype = req.file.mimetype;
		image.fieldname = req.file.fieldname;
		image.fieldname = req.file.fieldname;
		image.size = req.file.size;
		image.encoding = req.file.encoding;
		image.filename = req.file.filename;
		image.path = '/img/uploads/'+ req.file.filename;
		image.user = req.user.id;
		await image.save();
		console.log(image);
		res.redirect('/profiles');
	}
});
router.get('/newphotho',isAuthenticated,(req,res,next)=>{
	res.render('newphotho');
});
router.post('/newphotho',async(req,res,next)=>{
	const {title,description} = req.body;
	const errors=[];
	if(title.length <= 0 || description.length <= 0 ){
		errors.push({text: 'todos los campos son hobligatorios'});
	}
	if(errors.length > 0){
		res.render('newphotho',{title,description,errors});
	}else{
		const upload = new Upload();
		upload.title = req.body.title;
		upload.description = req.body.description;
		upload.originalname = req.file.originalname;
                upload.mimetype = req.file.mimetype;
                upload.fieldname = req.file.fieldname;
                upload.fieldname = req.file.fieldname;
                upload.size = req.file.size;
                upload.encoding = req.file.encoding;
                upload.filename = req.file.filename;
                upload.path = '/img/uploads/'+ req.file.filename;
                upload.user = req.user.id;
                await upload.save();
                console.log(upload);
                res.redirect('/myperfil');
	}
});
router.post('/chat/:chat_id',async(req,res,next)=>{
	const image = await Image.findById(req.params.chat_id);
	if(image){
		const chat = new Chat(req.body);
		chat.image_id = image._id;
		await chat.save();
		res.redirect('/img/'+chat.image_id);
	}else{
		res.send('este usuario ya no existe');
	}
});
router.post('/comentary/:images_id',async(req,res,next)=>{
	const image = await Image.findById(req.params.images_id);
	if(image){
		const comentary = new Comentary(req.body);
		comentary.image_id = image._id;
		await comentary.save();
		console.log(comentary);
		res.redirect('/img/'+comentary.image_id);
	}else{
		res.send('la imagen a comentar no existe');
	}
});
router.put('/edit/:id',async(req,res,next)=>{
	const {id} = req.params;
	const {title,description,descript,religion,name,favorite,year} = req.body;
	await Image.findByIdAndUpdate(id,{title,description,descript,religion,name,favorite,year});
	req.flash('sucess_msg','perfil editado correctamente');
	res.redirect('/myperfil');
});
router.get('/edit/:id',isAuthenticated,async(req,res,next)=>{
	const {id} = req.params;
	const dimages = await Image.findById(id);
	if(dimages.user != req.user.id){
		req.flash('error_msg','no puedes editar este perfil');
		return res.redirect('/profiles');
	}else{
		res.render('edit',{dimages});
	}
});
router.delete('/remove/:id',isAuthenticated,async(req,res,next)=>{
	const {id} = req.params;
	await Upload.findByIdAndDelete(id);
	req.flash('success_msg','imagen eliminada correctamente');
	res.redirect('/myperfil');
});
router.delete('/delete/:id',isAuthenticated,async(req,res,next)=>{
	const {id} = req.params;
	await Image.findByIdAndDelete(id);
	res.redirect('/profile');
});
router.get('/myperfil',isAuthenticated,async(req,res,next)=>{
	const profile = await Image.find({user: req.user.id});
	const uploads = await Upload.find({user: req.user.id});
	res.render('myperfil',{profile,uploads});
});
router.get('/like/:id',isAuthenticated,async(req,res,next)=>{
	const {id} = req.params;
	const limage = await Image.findById(id);
	limage.status = !limage.status;
	await limage.save();
	res.redirect('/profiles');
});
router.get('/img/:id',isAuthenticated,async(req,res,next)=>{
	const {id} = req.params;
	const image = await Image.findById(id);
	const comentary = await Comentary.find({image_id: id});
	res.render('photho',{image,comentary});
});
router.get('/profiles',isAuthenticated,async(req,res,next)=>{
	const images = await Image.find();
	res.render('profiles',{images});
});

module.exports=router;
