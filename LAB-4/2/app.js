const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'users.json');


async function readUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
          
            await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
            return [];
        }
        throw error;
    }
}

async function writeUsers(users) {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
}

const routes = {
   
    async getUsers(req, res) {
        try {
            const users = await readUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    },

    async createUser(req, res) {
        try {
            const userData = await parseRequestBody(req);
         
            if (!userData.name || !userData.email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Name and email are required' }));
                return;
            }

            const users = await readUsers();
            
            if (users.some(user => user.email === userData.email)) {
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Email already exists' }));
                return;
            }

            const newUser = {
                id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
                ...userData,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            await writeUsers(users);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    },

    async deleteUser(req, res, userId) {
        try {
            const users = await readUsers();
            const id = parseInt(userId);
            
            const userIndex = users.findIndex(user => user.id === id);
            
            if (userIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User not found' }));
                return;
            }

            users.splice(userIndex, 1);
            await writeUsers(users);

            res.writeHead(204);
            res.end();
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
};

const server = http.createServer(async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    try {
      
        if (req.method === 'GET' && path === '/users') {
            await routes.getUsers(req, res);
        }
        else if (req.method === 'POST' && path === '/users') {
            await routes.createUser(req, res);
        }
        else if (req.method === 'DELETE' && path.match(/^\/users\/\d+$/)) {
            const userId = path.split('/')[2];
            await routes.deleteUser(req, res, userId);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});