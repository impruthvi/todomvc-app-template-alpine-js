window.todos = function () {
	return {
		todos: [],
		newTodo: "",
        editingTodo: null,
		addTodo() {
			this.todos.push({
				id: Date.now(),
				title: this.newTodo,
				completed: false,
			});
			this.newTodo = "";
		},
		get active() {
			return this.todos.filter((t) => !t.completed);
		},
        get completed() {
            return this.todos.filter((t) => t.completed);
        },
		deleteTodo(todo) {
			this.todos = this.todos.filter((t) => t.id !== todo.id);
		},
        editTodo(todo) {
			todo.cashedTitle = todo.title;
            this.editingTodo = todo;
        },
		updateTodo(todo) {
			if (todo.title.trim() === "") {
				this.deleteTodo(todo);
			}

			this.editingTodo = null;
		},
		cancelTodo(todo) {
			todo.title = todo.cashedTitle;
			this.editingTodo = null;
			delete todo.cashedTitle;
		}
	};
};
