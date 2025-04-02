let todos = [
    { id: 1, title: "Task 1", description: "First task", completed: false },
    { id: 2, title: "Task 2", description: "Second task", completed: true },
    { id: 3, title: "Task 3", description: "Third task", completed: false },
    { id: 4, title: "Task 4", description: "Fourth task", completed: true },
  ];
  
  export default function WorkingWithArrays(app) {
    // GET all todos or filter by completed status
    app.get("/lab5/todos", (req, res) => {
      const { completed } = req.query;
      if (completed !== undefined) {
        const completedBool = completed === "true";
        const completedTodos = todos.filter(t => t.completed === completedBool);
        res.json(completedTodos);
        return;
      }
      res.json(todos);
    });
  
    // OLD: Create a new todo with GET (keep for backward compatibility)
    app.get("/lab5/todos/create", (req, res) => {
      const newTodo = {
        id: new Date().getTime(),
        title: "New Task",
        description: "New task description",
        completed: false,
      };
      todos.push(newTodo);
      res.json(todos);
    });
  
    // NEW: Create a new todo with POST
    app.post("/lab5/todos", (req, res) => {
      const newTodo = {
        ...req.body,
        id: new Date().getTime()
      };
      todos.push(newTodo);
      res.json(newTodo);
    });
  
    // OLD: Delete a todo with GET (keep for backward compatibility)
    app.get("/lab5/todos/:id/delete", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex(t => t.id === parseInt(id));
      if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
      }
      res.json(todos);
    });
  
    // NEW: Delete a todo with DELETE
    app.delete("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex(t => t.id === parseInt(id));
      if (todoIndex === -1) {
        res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
        return;
      }
      todos.splice(todoIndex, 1);
      res.sendStatus(200);
    });
  
    // Update todo with PUT
    app.put("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex(t => t.id === parseInt(id));
      if (todoIndex === -1) {
        res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
        return;
      }
      todos = todos.map(t => {
        if (t.id === parseInt(id)) {
          return { ...t, ...req.body };
        }
        return t;
      });
      res.sendStatus(200);
    });
  
    // Update todo properties using GET (old routes for compatibility)
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
      const { id, title } = req.params;
      const todo = todos.find(t => t.id === parseInt(id));
      if (todo) {
        todo.title = title;
      }
      res.json(todos);
    });
  
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
      const { id, completed } = req.params;
      const todo = todos.find(t => t.id === parseInt(id));
      if (todo) {
        todo.completed = completed === "true";
      }
      res.json(todos);
    });
  
    // Get todo by ID
    app.get("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todo = todos.find(t => t.id === parseInt(id));
      res.json(todo);
    });
  }