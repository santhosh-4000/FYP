const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Detail = require('../models/details');
const Prescription = require('../models/prescription.js');

router.get('/', (req, res, next) => {
	return res.render('home.ejs');
});

router.get('/doctorsignin' , (req,res,next)=>{
	return res.render('doctorLogin.ejs')
});

router.get('/hospitalsignin' , (req,res,next)=>{
	return res.render('hospLogin.ejs')
});

router.get('/doctorsignup' , (req,res,next)=>{
	return res.render('doctorRegister.ejs')
});

router.get('/hospitalsignup' , (req,res,next)=>{
	return res.render('hospRegister.ejs')
});

router.get('/forgetpass', (req, res, next) => {
	res.render("forget.ejs");
});

router.get('/prescribe', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }).then( (user) => {
		if (!user) {
			res.redirect('/');
		} else {
			User.findOne({ email: req.query.email }).then((data) => {
				if(data) {
					res.render("prescribe.ejs", {doctor_name: data.username, doctor_email: data.email});
				} else {
					res.send('doctor email not found');
				}
			});
		}
	});

});

router.post('/login', (req, res, next) => {
	User.findOne({ email: req.body.email }).then((data) => {
		if (data) {

			if (data.password == req.body.password) {
				req.session.userId = data.unique_id;
				res.send({ "Success": "Success!" });
			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.post('/', (req, res, next) => {
	let personInfo = req.body;

	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }).then( (data) => {
				if (!data) {
					let c;
					User.findOne({}, null,{ sort: { _id: -1 }, limit: 1}). then( (data) => {

						if (data) {
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						let newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save().then((Person) => {
								console.log('Success\n' + Person);
						});

					});
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/profile', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }).then( (data) => {
		if (!data) {
			res.redirect('/');
		} else {
			return res.render('profile.ejs');
		}
	});
});

router.post('/patient', (req, res, next) => {
	let patientinfo = req.body;
     console.log(patientinfo);
	User.findOne({ unique_id: req.session.userId }).then( (user) => {
		if (!user) {
			res.redirect('/');
		}
		else {
			Detail.findOne({ phonenumber: patientinfo.phonenumber }).then( (data) => {
				if (!data) {
					let c;
					Detail.findOne({}, null,{ sort: { _id: -1 }, limit: 1}).then( (data) => {
	
						if (data) {
							c = data.unique_id + 1;
						} else {
							c = 1;
						}
	
						let newpatient = new Detail({
							phonenumber: patientinfo.phonenumber,
							patient_name: patientinfo.patient_name,
							age: patientinfo.age,
							gender:patientinfo.gender,
							dateofbirth: patientinfo.dateofbirth,
							healthissue: patientinfo.healthissue,
						});
	
						newpatient.save().then((Person) => {
							console.log('Success\n'+ Person);
						});
	
					});
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}
	
			});
		}
	});	
		} 
	);

	router.post('/forgetpass', (req, res, next) => {
		User.findOne({ email: req.body.email }).then( (data) => {
			if (!data) {
				res.send({ "Success": "This Email Is not regestered!" });
			} else {
				if (req.body.password == req.body.passwordConf) {
					data.password = req.body.password;
					data.passwordConf = req.body.passwordConf;
	
					data.save().then((Person) => {
						console.log('Success\n'+ Person);
						res.send({ "Success": "Password changed!" });
					});
				} else {
					res.send({ "Success": "Password does not matched! Both Password should be same." });
				}
			}
		});
	
	});

	router.post('/getpatient', (req, res, next) => {
		User.findOne({ unique_id: req.session.userId }).then( (user) => {
			if (!user) {
				res.redirect('/');
			}
			else {
				Details.findOne({ phonenumber: req.body.patient_phone }).then( (data) => {
					if (!data) {
						res.send({"Success" : "no patient found for given number!"});
					} else {
						res.send({"Success": data});
					}
				});
			}
		});
	});

	router.get('/getpatienthistory', (req, res, next) => {
		User.findOne({ unique_id: req.session.userId }).then( (data) => {
			if (!data) {
				res.redirect('/');
			} else {
				Prescription.find({ patient_phone: req.query.patient_phone }).then( (patientdata) => {
					if (!patientdata.length) {
						res.send({"Success" : "patient history doen't exit!"});
					} else {
						res.render('patientHistory.ejs', {patientHistory: patientdata});
					}
				});
			}
		});
	});

	router.post('/submitprescribe', (req, res, next) => {
		User.findOne({ unique_id: req.session.userId }).then( (user) => {
			if (!user) {
				res.redirect('/');
			}
			else {
				let prescription = new Prescription(req.body);
				prescription.save().then((pres) => {
					res.send({"Success":"prescription saved"})
				});
			}
		});
	});

// router.get('/home', (req, res, next) => {
// 	return res.render('home.ejs');
// });

// router.post('/profile', (req, res, next) => {
// 	let patient = req.body;

// 	let newPerson = new User(patient);

// 	newPerson.save().then((Person) => {
// 			console.log('Success\n'+ Person);
// 	});

// 	res.send("Done")
// });

// router.get('/logout', (req, res, next) => {
// 	if (req.session) {
// 		// delete session object
// 		req.session.destroy((err) => {
// 			if (err) {
// 				return next(err);
// 			} else {
// 				return res.redirect('/');
// 			}
// 		});
// 	}
// });

module.exports = router;