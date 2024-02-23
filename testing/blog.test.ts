import { test, it, describe, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose'
import app from '../src/app';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const DB_url = process.env.MONGODB_TEST_URI || '';

beforeAll(async () => {
  await mongoose.createConnection(DB_url);
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});
afterEach(async () => {
   await clearDatabase();
 });
 
 // Function to clear the database
 const clearDatabase = async () => {
   const collections = mongoose.connection.collections;
   for (const key in collections) {
     const collection = collections[key];
     await collection.deleteMany({});
   }
 };

describe('Auth Testing', () => {
   it('should register user', async () => {
     const res = await supertest(app).post('/api/auth/register').send({
      username:"afro",
      email:"edwin@gmail.com",
      password:"richard123"
     });
     expect(res.statusCode).toBe(200);
   });
   it('should not register user with invalid Email', async () => {
     const res = await supertest(app)
       .post('/api/auth/register')
       .send({
         username:"afro",
         email:"edwin@.com",
         password:"richard123"
       })
     expect(res.statusCode).toBe(500);
   });
   it('should register user and login', async () => {
      const res = await supertest(app).post('/api/auth/register').send({
         username:"afro",
         email:"edwin@gmail.com",
         password:"richard123"
        });
        const resLogin = await supertest(app).post('/api/auth/login').send({
           email:"edwin@gmail.com",
           password:"richard123"
         });
        expect(res.statusCode).toBe(200);
        expect(resLogin.statusCode).toBe(200);
   });
   it('should return 500 user not found', async () => {
        const resLogin = await supertest(app).post('/api/auth/login').send({
           email:"invalid@gmail.com",
           password:"richard123"
         });
        expect(resLogin.statusCode).toBe(500);
   });
});
describe('Blog Testing', () => {
   const images = [
      './images/image1.png'
    ];
   it('getting All posts/blogs', async () => {
    const response = await supertest(app).get('/api/blogs/all');
    expect(response.body.message).toContain('Blogs Fetched Successfully');
  });
  it('posting A blog', async () => {
   const res = await supertest(app)
     .post('/api/blogs/create')
     .set('Content-Type', 'multipart/form-data')
     .attach('image', path.join(__dirname, images[0]))
     .field({
       title: 'New Blog',
       desc: 'New Blog New Blog',
     });
   expect(res.body.message).toContain('Blog Created Successfully');
 }, 10000);
});
