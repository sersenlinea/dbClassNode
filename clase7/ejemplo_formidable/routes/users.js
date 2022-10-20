var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('formImg');
});
router.post('/upload',(req,res)=>{
  const form = formidable({uploadDir:'upload'});
  form.parse(req,(err,fields,files)=>{
    if(err){
      next(err);
      return;
    }
    let ext = path.extname(files.archivo.originalFilename);
   
   //fs.renameSync(files.archivo.originalFilename,`${path.join(__dirname,'../public/images/')}${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`)
    res.json({fields,files})
  })
})

module.exports = router;
