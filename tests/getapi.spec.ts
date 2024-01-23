import { expect,test } from "@playwright/test";


test.describe.parallel('api testing for GET request', ()=>{
    const baseUrl='https://reqres.in/api'

    test('simple API testing-Assertion response status', async({request}) =>{
        const response=await request.get(`${baseUrl}/users/1`);
        console.log('the staus code is : '+response.status());
        expect(response.status()).toBe(200);
        
        const responseBody= JSON.parse(await response.text());
        console.log(responseBody)
        //assertion for the data 
    })

    test('simple API testing-assertion invalid end point', async({request}) =>{
        const response=await request.get(`${baseUrl}/users/2/202r`);
        console.log('the staus code is : '+response.status());
        expect(response.status()).toBe(404);

    })

    test('Get user details and verifyt the status code and data',async({request})=>{
        const response=await request.get(`${baseUrl}/users/2`);
        console.log('the staus code is : '+response.status());
        const responseBody= JSON.parse(await response.text());
        console.log(responseBody)
        //assertion for the data 
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.first_name).toBe('Janet'); 
        expect(responseBody.data.last_name).toBe('Weaver');
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');

    })

    test('POST request for create new user', async({request}) =>{
        const response=await request.post(`${baseUrl}/users`, {
            data:{
                id:101,
            },
        });
        const responseBody=JSON.parse(await response.text());
        console.log(responseBody);
        expect(responseBody.id).toBe(101);
        expect(responseBody.createdAt).toBeTruthy();
    })

    test('POST request for Login',async({request})=>{
        const response=await request.post(`${baseUrl}/login`, {
            data:{
                email:'eve.holt@reqres.in',
                password:'cityslicka',

            },

        });
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    })

    test('POST request for Login failed',async({request})=>{
        const response=await request.post(`${baseUrl}/login`, {
            data:{
                email:'eve.holt@reqres.in',

            },

        });
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe('Missing password');
        
    })

})