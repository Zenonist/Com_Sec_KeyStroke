var mysql = require('mysql');
const express = require('express');
var bcrypt = require('bcrypt');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname + '/'));
router.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'ccs'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });

  app.use('/',router);

  router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/mainpage.html'));
});

function rangefinder(avgdata){
  var range = (avgdata * 20) / 100;
  return range;
}
app.post('/',(req,res) => {
  var username = req.body.kuser;
  var password = req.body.kpass;
  var sql = 'SELECT * FROM LoginInfo WHERE username=\'' + username + '\'';
  con.query(sql,(err,data) => {
    if(err) throw err;

    bcrypt.compare(password,data[0].password,function(err,result){
      if(result == true)
      {

      }
      else
      {
        alert('Wrong password');
      }
    })
  })

})

app.listen(8081, function(){
  console.log('Listening at Port ' + 8081);
})