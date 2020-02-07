var express = require('express');
var mysql = require('mysql');
var router = express.Router();

// Get admin page : 
router.get('/',function(req,res,next){
    var con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password  : '',
        multipleStatements : true,
        database : 'shophuyka'
    })
    con.connect((err) => {
        console.log('Admin page connected to database.');
    })
    var getCategoryQuery = 'SELECT * FROM tblcategory;';
    var getAllItemQuery = 'SELECT * FROM tblitem;';

    var query = getCategoryQuery + getAllItemQuery;
    con.query(query, function(err,result){
        console.log(result);
        res.render('admin',{
            title : 'Admin page',
            loggedin : req.session.loggedin,
            username : req.session.username,
            category : result[0],
            item : result[1]
        })
    })
    
});
router.get('/addItem',function(req,res){
    var con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password  : '',
        multipleStatements : true,
        database : 'shophuyka'
    })
    con.connect((err) => {
        console.log('Admin page connected to database.');
    })
    var getCategoryQuery = 'SELECT * FROM tblcategory;';
    var query = getCategoryQuery;
    con.query(query,function(err, result){
        res.render('addItem',{
            title : 'Add Item Page',
            loggedin : req.session.loggedin,
            username : req.session.username,
            category : result
        });
    })
    
});
router.post('/addItem',function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var category = req.body.category;
    var classifying = req.body.classifying;
    var des = req.body.des;
    var url = req.body.urlImage;
    var branchID = 1;
    var view = 1;


    var con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'shophuyka'
    });
    var query = "INSERT INTO tblitem (name,price,quantity,des,branchID,view,url) VALUES(?,?,?,?,?,?,?);";
    con.query(query,[name,price,quantity,des,branchID,view,url],function(err,results){
        var insertId = results.insertId;
        console.log(insertId);
        if ( insertId >= 0){
            query = "insert into tblclassifying(name,itemID,categoryID) values(?,?,?);";
            con.query(query,[classifying,insertId,category],function(err,result){
                if (result.length>0) console.log("thêm sản phẩm thành công");
                res.redirect('/admin');
            })
        }
    });
});
router.post('/deleteItem',function(req,res){
    var id = req.body.itemID;
    var con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        multipleStatements : true,
        database : 'shophuyka'
    });
    var deleteFromItemQuery = 'DELETE FROM tblitem WHERE id = ?;';
    var deleteFromClassifyingQuery = 'DELETE FROM tblclassifying WHERE itemID = ?;';
    var query = deleteFromClassifyingQuery + deleteFromItemQuery;
    con.query(query,[id,id],function(err,result){
        if(result[1].length>0) console.log("Xóa item thành công");
        res.redirect('/admin');
    });
});
module.exports = router;