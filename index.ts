import { createServer } from 'http';
import { User, users } from './users';

createServer((req, resp) => {
    if (req.url === '/api/users' && req.method === 'GET' || req.url === '/api/users/' && req.method === 'GET') {
        resp.writeHead(200, { 'Content-Type': 'application/json'});
        resp.end(JSON.stringify(users));
    } else if (req.url?.startsWith('/api/users/') && req.method === 'GET' && req.url.length > '/api/users/'.length) {
        const user = users.find((item: User) => item.id === req.url?.replace('/api/users/', ''));
        if (user) {
        resp.writeHead(200, { 'Content-Type': 'application/json'});
        resp.end(JSON.stringify(user));
        } else {
            resp.writeHead(404, { 'Content-Type': 'text/plain'});
            resp.end('User not found');
        }
    } else if (req.url === '/api/users' && req.method === 'POST' || req.url === '/api/users/' && req.method === 'POST') {
        let body: any = [];
        req
        .on('data', chunk => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
                const { username, age, hobbies } = JSON.parse(body);
                if (username && age && hobbies) {
                    const newUser = { id: 'id' + (new Date()).getTime(), username, age, hobbies}
                    users.push(newUser);
                    resp.writeHead(201, { 'Content-Type': 'application/json'});
                    resp.end(JSON.stringify(newUser));
                } else {
                    resp.writeHead(400, { 'Content-Type': 'text/plain'});
                    resp.end('The request body does not contain required fields');
                }
        });
    } else if (req.url?.startsWith('/api/users/') && req.method === 'PUT' && req.url.length > '/api/users/'.length) {
        let body: any = [];
        req
        .on('data', chunk => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
                const { username, age, hobbies } = JSON.parse(body);
                if (username || age || hobbies) {
                    const index = users.findIndex((item: any) => item.id === req.url?.replace('/api/users/', ''))
                    if (users[index]) {
                        users[index] = { id: users[index].id, username: username || users[index].username, age: age || users[index].age, hobbies: hobbies || users[index].hobbies}
                        resp.writeHead(200, { 'Content-Type': 'application/json'});
                        resp.end(JSON.stringify(users[index]));
                    } else {
                        resp.writeHead(404, { 'Content-Type': 'text/plain'});
                        resp.end('User not found');
                    }
                } else {
                    resp.writeHead(400, { 'Content-Type': 'text/plain'});
                    resp.end('The request body does not contain at least on required field');
                }
        });
    } else if (req.url?.startsWith('/api/users/') && req.method === 'DELETE' && req.url.length > '/api/users/'.length) {
        const index = users.findIndex((item: any) => item.id === req.url?.replace('/api/users/', ''))
        if (users[index]) {
        users.splice(index, 1);
        resp.writeHead(204, { 'Content-Type': 'text/plain'});
        resp.end("User deleted");
        } else {
            resp.writeHead(404, { 'Content-Type': 'text/plain'});
            resp.end('User not found');
        }
    }
    else {
        resp.writeHead(404, { 'Content-Type': 'text/plain'});
        resp.write('Page not found')
        resp.end();
    }
}).listen(process.env.PORT);
console.log(`Server is running on port ${process.env.PORT}`)