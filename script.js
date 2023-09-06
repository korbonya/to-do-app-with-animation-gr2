let input = document.querySelector("input");
let addButton = document.querySelector("#add");
let list = document.querySelector("#list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

addButton.addEventListener("click", () => {
  let todo = input.value;
  if (todo === "") {
    alert("Please enter a todo");
    return;
  }
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

    let button = document.createElement("button");
    button.innerText = "X";
    button.classList.add("delete");
    li.appendChild(checkbox);
    li.appendChild(label);
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
