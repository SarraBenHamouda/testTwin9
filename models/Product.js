const mongo= require ('mongoose');
const Schema=mongo.Schema;
const Product = new Schema ({
    id : String,
    nom: String , 
    price: Number , 
    materiel: String , 
   

})
module.exports=mongo.model('product' , Product);