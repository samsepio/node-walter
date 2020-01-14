const express=require('express');
const User=require('../model/database');
const router=express.Router();
const passport=require('passport');

router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.post('/signin',passport.authenticate('local-signin',{
	successRedirect: '/profile',
	failureRedirect: '/signin',
	failureFlash: true
}));
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',async(req,res,next)=>{
	const {name,email,password,comfirm} = req.body;
	const errors = [];
	if(name.length <= 0 || email.length <= 0 || password.length <= 0 || comfirm.length <= 0){
		errors.push({text: 'todos los campos son hobligatorios'});
	}
	if(password.length < 6){
		errors.push({text: 'la contraseña debe ser mayor a 6 caracteres'});
	}
	if(password != comfirm){
		errors.push({text: 'las contraseñas no coinciden'});
	}
	if(errors.length > 0){
		res.render('signup',{name,email,password,comfirm,errors});
	}else{
		const emailUser = await User.findOne({email: email});
		if(emailUser){
			res.redirect('/signup');
			req.flash('error_msg','Email ya Registrado');
		}else{
			const user = new User({name,email,password});
			user.password = user.encryptPassword(password);
			console.log(user);
			await user.save();
			req.flash('registrado correctamente ahora inicia secion');
			res.redirect('/signin');
		}
	}
});
router.get('/logout',(req,res,next)=>{
	req.logout();
	res.redirect('/');
});

module.exports=router;
