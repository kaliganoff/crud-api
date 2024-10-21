import { createServer } from 'http';

const users: any = []

createServer((req, resp) => {
    if (req.url === '/api/users' && req.method === 'GET' || req.url === '/api/users/' && req.method === 'GET') {
        resp.writeHead(200, { 'Content-Type': 'application/json'});
        resp.end(JSON.stringify(users));
    } else if (req.url?.startsWith('/api/users/') && req.method === 'GET' && req.url.length > '/api/users/'.length) {
        const user = users.find((item: any) => item.id === req.url?.replace('/api/users/', ''));
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
    }
    else {
        resp.write('Page not found')
        resp.end();
    }
}).listen(4000);