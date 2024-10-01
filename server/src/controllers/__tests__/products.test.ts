import request from 'supertest';
import server from '../../server';

describe('POST/api/products', () => {
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

    it('should create a new Product', async () => {
        const response = await request(server).post('/api/products').send({
            "name":"Compas Testing",
            "price":90,
            "isAvailable":true
        })
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Product created');
        expect(response.status).not.toBe(404);
        expect(response.body.error).toBe(false);

       
    });
});