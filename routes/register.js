var express = require('express');
var mysql = require('mysql');
var { check , validationResult } = require('express-validator'); // validate

var router = express.Router();

//  Get register page , errors lưu dưới dạng JSON: 
router.get("/",function(req,res,next) {
    res.render('register',{
        title : 'Register page',
        errors : req.session.errors,
        success : req.session.succes || false
    })
});
// handle register : 
router.post('/',[
    check('username','Invalid username, least 5 character.').isLength({min:5}),
    check('password','Invalid password').isLength({min : 5})
], function(req,res){
    var errors = validationResult(req).array(); // Chuyển thành array để xử lý !
    req.session.errors = errors;
    req.session.succes = true;

    if (errors.length>0 ) {    
        console.log(req.session.errors);
        res.redirect('/register');
    } else {
        const con = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : "shophuyka"
        });
        var query = "SELECT * FROM tbluser WHERE username LIKE ?;";
        con.query(query,[req.body.username],(err,results) => {
            if(results.length>0) { // Username bị trùng
                console.log('Username bị trùng');
                res.redirect("/register");
            } else {
                query = 'INSERT INTO tbluser(username,password) VALUES (?,?);';
                con.query(query,[req.body.username,req.body.password], (err,result) => {
                    res.redirect('/login');
                })
            }
        })
    }
});

module.exports = router;