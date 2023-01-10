const express = require('express');
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const os = require('os');



const app = express();
let hostname = '127.0.0.1'; // replace with your computer's IP address
const port = 8000;

// get a list of all network interfaces
const interfaces = os.networkInterfaces();
// iterate over the interfaces and print their addresses
for (const interface of Object.values(interfaces)) {
  for (const address of interface) {
    if(address.address.startsWith('192')){
        hostname = address.address 
    }
  }
}

console.log(hostname)

app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {ip:`http://${hostname}:${port}`})

});

console.log(path.join(__dirname, "/Data"))


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("all files", file)
    cb(null, path.join(__dirname, "/Data")); // Save the files to the 'data' directory
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Use the original file name as the saved file name
  },
})

const upload = multer({ storage: storage }).array('file')

app.post('/upload', upload, (req, res) => {
  console.log(req.file); // The array of uploaded files
  res.send('ok');
});




// send the all files 
app.get('/getfiles', (req, res)=>{
  fs.readdir(path.join(__dirname, "/Data"), (err, data)=>{
    if(!err){
      res.send(data)
    }else{
      res.send('sem tink rong')
    }
  })
  
})


app.get('/download/:id', (req, res)=>{
  res.download(`./Data/${req.params.id}`)
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
