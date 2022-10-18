const userModel = require('../models/userModel')
const controller = {
    login: function (req, res, next) {
        res.render('login',{title:"Ingresar"});
    },
    loginPost: function (req, res, next) {
        let user = userModel.getUser(req.body.email);
        if(user === undefined){
            res.redirect('/');
        }else{
            if(user.password==req.body.password){
                res.locals.use=user;
                res.render('index',{title:"mi App"})
            }
        }
        
    },
    register: function (req, res, next) {
        res.send('respond with a resource');
    },
    registerPost: function (req, res, next) {
        res.redirect('/');
    }
}
module.exports = controller