var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET item page. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login page' });
});
// Handle POST signin in login page:
router.post('/signin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + " " + password);
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shophuyka'
    });
    con.connect(function (err) {
        console.log("Handling login connected to database.");
    });
    if (true) {
        var query = 'SELECT * FROM tbluser WHERE username LIKE ? AND password LIKE ?;';
        con.query(query, [username, password], function (err, result) {
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                console.log("Username and password are correct.");
                // Chuyển hướng về trang index : 
                res.redirect("/");
            } else {
                req.session.loggedin = false;
                req.session.username = null;
                console.log("Your Username and password are not correct.");
                // Something : Mật khẩu tài khoản sai.
                res.redirect('/login');
            }
        });
    } else {
        res.redirect('/login');
    }
});
// Handle POST logout in all page
router.post('/logout',function(req,res){
    req.session.loggedin = false;
    req.session.username = null; 
    res.redirect("/");
});

module.exports = router;
