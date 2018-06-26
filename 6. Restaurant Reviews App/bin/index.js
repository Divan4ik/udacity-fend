const express = require('express');
const path = require('path');
const app = express();
const doc_root = path.join(__dirname + '/../public');

app.use(express.static(doc_root));

app.get('/',function(req,res){
     res.sendFile(path.join(doc_root,'index.html'));
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));