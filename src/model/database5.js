const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const publicationSchema = new Schema({
	title:{type: String},
	publication:{type: String}
});

module.exports=mongoose.model('Public',publicationSchema);
