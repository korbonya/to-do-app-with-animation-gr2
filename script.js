let input = document.querySelector("input");
let addButton = document.querySelector("#add");
let list = document.querySelector("#list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentIndex = null;

addButton.addEventListener("click", () => {
  let todo = input.value;
  if (todo === "") {
    alert("Please enter a todo");
    return;
  }

  if (currentIndex == null) {
    todos.push({
      todo,
      done: false,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    render();
    document.querySelectorAll("li").forEach((li, index) => {
      if (index === todos.length - 1) {
        li.style.animation = "moveIn 1s ease-in-out";
      }
    });
  } else {
    todos.splice(currentIndex, 1, {
      todo,
      done: todos[currentIndex].done,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    addButton.innerText = "Ajouter";
    currentIndex = null;
    render();
  }
});

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = `checkbox${index}`;
    checkbox.checked = todo.done;
    let label = document.createElement("label");
    label.innerText = todo.todo;
    label.htmlFor = checkbox.name;
    let update = document.createElement("button");
    update.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>`;
    update.classList.add("update");
    let button = document.createElement("button");
    button.innerText = "X";
    button.classList.add("delete");
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(update);
    li.appendChild(button);
    if (todo.done) {
      li.classList.add("done");
    }

    list.appendChild(li);

    checkbox.addEventListener("click", () => {
      todo.done = !todo.done;
      localStorage.setItem("todos", JSON.stringify(todos));
      render();
    });

    update.addEventListener("click", () => {
      input.value = todo.todo;
      addButton.innerText = "Modifier";
      currentIndex = index;
    });

    button.addEventListener("click", () => {
      li.style.animation = "moveOut 1s ease-in-out";
      li.addEventListener("animationend", () => {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        render();
      });
    });
  });
}

render();
