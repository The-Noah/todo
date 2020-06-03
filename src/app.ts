const form = document.querySelector("form");
const inputElement = form.querySelector("input");
const todosContainer = document.querySelector(".todos");
const todos = JSON.parse(localStorage.getItem("todos") || "[]") as any[];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  todos.push({
    id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
    text: inputElement.value.trim()
  });

  inputElement.value = "";
  inputElement.focus();

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
});

todosContainer.addEventListener("click", (e) => {
  const index = todos.findIndex((todo) => (e.target as HTMLElement).parentElement.getAttribute("data-id") === todo.id);

  if((e.target as HTMLElement).className === "delete"){
    todos.splice(index, 1);

    renderTodos();
  }else if((e.target instanceof HTMLInputElement)){
    todos[index].checked = !todos[index].checked;
    if(!todos[index].checked){
      delete todos[index].checked;
    }
  }

  localStorage.setItem("todos", JSON.stringify(todos));
});

const renderTodos = () => {
  todosContainer.innerHTML = "";

  for(const todo of todos){
    const todoElement = document.createElement("div");
    todoElement.setAttribute("data-id", todo.id);
    todoElement.innerHTML = `
      <input type="checkbox" ${todo.checked ? "checked" : ""}>
      <span>${todo.text}</span>
      <span class="delete">&#10005;</span>
    `;

    todosContainer.appendChild(todoElement);
  }
};

renderTodos();
