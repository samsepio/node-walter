const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../model/database');

passport.use('local-signin',new LocalStrategy({
	usernameField: 'email'
},async(email,password,cb) => {
	const user = await User.findOne({email: email});
	if(!user){
		return done(null,false,{message: 'usuario no existente'});
	}else{
		const match = await user.comparePassword(password);
		if(match){
			return done(null,user);
		}else{
			return done(null,false,{message: 'contraseña incorrecta'});
		}
	}
}));

passport.serializeUser((user,done) => {
	done(null,user.id);
});

passport.deserializeUser((id,done) => {
	User.findById(id,(err,user) => {
		done(err,user);
	});
});

	
