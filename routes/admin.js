var express = require('express');
var mysql = require('mysql');
var router = express.Router();

// Get admin page : 
router.get('/',function(req,res,next){
    var con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password  : '',
        database : 'shophuyka'
    })
    con.connect((err) => {
        console.log('Admin page connected to database.');
    })
    var getCategoryQuery = 'SELECT * FROM tblcategory;';
    var query = getCategoryQuery;
    con.query(query, function(err,result){
        console.log(result);
        res.render('admin',{
            title : 'Admin page',
            loggedin : req.session.loggedin,
            username : req.session.username,
            category : result
        })
    })
    
});

module.exports = router;