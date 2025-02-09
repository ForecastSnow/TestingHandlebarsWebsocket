import express from "express";

const realTimeProducts = express.Router();

realTimeProducts.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});


export default realTimeProducts;