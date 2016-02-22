var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var UserId = require('../models/userids.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sendmessage/:msg', function(req, res, next) {
  res.status(200).send('sending message \"' + req.params.msg + '\"');
});
router.post('/sendmessage', function(req, res, next) {
	if(req.body.msg != null){
		console.log(config.server_key);
		res.status(200).send('sending message \"' + req.body.msg + '\"');
	} else {
		console.log(req.params);
		console.log(req.body);
		console.log(req.query);
		res.status(404).send('Aborting send. No message found in POST body.\nmessage received: '+req.body.toString());
	}
});
router.post('/registerId', function(req, res, next) {
	if(req.body.regId != null){
		UserId.find({id:req.body.regId},function(err, data){
			if(err){
				console.log("error: "+err);
				res.status(404).send('no regId found in post body.');
			}
			if(data.length > 0){
				console.log('regid exists, do nothing...');
				res.status(200).send('RegId '+req.body.regId + ' already registered in array');
			} else {
				var userid = new UserId();
				userid.id = req.body.regId;
				userid.save(function(err){
					if(err){
						console.log("error saving doc: "+err);
					} else {	
						console.log("saved regId: " + userid.id);
					}
				});
				res.status(200).send('RegId '+req.body.regId + ' successfully registered in array');
			}
		});
	} else {
			res.status(404).send('no regId found in post body.');
	}
});


module.exports = router;
