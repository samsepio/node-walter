const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId} = Schema;

const comentarySchema = new Schema({
	image_id: {type: ObjectId},
	email:{type: String},
	comentary:{type: String},
	created_at: {type: Date, default: Date.now}
});

module.exports=mongoose.model('Comentary',comentarySchema);
