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

var avg_CPM_user = 0;
var avg_UD_user = 0;
var avg_DU_user = 0;
var avg_CPM_pass = 0;
var avg_UD_pass = 0;
var avg_DU_pass = 0;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: 'ccs'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/', router);

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/Mainpage.html'));
});

router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname + '/Register.html'));
})

app.post('/register_data', (req, res) => {
  console.log('body: ', JSON.stringify(req.body));
  res.send(req.body);
  avg_CPM_user = parseFloat(JSON.stringify(req.body.avg_CPM_user));
  avg_UD_user = parseFloat(JSON.stringify(req.body.avg_UD_user));
  avg_DU_user = parseFloat(JSON.stringify(req.body.avg_DU_user));
  avg_CPM_pass = parseFloat(JSON.stringify(req.body.avg_CPM_pass));
  avg_UD_pass = parseFloat(JSON.stringify(req.body.avg_UD_pass));
  avg_DU_pass = parseFloat(JSON.stringify(req.body.avg_DU_pass));
  var username = req.body.username;
  var password = req.body.password;
  bcrypt.hash(password, 10, function (err, hash) {
    var sql = 'INSERT INTO logininfo VALUES (\'' + username + '\',\'' + hash + '\',' + avg_DU_user + ',' + avg_UD_user + ',' + avg_CPM_user + ',' + avg_DU_pass + ',' + avg_UD_pass + ',' + avg_CPM_pass + ')';
    console.log(hash);
    console.log(username);
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log('Insert successfully');
    })
  });


})

function rangefinder(avgdata) {
  var range = (avgdata * 35) / 100;
  return range;
}

app.post('/', function (req, res) {
  console.log('body: ', JSON.stringify(req.body));
  // res.send(req.body);
  avg_CPM_user = parseFloat(JSON.stringify(req.body.avg_CPM_user));
  avg_UD_user = parseFloat(JSON.stringify(req.body.avg_UD_user));
  avg_DU_user = parseFloat(JSON.stringify(req.body.avg_DU_user));
  avg_CPM_pass = parseFloat(JSON.stringify(req.body.avg_CPM_pass));
  avg_UD_pass = parseFloat(JSON.stringify(req.body.avg_UD_pass));
  avg_DU_pass = parseFloat(JSON.stringify(req.body.avg_DU_pass));
  var username = req.body.username;
  //Check if there is this username in the database or not
  var sql_check_user = 'SELECT EXISTS(SELECT username FROM logininfo WHERE username=\'' + username + '\') as result'
  con.query(sql_check_user,(err,result) => {
    if (err) throw err;
    console.log(result[0].result);
    if (result[0].result == 1){
      var password = req.body.password;
      var sql = 'SELECT * FROM logininfo where username=\'' + username + '\'';
      // console.log(username);
      con.query(sql, (err, data) => {
        if (err) throw err;
        // console.log(password)
        // console.log(data[0].password)
        bcrypt.compare(password, data[0].password, function (err, result) {
          if (result == true) {
            console.log("Password pass")
            if ((data[0].avgCPM_user + rangefinder(data[0].avgCPM_user) >= avg_CPM_user && (data[0].avgCPM_user - rangefinder(data[0].avgCPM_user) <= avg_CPM_user))) {
              if ((data[0].avgUD_user + rangefinder(data[0].avgUD_user) >= avg_UD_user && (data[0].avgUD_user - rangefinder(data[0].avgUD_user) <= avg_UD_user))) {
                if ((data[0].avgDU_user + rangefinder(data[0].avgDU_user) >= avg_DU_user && (data[0].avgDU_user - rangefinder(data[0].avgDU_user) <= avg_DU_user))) {
                  if ((data[0].avgCPM_pass + rangefinder(data[0].avgCPM_pass) >= avg_CPM_pass && (data[0].avgCPM_pass - rangefinder(data[0].avgCPM_pass) <= avg_CPM_pass))) {
                    if ((data[0].avgUD_pass + rangefinder(data[0].avgUD_pass) >= avg_UD_pass && (data[0].avgUD_pass - rangefinder(data[0].avgUD_pass) <= avg_UD_pass))) {
                      if ((data[0].avgDU_pass + rangefinder(data[0].avgDU_pass) >= avg_DU_pass && (data[0].avgDU_pass - rangefinder(data[0].avgDU_pass) <= avg_DU_pass))) {
                        res.send('Login Successful')
                        console.log('Login Successful')
                        //Link to the next page
                        
                      }
                      else {
                        res.send('DU of password time not match');
                      }
                    }
                    else {
                      res.send('UD of password time not match');
                      
                    }
                  }
                  else {
                    res.send('CPM of password time not match')
                  }
                }
                else {
                  res.send('DU of username time not match')
                }
              }
              else {
                res.send('UD of username time not match')
              }
            }
            else {
              res.send('CPM of username time not match')
            }
          }
          else {
            res.send('Wrong password')
          }
        })
      })
    }else{
      res.send('No username in the database')
    }
  })
})

app.listen(8081, function () {
  console.log('Listening at Port ' + 8081);
})