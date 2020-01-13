const express=require('express');
const router=express.Router();

router.get('/profile',(req,res,next)=>{
	res.render('profile');
});
router.post('/profile',async(req,res,next)=>{
	const {name,favorite,email,year,title,descript,description,religion} = req.body;
	const errors = [];
	if(name.length <= 0 || favorite.length <= 0 || email.length <= 0 || year.length <= 0 || title.length <= 0 || descript.length <= 0 || description.length <= 0 || religion.length <= 0){
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
		image.email = req.body.favorite;
		image.year = req.body.year;
		image.title = req.body.title;
		image.descript = req.body.descript;
		image.description = req.body.description;
		image.religion = req.body.religion;
		image.originalname = req.image.originalname;
		image.mimetype = req.image.mimetype;
		image.fieldname = req.file.fieldname;
		image.fieldname = req.image.fieldname;
		image.size = req.image.size;
		image.encoding = req.file.encoding;
		image.filename = req.file.filename;
		image.path = '/img/uploads/'+ req.file.filename;
		await image.save();
		console.log(image);
		res.redirect('/profiles');
	}
});
router.get('/profiles',(req,res,next)=>{
	res.render('profiles');
});

module.exports=router;
