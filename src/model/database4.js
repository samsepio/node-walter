const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const uploadSchema = new Schema({
	title:{type: String},
	description:{type: String},
	mimetype:{type: String},
        originalname:{type: String},
        filename:{type: String},
        path:{type: String},
        size:{type: Number},
        fieldname:{type: String},
        encoding:{type: String},
        created_at: {type: Date, default: Date.now},
        user:{type: String}
});

module.exports=mongoose.model('Upload',uploadSchema);
