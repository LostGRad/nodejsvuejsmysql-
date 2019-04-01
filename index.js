const express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        fs = require('fs'),
        fileUpload = require('express-fileupload'),
        http = require('http');
const mysql = require('mysql');

const urlencodedParser = bodyParser.urlencoded({extended: false});

//nodemon for start
// crate connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node"
});
//connect
db.connect((err)=>{
    if(err){
        console.log(err);
        throw err;
    }
    console.log('MySql Connected!!');
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
//Select
app.get('/getposts/:phonenumber', (req, res)=>{
    let phonenumber = "'"+`${req.params.phonenumber}`+"'"
    let sql = "SELECT * FROM fortask WHERE phonenumber = "+phonenumber;
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        res.send(results);
    });
});
//inspect
app.post('/setclient', urlencodedParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);
    let post = { firstName: req.body.firstName, lastName:req.body.lastName, phonenumber: req.body.phonenumber, nameFile:req.body.nameFile};
    let sql = "INSERT INTO fortask SET ?";
    let query = db.query(sql, post,(err, results)=>{
        if(err) throw err;
        res.send('add');
    });
    });
//delete
app.delete('/deleteFile/:id',(req, res)=>{
    let idFile = "'"+`${req.params.id}`+"'"
    var sql = "DELETE FROM fortask WHERE id ="+idFile;
    let sqlnameFile ="SELECT * FROM fortask WHERE id = "+idFile;
    let queryFile = db.query(sqlnameFile,(err, results)=>{
        if(err){
            throw err;
        } else {
            let info=JSON.stringify(results,["phonenumber","nameFile"]);
            let getNameFolder=JSON.parse(info);
            let dir = './files/'+getNameFolder[0].phonenumber+"/"+getNameFolder[0].nameFile;
            fs.unlink(dir, function(err) {
                if(err){
                    console.log("Файла не існує");
                }
                else console.log("Файл успішно видалено");
            });

        }

    });
    let query = db.query(sql,(err, results)=>{
        if(err) throw err;
        res.send('add');
    });
});
app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
      console.log('No files were uploaded.')
    return res.status(400);
  }

  //  req.files.file our file
  let sampleFile = req.files.file;
  //req.files.file.name File name
  let dir = './files/'+req.body.phonenumber+"/";
  let pathFile = dir+req.files.file.name;
  // // Use the mv() method to place the file  on folder files
  fs.mkdir('./files/'+req.body.phonenumber, ()=>{
      console.log("done");
  });
  sampleFile.mv(pathFile, function(err) {
    if (err)
      return res.status(500);

    console.log('File uploaded!');
  });
});
app.listen('3000', ()=>{
    console.log('Server started on port 3000');
});
///// download
app.get('/download/:id',(req, res) => {
    console.log(req.params.id);
    let idFile = "'"+`${req.params.id}`+"'"
    let sqlnameFile ="SELECT * FROM fortask WHERE id = "+idFile;
    let queryFile = db.query(sqlnameFile,(err, results)=>{
        if(err){
            throw err;
        } else {
            let info=JSON.stringify(results,["phonenumber","nameFile"]);
            let getNameFolder=JSON.parse(info);
            let dir = './files/'+getNameFolder[0].phonenumber+"/"+getNameFolder[0].nameFile;

            //
            // this.use('/public', express.static('public'));
            res.setHeader('Content-disposition', 'attachment; filename='+dir);
            res.setHeader('Content-type', 'text/plain');
            res.download(dir);


        }

    });
    // var test = __dirname +"/files/+11(111)-111-11-11/IMG_2094.JPG"
    // var file = fs.createWriteStream('test.jpg');
    // var request = http.get(test, function(response) {
    // response.pipe(file);
    // });


});
