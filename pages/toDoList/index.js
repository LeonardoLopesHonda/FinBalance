import React, { useState } from "react";
import styles from "pages/assets/css/todo.module.css";

function ToDoList() {
  const [tasks, setTasks] = useState(["Teste1", "Teste2", "Teste3"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {}

  function deleteTask(index) {}

  function moveTaskUp(index) {}

  function moveTaskDown(index) {}

  return (
    <div className={styles.toDoList}>
      <h1 className={styles.h1}>To-Do-List</h1>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Adicione um gasto"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className={styles.addButton} onClick={addTask}>
          Add
        </button>
      </div>

      <ol className={styles.ol}>
        {tasks.map((task, index) => (
          <li className={styles.li} key={index}>
            <span className={styles.text}>{task}</span>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTask(index)}
            >
              Deletar
            </button>
            <button
              className={styles.moveButton}
              onClick={() => moveTaskUp(index)}
            >
              ⬆️
            </button>
            <button
              className={styles.moveButton}
              onClick={() => moveTaskDown(index)}
            >
              ⬇️
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
