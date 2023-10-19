const mongoose = require('mongoose');
const Schema = mongoose.Schema;

detailsSchema = new Schema( {
	
	phonenumber: Number,
	patient_name: String,
	age: Number,
	gender:String,
	dateofbirth: Date,
    healthissue: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
}),
Details = mongoose.model('Details', detailsSchema);

module.exports = Details;