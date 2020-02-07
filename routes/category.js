var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const con = mysql.createConnection({
    user : 'root',
	password : '',
	database : 'shophuyka',
    host : 'localhost',
    multipleStatements : true
});
con.connect(function(err){
	console.log("category.js connected to database.");
});
/* GET item page. */
router.get('/', function(req, res, next) {
    var id = req.query.id || 1;

    var page = 1;
    var perPage = 4;
    var start  = ( page - 1) * perPage; 
    var q0 = "SELECT tblitem.id as id,tblitem.name as name,tblitem.price as price,tblitem.quantity as quantity,tblitem.des as des,tblitem.branchID as branchID,tblitem.view as view,tblitem.url as url ";
    var q1 = "FROM tblitem "; 
    var q2 = "INNER JOIN tblclassifying ON tblitem.id = tblclassifying.itemID ";
    var q3 = "INNER JOIN tblcategory ON tblclassifying.categoryID = tblcategory.id ";
    var q4 = "WHERE tblcategory.id = ? ";
    var q5 = "LIMIT ?,?; ";
    var getCategoryQuery = 'SELECT * FROM tblcategory;';
    var getTopSellerQuery = 'select tblitem.id as id,tblitem.name as name,tblitem.price as price,tblitem.quantity as quantity,tblitem.des as des,tblitem.branchID as branchID,tblitem.view as view,tblitem.url as url from tblitem INNER join tblbooking ON tblitem.id=tblbooking.itemID GROUP BY tblitem.id order by sum(tblbooking.quantity) desc LIMIT 4;';
    var getTopViewQuery = 'select * from tblitem order by view desc limit 4;';

    var query =q0 + q1 + q2 + q3 + q4 +q5 + getCategoryQuery+ getTopSellerQuery+getTopViewQuery;
    var post = [id, start, perPage];

    con.query(query,post,function(err,result){
        res.render('category', { 
            title : 'Category Item',
            loggedin : req.session.loggedin,
			username : req.session.username,
            item : result[0], 
            category : result[1], 
            topSeller: result[2], 
            topview : result[3]
        });
        console.log(result);
    });

});

module.exports = router;
