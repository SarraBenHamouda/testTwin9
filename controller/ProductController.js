const  Product = require('../models/Product');

async function add(req,res) {
    try {
           const product = new Product({
            id:req.body.id,
           nom:req.body.nom,
           adresse : req.body.adresse,
            price: req.body.price,
           }); 
           await product.save()
        res.status(200).send({ message: "Product ajouté avec succès", nom: product.nom , materiel: product.materiel , id: product.id, price:product.price });
    }
    catch (err) {
        console.log(err);
    }     
} ;

async function findAll(req,res) {
    try {
        
       var product=await Product.find()
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
    }  
};

async function showByID (req,res) {
    try {
        
       var product=await Product.findById(req.params.id)
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
    }  
} ;

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send({ message: "Product not found" });
        res.status(200).send({ message: "Product deleted" });
    } catch (err) {
        console.error(err);
        }
}

async function updateproduct(req,res) {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new: true});
        res.status(200).json(product);
    } catch (err){
        console.log(err);
    }
 };

 async function findByName(req, res) {
    try {
        const product = await Product.findOne({ nom: req.params.name });
        if (!product) return res.status(404).send({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
    }
}

async function calculateAveragePrice(req, res) {
    try {
        const products = await Product.find();
        const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
        io.emit('averagePriceUpdated', averagePrice);

        res.status(200).json({ averagePrice });
    } catch (err) {
        console.error(err);
    }
}

async function findAboveAveragePrice(req, res) {
    try {
        const products = await Product.find();
        const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
        const aboveAverage = products.filter(product => product.price > averagePrice);
        res.status(200).json(aboveAverage);
    } catch (err) {
        console.error(err);
    }
}




module.exports = {add,findAll,showByID,deleteProduct,updateproduct,findByName,calculateAveragePrice,findAboveAveragePrice}