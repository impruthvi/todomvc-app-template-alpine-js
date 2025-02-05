window.todos = function () {
	return {
		filter: "all",
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

		get filteredTodos() {
			return {
				all: this.todos,
				active: this.active,
				completed: this.completed,
			}[this.filter];
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
		},
		clearCompleted() {
			this.todos = this.active;
		},
	};
};
