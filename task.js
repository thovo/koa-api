// task.js
const {
   v4: uuidv4
} = require('uuid');
const Router =  require('koa-router');

// Prefix all routes with: /tasks
const router = new Router({
   prefix: '/tasks'
});

// This array will store task during run time, we don't use any database here
/*
let mockData = [
   {id: uuidv4(), name: 'Task 1'},
   {id: uuidv4(), name: 'Task 2'},
   {id: uuidv4(), name: 'Task 3'}
];
let tasks = mockData;
*/

let tasks = [];
// Routers will go here

// Get all tasks
router.get('/', (ctx, next) => {
   ctx.body = tasks;
   next();
});

// Get task by id
router.get('/:id', (ctx, next) => {
   let currentTask = tasks.filter((task) => task.id === ctx.params.id);

   if (currentTask.length) {
      ctx.body = currentTask[0];
   } else {
      ctx.response.status = 404;
      ctx.body = 'Task Not Found';
   }
   next();
});

// Create new task
router.post('/new', (ctx, next) => {
   // Check if any of the data field not empty
   const name = ctx.request.body.name;
   if (!name) {
      ctx.response.status = 400;
      ctx.body = 'Please enter the name of your task';
   } else {
      const id = uuidv4();
      let newTask = {
         id, name
      }
      tasks.push(newTask);
      console.log(`New task added with id: ${id} & name: ${name}`);
      ctx.response.status = 201;
      ctx.body = newTask;
   }
   next();
});

// Update task
router.put('/:id', (ctx, next) => {
   // Check if any of the data field not empty
   const name = ctx.request.body.name;
   const id = ctx.params.id;
   if (!ctx.request.body.name) {
      ctx.response.status = 400;
      ctx.body = 'Please enter the new name to update your task';
   } else {
      const updateTask = tasks.find((task) => task.id === id);
      if (!updateTask) {
         ctx.response.status = 404;
         ctx.body = 'Task Not Found';
      } else {
         if (name === updateTask.name) {
            ctx.response.status = 400;
            ctx.body = 'Don\'t use the same name to update your task';
         } else {
            updateTask.name = name;
            console.log(updateTask);
            ctx.response.status = 201;
            console.log(`Your task update with name: ${name}`);
            ctx.body = updateTask;
         }
      }
   }
   next();
});

// Delete one task
router.delete('/:id', (ctx, next) => {
   let deleteTaskIndex = tasks.findIndex((task) => task.id === ctx.params.id);

   if (deleteTaskIndex >= 0) {
      const deleteTasks = tasks.splice(deleteTaskIndex, 1);
      console.log(`Delete task with id: ${deleteTasks[0].id}`);
      ctx.response.status = 200;
      ctx.body = deleteTasks[0];
   } else {
      ctx.response.status = 404;
      ctx.body = 'Task Not Found';
   }
   next();
});

module.exports = router;

