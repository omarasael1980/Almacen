import { Request, Response } from 'express';
import Product from '../models/Products';
 
//region Create Product
  // Importa desde express

  const createProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        
    let { name, price,   } = req.body;
 
  
    //ver si existe el producto
    const product = await Product.findOne({ where: { name } });
    if (product) {
        res.status(400).send({ msg: 'Product already exists', title: 'Product already exists', error: true });
        return;
    }else{
        //ver si el precio es menor a 0
        if(price < 0){
            res.status(400).send({ msg: 'Price cannot be less than 0', title: 'Price cannot be less than 0', error: true });
            return;
        }else{
            //cambiar a uppercase
            name = name.toUpperCase();

        // Crear el producto
        const productSaved = await Product.create({name, price});
     
        
        res.status(201).send({ msg: productSaved, title: 'Product created', error: false });
        }
    }

     

    } catch (error) {
        res.status(500).send({ msg: error.message, title: 'Internal server error', error: true });
    }
};



//region Get Products

const getProducts = async (req: Request, res: Response) => {
   try {
    const products = await Product.findAll({
        order: [['id', 'DESC']]
    });
    res.status(200).send({ msg: products, title: 'Products retrieved', error: false });
   } catch (error) {
    res.status(500).send({ msg: error.message, title: 'Internal server error', error: true });
   }
}
//region getAProduct
const getAProduct = async (req: Request, res: Response) => {
 try {
      const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        res.status(404).send({ msg: 'Product not found', title: 'Product not found', error: true });
        return;
    }
    res.status(200).send({ msg: product, title: 'Product retrieved', error: false });
 } catch (error) {
    res.status(500).send({ msg: error.message, title: 'Internal server error', error: true });
 }
}
//region updateProduct
const updateProduct = async (req: Request, res: Response) => {
    try {
        // Obtener el id
        const { id } = req.params;
 
        // Obtener los datos del cuerpo de la solicitud
        const { name, price } = req.body;
        
        // Verificar si name y price están presentes en req.body
        if (!name || !price) {
            res.status(400).send({ msg: 'Name and price are required', title: 'Invalid input', error: true });
            return;
        }
 
        console.log("Datos recibidos:", name, price);
 
        // Buscar el producto por su ID
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).send({ msg: 'Product not found', title: 'Product not found', error: true });
            return;
        }
 
        // Actualizar los campos del producto
        product.name = name.toUpperCase();  // Convertir el nombre a mayúsculas
        
        // Asegurarse de que el precio sea un número
        const parsedPrice = parseFloat(price); 
        if (isNaN(parsedPrice)) {
            res.status(400).send({ msg: 'Invalid price value', title: 'Invalid input', error: true });
            return;
        }
 
        product.price = parsedPrice;
 
        // Guardar el producto actualizado
        const productSaved = await product.save();
        
        res.status(200).send({ msg: productSaved, title: 'Product updated', error: false });
    } catch (error) {
        res.status(500).send({ msg: error.message, title: 'Internal server error', error: true });
    }
 };
 
//region deleteProduct
const deleteProduct = async (req: Request, res: Response) => {
    res.status(200).send({ msg: 'Product deleted', error:false });
}

export{
    createProducts,
    getProducts,
    getAProduct,
    updateProduct,
    deleteProduct
}