var express = require('express');
var mysql = require('mysql');

var router = express.Router();


/* Handle query search */
router.post('/', function (req, res, next) {
    var keyword = req.body.search;
    keyword = '%' + keyword + '%';
    var con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        multipleStatements : true,
        database : 'shophuyka'
    });
    con.connect(function(err){
        
    });
    var getCategoryQuery = 'SELECT * FROM tblcategory;';

    var query = 'SELECT * FROM tblitem WHERE name LIKE ? OR des LIKE ?;'+getCategoryQuery;
    con.query(query,[keyword,keyword],function(err,result){
        res.render('search',{
            title : 'Search page',
            loggedin : req.session.loggedin,
			username : req.session.username,
            item : result[0],
            category : result[1]
        })
    });
});

module.exports = router;
