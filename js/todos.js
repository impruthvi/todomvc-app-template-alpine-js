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
            this.editingTodo = todo;
        },
		updateTodo() {
			this.editingTodo = null;
		},
	};
};
