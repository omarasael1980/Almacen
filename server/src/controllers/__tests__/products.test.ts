import request from 'supertest';
import server from '../../server';

//test de post
describe('POST/api/products', () => {
    it('should create a new Product', async () => {
        const response = await request(server).post('/api/products').send({
            "name":"Almendras",
            "price":90,
            "isAvailable":true
        })
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Product created');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(false);

       
    });
    it('should return a 400 status code if the price is less than 0', async () => {
        const response = await request(server).post('/api/products').send({
            "name":"Almendras",
            "price":-9,
            "isAvailable":true
        });
        expect(response.status).toBe(400);
        expect(response.body.title).toBe('Error de validacion');
        expect(response.status).not.toBe(201);
        expect(response.body.error).toBe(true);
    });
    it('should return a 400 status code if the product already exists', async () => {
        const response = await request(server).post('/api/products').send({
            "name":"Almendras",
            "price":9,
            "isAvailable":true
        });
        expect(response.status).toBe(400);
        expect(response.body.title).toBe('Product already exists');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    }
    );
    it('should return a 400 status code if the price is less than 0', async () => {
        const response = await request(server).post('/api/products').send({
            "name":"Almendras",
            "price":-9,
            "isAvailable":true
        });
        expect(response.status).toBe(400);
        expect(response.body.title).toBe('Error de validacion');

        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    });
    it('should return a 400 status code and display validation message if the name is missing', async () => {
        const response = await request(server).post('/api/products').send({
            "price":9,
            "isAvailable":true
        });
        expect(response.status).toBe(400);
        expect(response.body.title).toBe('Error de validacion');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    });
    it('should return a 500 status code if there is an internal server error', async () => {
        const response = await request(server).post('/api/products').send({
            "name":700,
            "price":9,
            "isAvailable":true
        });
        expect(response.status).toBe(500);
        expect(response.body.title).toBe('Internal server error');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    });

   
});

//test de get
describe('GET /api/products', () => {
    it('should return all products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Products retrieved');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(false);
    });
});

//test de get by id
describe('GET /api/products/:id', () => {
    it('should return a product by id', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Product retrieved');
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(false);
    });
    it('should return a 404 status code if the product does not exist', async () => {
        const response = await request(server).get('/api/products/100');
        expect(response.status).toBe(404);
        expect(response.body.title).toBe('Product not found');
        expect(response.status).not.toBe(200);
        expect(response.body.error).toBe(true);
    });
});
//test de patch
describe('PATCH /api/products/:id', () => {
    it('should update a product by id', async () => {
        const productId = 1;
        const response = await request(server).patch(`/api/products/${productId}`).send({
            "name":"Dulces",
            "price":70
            
        });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.msg).toHaveProperty('id');
        expect(response.body.msg.name).toBe('DULCES');
        expect(response.body.msg.price).toBe(70);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body.title).toBe('Product updated');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(false);
    });
    it('should return a 404 status code if the product does not exist', async () => {
        const response = await request(server).patch('/api/products/100').send({
            "name":"Almendras",
            "price":90,
            "isAvailable":true
        });
        expect(response.status).toBe(404);
        expect(response.body.title).toBe('Product not found');
        expect(response.status).not.toBe(200);
        expect(response.body.error).toBe(true);
    });
    it('should return a 400 status code if the price is less than 0', async () => {
        const response = await request(server).patch('/api/products/1').send({
            "name":"Almendras",
            "price":-90,
            "isAvailable":true
        });
        expect(response.status).toBe(400);
        expect(response.body.title).toBe('Error de validacion');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    });
    it('should return a 400 status code and display validation message if the name is missing', async () => {
        const response = await request(server).patch('/api/products/1').send({
            "price":90,
            "isAvailable":true
        });
        expect(response.status).toBe(400);
        expect(response.body.title).toBe('Error de validacion');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    });
    it('should return a 500 status code if there is an internal server error', async () => {
        const response = await request(server).patch('/api/products/1').send({
            "name":700,
            "price":90,
            "isAvailable":true
        });
        expect(response.status).toBe(500);
        expect(response.body.title).toBe('Internal server error');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(true);
    });
   
});
//test de delete

describe('DELETE /api/products/:id', () => {
    it('should delete a product by id', async () => {
        const productId = 1;
        const response = await request(server).delete(`/api/products/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.msg).toBe('Product deleted');
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body.title).toBe('Product deleted');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(false);
    });
    it('should return a 404 status code if the product does not exist', async () => {
        const response = await request(server).delete('/api/products/100');
        expect(response.status).toBe(404);
        expect(response.body.title).toBe('Product not found');
        expect(response.status).not.toBe(200);
        expect(response.body.error).toBe(true);
    });

   
    
})  