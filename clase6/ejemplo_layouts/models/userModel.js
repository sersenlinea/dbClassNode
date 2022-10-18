const users= require('../db/usuarios.json');
module.exports={
    getUser:(email)=>{
        for (let index = 0; index < users.length; index++) {
            if(users[index].email===email){
                return users[index]
            }
        }
        return undefined;
    }
}