const path =require('path')
const fs = require('fs')
const json_data = fs.readFileSync('./db/hoteles.json','utf-8');
let db = JSON.parse(json_data); 
const formidable =require('formidable')
const form = formidable({
    uploadDir:path.join(__dirname,'../db')
})
const modeloDatos=require('../module/modeloDatos');
const controller = {
    list:function(req, res, next) {
        res.render('hoteles',{title:"Hoteles",data:db});
      },
    add:(req,res)=>{
        res.render('addHotel')
    },
    addPost:(req,res)=>{
       form.parse(req,(err,fields,files)=>{
        if(err){
            next(err);
            return;
        }
        if(fields && files.archivo.size !=0){
            let ext = path.extname(files.archivo.originalFilename);
            console.log(files.archivo.filepath);
            fs.renameSync(files.archivo.filepath,
            path.join(__dirname,`../public/images/${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`));
            let servicios =[]
            if(fields.cancha){servicios=[...servicios,fields.cancha]}
            if(fields.playa){servicios=[...servicios,fields.playa]}
            if(fields.pileta){servicios=[...servicios,fields.pileta]}
            if(fields.wifi){servicios=[...servicios,fields.wifi]}
            if(fields.spa){servicios=[...servicios,fields.spa]}
            let src=`${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`;
            
            let datos ={
                nombre:fields.nombre,
                email:fields.email,
                ubicacion:fields.ubicacion,
                info:fields.info,
                servicios:servicios,
                title:fields.title,
                id:Date.now().toString(),
                src:src,
            }
            db = [...db,datos];
            let newData = JSON.stringify(db);
            fs.writeFileSync('./db/hoteles.json',newData,'utf-8')
            res.redirect('/hoteles')
        }else{
            res.redirect('/hoteles')
        }
       })
    },
    edit:(req,res)=>{
        let id = req.params.id;
        let hotel = modeloDatos.getOne(db,id);
        res.render('editHotel',{hotel:hotel})
    },
    editPost:(req,res)=>{
        res.send('EditPost')
    },
    delete:(req,res)=>{
        res.send('Delete')
    }
}
module.exports= controller