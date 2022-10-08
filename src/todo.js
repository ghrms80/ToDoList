const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LIST = "toDos";
let toDos = [];

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  // console.log(toDoInput.value);
  const currentValue = toDoInput.value;
  printToDo(currentValue);
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(TODO_LIST);
  // localStorage에 TODO_LIST가 있는지 확인
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach((toDo) => {
      printToDo(toDo.message);
    });
  }
}

function printToDo(message) {
  const li = document.createElement("li");
  const checkBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  checkBtn.innerText = "✔️";
  checkBtn.addEventListener("click", checkToDo);
  delBtn.innerText = "✖️";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = `${message} `;
  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    message,
  };
  toDos.push(toDoObj); // toDos 배열에 저장
  saveToDo(); // localStorage에 저장
}

function saveToDo() {
  localStorage.setItem(TODO_LIST, JSON.stringify(toDos));
}

function checkToDo(event) {
  const li = event.target.parentNode;
  const liMessage = toDos.find((toDo) => toDo.id === parseInt(li.id));
  // li.className = li.className + "strike";
  li.classList.toggle("strike");
  console.log(li);
  toDoList.appendChild(li);
}

function deleteToDo(event) {
  // event를 실행시킨 target의 부모 태그
  const li = event.target.parentNode;
  // toDoList 태그에서 li를 제거
  toDoList.removeChild(li);
  // filter를 사용해서 return 결과가 true인 것들만 추출
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos; // toDos 배열 업데이트
  saveToDo();
}

init();
