# **Koa API project**

This is a simple project that will run a server with Koa framework.

To start the project:
```bash
yarn install && yarn dev
```

It will run nodemon process to start the project at port 3000. 
This server contains several API to work with task model:
```js
task: {
    id: '', 
    name: ''
}
```

## List of API
* **GET** /tasks : Return a list of tasks
* **GET** /tasks/:id : Return a task by id
* **POST** /tasks/new : Create new task and return this task in response
* **PUT** /tasks/:id : Update task by id and return this task in response
* **DELETE** /tasks/:id : Delete task by id and return this task in response

## License
MIT license
