"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Ready");
  const todoForm = document.querySelector("#todo");

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskInput = this.querySelector('input[name="taskEntry"]');
    generateList(taskInput);
  });

  function generateList(taskInput) {
    // get the list item
    const taskList = document.querySelector("#taskList");
    // generate new li element
    const taskElement = document.createElement("li");
    // Put the form value in the LI element
    taskElement.textContent = taskInput.value;
    taskList.appendChild(taskElement);
  }

  function clearInput(input) {
    input.value = "";
    return;
  }
});
