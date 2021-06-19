const request = require('supertest');
const createServer = require('../app');

let server;

beforeAll((done) => {
    server = createServer().listen(8081, done);
});

afterAll((done) => {
    server.close(done);
});

describe('routes: /tasks', () => {
    describe('GET /tasks', () => {
        test('should return json', async () => {
            const response = await request(server).get('/tasks');
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body).toHaveLength(0);
        });
    });
    describe('GET /tasks/:id', () => {
        test('should return task', async () => {
            const response = await request(server).post('/tasks/new').send({name: 'Test'});
            const task = response.body;
            const getResponse = await request(server).get(`/tasks/${task.id}`);
            expect(getResponse.status).toEqual(200);
            expect(getResponse.type).toEqual('application/json');
            expect(getResponse.body).toEqual(task);
        });
        test('should return error if task not found', async () => {
            const response = await request(server).get('/tasks/1');
            expect(response.status).toEqual(404);
            expect(response.type).toEqual('text/plain');
            expect(response.error.text).toEqual('Task Not Found');
        });
    });
    describe('POST /tasks/new', () => {
        test('should return new task', async () => {
            const response = await request(server).post('/tasks/new').send({name: 'Test'});
            expect(response.status).toEqual(201);
            expect(response.type).toEqual('application/json');
            expect(response.body.name).toEqual('Test');
        });
        test('should return error if name is blank', async () => {
            const response = await request(server).post('/tasks/new').send({name: ''});
            expect(response.status).toEqual(400);
            expect(response.type).toEqual('text/plain');
            expect(response.error.text).toEqual('Please enter the name of your task');
        });
    });
    describe('PUT /tasks/:id', () => {
        test('should return task with new name', async () => {
            const response = await request(server).post('/tasks/new').send({name: 'Test'});
            const task = response.body;
            task.name = 'New name';
            const putResponse = await request(server).put(`/tasks/${task.id}`).send({name: task.name});
            expect(putResponse.status).toEqual(201);
            expect(putResponse.type).toEqual('application/json');
            expect(putResponse.body.name).toEqual('New name');
        });
        test('should return error if name is blanks', async () => {
            const response = await request(server).post('/tasks/new').send({name: 'Test'});
            const task = response.body;
            task.name = '';
            const putResponse = await request(server).put(`/tasks/${task.id}`).send({name: task.name});
            expect(putResponse.status).toEqual(400);
            expect(putResponse.type).toEqual('text/plain');
            expect(putResponse.error.text).toEqual('Please enter the new name to update your task');
        });
        test('should return error if update same name', async () => {
            const response = await request(server).post('/tasks/new').send({name: 'Test'});
            const task = response.body;
            task.name = 'Test';
            const putResponse = await request(server).put(`/tasks/${task.id}`).send({name: task.name});
            expect(putResponse.status).toEqual(400);
            expect(putResponse.type).toEqual('text/plain');
            expect(putResponse.error.text).toEqual('Don\'t use the same name to update your task');
        });
        test('should return error if task not found', async () => {
            const putResponse = await request(server).put(`/tasks/1`).send({name: 'Test'});
            expect(putResponse.status).toEqual(404);
            expect(putResponse.type).toEqual('text/plain');
            expect(putResponse.error.text).toEqual('Task Not Found');
        });
    });
    describe('DELETE /tasks/:id', () => {
        test('should return task', async () => {
            const response = await request(server).post('/tasks/new').send({name: 'Test'});
            const task = response.body;
            const deleteResponse = await request(server).delete(`/tasks/${task.id}`);
            expect(deleteResponse.status).toEqual(200);
            expect(deleteResponse.type).toEqual('application/json');
            expect(deleteResponse.body).toEqual(task);
        });
        test('should return error if task not found', async () => {
            const deleteResponse = await request(server).delete(`/tasks/1`);
            expect(deleteResponse.status).toEqual(404);
            expect(deleteResponse.type).toEqual('text/plain');
            expect(deleteResponse.error.text).toEqual('Task Not Found');
        });
    });
})