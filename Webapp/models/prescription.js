const mongoose = require('mongoose');
const Schema = mongoose.Schema;

prescriptionSchema = new Schema( {
	
	doctor_email: String,
    patient_phone: Number,
    patient_symptoms: String,
    patient_diagnosis: String,
    medicine_list: [{
        medicine_name: String,
        medicine_conc: String,
        medicine_dosg: String,
        medicine_quantity: String,
        id: String
    }],
    notes: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
}),

Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;