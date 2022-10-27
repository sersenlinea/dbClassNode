module.exports={
    getOne:(datos,id)=>{
        for (let i = 0; i < datos.length; i++) {
            if(id ===datos[i].id){
                return datos[i];
            }
            
        }
        return undefined;

    }
}