var express = require('express');
var router = express.Router();
var config = require('../config/config.js');


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

module.exports = router;
