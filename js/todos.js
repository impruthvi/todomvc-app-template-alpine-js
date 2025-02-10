window.todoStore = {
	todos: JSON.parse(localStorage.getItem("todo-store") || '[]'),

	save ()	{
		localStorage.setItem("todo-store", JSON.stringify(this.todos));
	}

}

window.todos = function () {
	return {

		...todoStore,

		filter: "all",
		newTodo: "",
        editingTodo: null,
		addTodo() {
			if (!this.newTodo.trim()) {
				return;
			}
			this.todos.push({
				id: Date.now(),
				title: this.newTodo,
				completed: false,
			});

			this.save();

			this.newTodo = "";
		},
		get active() {
			return this.todos.filter((t) => !t.completed);
		},
        get completed() {
            return this.todos.filter((t) => t.completed);
        },
		get allCompleted() {
			return this.todos.length === this.completed.length;
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
			this.save();
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
			this.save();
		},
		cancelTodo(todo) {
			todo.title = todo.cashedTitle;
			this.editingTodo = null;
			delete todo.cashedTitle;
		},
		clearCompleted() {
			this.todos = this.active;
			this.save();
		},
		toggleAllTodos() {
			const allCompleted = this.allCompleted;
			this.todos.forEach((t) => (t.completed = !allCompleted));
			this.save();
		},
		toggleTodo(todo) {
			todo.completed = !todo.completed;
			this.save();
		}
	};
};
