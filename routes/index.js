var express = require('express');
var router = express.Router();

var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req,res,next){
	var getCategoryQuery = 'SELECT * FROM tblcategory;';
	var getAllItemQuery = 'SELECT * FROM tblitem;';
	var getTopSellerQuery = 'select tblitem.id as id,tblitem.name as name,tblitem.price as price,tblitem.quantity as quantity,tblitem.des as des,tblitem.branchID as branchID,tblitem.view as view,tblitem.url as url from tblitem INNER join tblbooking ON tblitem.id=tblbooking.itemID GROUP BY tblitem.id order by sum(tblbooking.quantity) desc LIMIT 4;';
	var getTopViewQuery = 'select * from tblitem order by view desc limit 4;';
	var query = getCategoryQuery + getAllItemQuery + getTopSellerQuery + getTopViewQuery;

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
	con.query(query, function(err,result){// prepared statement
		res.render('index', { 
			title: 'Home page',
			loggedin : req.session.loggedin,
			username : req.session.username, 
			category : result[0], 
			item : result[1], 
			topSeller : result[2], 
			topview : result[3]
		});
	});
});
// handle ajax from index.ejs
router.post('/handle',function(req,res){
	var string = req.body.name;
	console.log(string);
	string = "Chào bạn, "+string;
	res.send(string);
});
module.exports = router;
