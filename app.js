//cmd: npm install -g npm
//cmd: npm init
//cmd: npm install -g serve
//recharge de page automatique
//cmd : npm i -S nodemon
//json : "start": "nodemon server.js"
//prod : "start" : "NODE_ENV=production nodemon server1.js"
//cmd: npm run start
//json :"type": "module", // pour import 

import { createServer } from "node:http"
import { json } from "node:stream/consumers"
import { findTodos,createTodo, removeTodo } from "./functions/todos_storage.js"

createServer(async (req,res) => {

	res.setHeader('content-Type','application/json')
	const url = new URL(req.url,`http://${req.headers.host}`)
	if (url.pathname === '/todos'){
		if(req.method === 'GET'){
			const todos = await findTodos()
			res.write(JSON.stringify(todos))
		}
		else if(req.method === 'POST'){
			const todo = await createTodo(await json(req)) 
			res.write(JSON.stringify(todo))
		}
		else if(req.method === 'DELETE'){
			await removeTodo(await (req)) 
		
		}
	
	}
	else{
	res.writeHead(404)
	}

	res.end()
}).listen(8080)