import { readFile, writeFile } from "node:fs/promises"

const path = 'storage/todos.json'




export async function findTodos() {
	const data = await readFile(path,'utf8')
	return JSON.parse(data)
}


export async function createTodo({id, title, completed = false}){
	const todo = {id, title, completed}
	const todos = [todo, ... await findTodos()]
	await writeFile(path,JSON.stringify(todos))
	return todo
}


export async function removeTodo(id){
	const todos =  await findTodos()
	todos.filter(todo => todo.id != id )
	await writeFile(path,JSON.stringify(todos))
		const data = await readFile(path,'utf8')
	return JSON.parse(data)
}