
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const userRoute = require('../server/Routes/userRoutes');
const fs = require('fs');


const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.status(201).json(req.file.filename);

});



app.use(express.static('public'))

app.get('/getImages', (req, res) => {
    const directoryPath = path.join(__dirname, 'public', 'images');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        res.send(files);
    });
});

app.use("/user", userRoute);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`);
});


