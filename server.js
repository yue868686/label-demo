const express = require('express');  
const path = require('path');  
const fs = require('fs');  
const app = express();  
const PORT = 3000;  
  
app.use(express.static(path.join(__dirname, 'web')));  
    
app.get('/images', (req, res) => {  
    fs.readdir(path.join(__dirname, 'images'), (err, files) => {  
        if (err) {  
            return res.status(500).send('Error reading directory');  
        }  
        const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));  
        res.json(images);  
    });  
});  

app.get('/images/:filename', (req, res) => {  
    const filePath = path.join(__dirname, 'images', req.params.filename);  
    fs.access(filePath, fs.constants.F_OK, (err) => {  
        if (err) {  
            return res.status(404).send('File not found');  
        }  
        res.sendFile(filePath);  
    });  
});  

app.listen(PORT, () => {  
    console.log(`Server running on port ${PORT}`);  
});