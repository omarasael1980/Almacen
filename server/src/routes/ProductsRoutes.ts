import {     
    createProducts,
    getProducts,
    getAProduct,
    updateProduct,
    deleteProduct } from '../controllers/productsController';
    import { handleInputErrors } from '../middleware';
import {Router} from "express";
import { validationResult, body, param  } from 'express-validator';
const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *         type: object
 *        required:
 *         - name
 *        - price
 *       properties:
 *         id:
 *          type: integer
 *        description: Identificador único del producto
 *      name:
 *       type: string
 *     description: Nombre del producto
 *   price:
 *    type: number
 *   description: Precio del producto
 * tags:
 *  name: Products
 * description: API para productos
 * 
 * /products:
 * get:
 * summary: Obtiene todos los productos
 * tags: [Products]
 * responses:
 * 200:
 * description: Lista de productos
 * 
 */
router.post('/',
    body('name').notEmpty().withMessage('Necesitas agregar un nombre'), 
    body('price')
    .custom((value) => { return value > 0}).withMessage('Se requiere que el precio sea mayor a cero')
        .isNumeric().withMessage('Se requiere que el precio sea un numero'), 
    handleInputErrors,
    
    createProducts);
router.get('/', getProducts);
router.get('/:id', 
        param('id').isNumeric().withMessage('El ID debe ser un número'),
        handleInputErrors,
    getAProduct);
router.patch('/:id',
    body('name').notEmpty().withMessage('Necesitas agregar un nombre'), 
    body('price')
    .custom((value) => { return value > 0}).withMessage('Se requiere que el precio sea mayor a cero')
        .isNumeric().withMessage('Se requiere que el precio sea un numero'), 
        param('id').isNumeric().withMessage('El ID debe ser un número'),
        handleInputErrors,
    handleInputErrors,
    updateProduct);
router.delete('/:id',
    param('id').isNumeric().withMessage('El ID debe ser un número'),
    handleInputErrors,
    deleteProduct);



export default router;

