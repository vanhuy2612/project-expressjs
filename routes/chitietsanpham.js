var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({
	user : 'root',
	password : '',
	database : 'shophuyka',
	host : 'localhost',
	multipleStatements : true
})
con.connect(function(err){
	console.log("index.js connected to database.");
});
var getItemByIDQuery = 'SELECT * FROM tblitem WHERE id = ?;';
var getCategoryQuery = 'SELECT * FROM tblcategory;';


var query = getItemByIDQuery+getCategoryQuery;

/* GET home page. */
router.get('/', function(req,res,next){
    var id = req.query.id || 1 ;
    con.query(query,[id], function(err,result){// prepared statement
        console.log(result);
		res.render('chitietsanpham', { 
			title: 'Chi tiết sản phẩm',
			loggedin : req.session.loggedin,
			username : req.session.username,
			item : result[0], 
			category : result[1] 
		});
	});
});

module.exports = router;
