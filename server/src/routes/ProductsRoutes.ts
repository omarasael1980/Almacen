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

