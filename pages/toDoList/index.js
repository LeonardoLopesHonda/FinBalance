import React, { useState } from "react";
import styles from "pages/assets/css/todo.module.css";

function ToDoList() {
  const [kakebo, setKakebo] = useState([
    {
      name: "Aluguel",
      budget: "Essencial",
      value: 900.0,
    },
    {
      name: "Lanche DiBurger",
      budget: "Não-Essencial",
      value: 60.0,
    },
    {
      name: "Livro de Ficção",
      budget: "Cultura",
      value: 98.8,
    },
    {
      name: "Remédio para cachorro",
      budget: "Emergência",
      value: 140.0,
    },
  ]);
  const [name, setNewName] = useState("");
  const [budget, setNewBudget] = useState("");
  const [value, setNewValue] = useState(0.0);

  function addTask(e) {
    e.preventDefault();

    if (name.trim() !== "" && budget.trim() !== "" && value > 0) {
      const newExpense = {
        name,
        budget,
        value,
      };
      setKakebo((prevKakebo) => [...prevKakebo, newExpense]);
      setNewName("");
      setNewBudget("");
      setNewValue(0);
    }
  }

  function deleteTask(index) {
    setKakebo((prevKakebo) => prevKakebo.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.toDoList}>
      <h1 className={styles.h1}>FinBalance</h1>
      <div>
        <form onSubmit={addTask}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nome Despesa"
            value={name}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Envelope"
            value={budget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
          <input
            className={styles.input}
            type="number"
            step=".1"
            placeholder="Valor Despesa"
            value={value}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button className={styles.addButton} type="submit">
            Add
          </button>
        </form>
      </div>

      <ol className={styles.ol}>
        {kakebo.map((expense, index) => (
          <li className={styles.li} key={index}>
            <span className={styles.text}>{expense.name}</span>
            <span className={styles.text}>{expense.budget}</span>
            <span className={styles.text}>R$ {expense.value}</span>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTask(index)}
            >
              Deletar
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
