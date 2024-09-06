import './App.css';
import { useEffect, useState } from "react";

import PlannerList from "./PlannerList";
import Plan from './Plan';

function App() {
  const [tasks, setTasks] = useState([]);
  const [bgColor, setBgColor] = useState('darkblue'); 

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(savedTasks || []);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor; 
  }, [bgColor]);

  function addTask(name) {
    setTasks(prev => [...prev, { name: name, done: false }]);
  }

  function removeTask(indexToRemove) {
    setTasks(prev => prev.filter((taskObject, index) => index !== indexToRemove));
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Lets Build the Planner !!';
    }
    if (percentage === 100) {
      return 'Good Job, Continue that spirit!!';
    }
    return 'Come on!!';
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  function handleChangeColor() {
    const darkColors = ['#003366', '#004d00', '#3b3b3b', '#2e2e2e', '#1a1a1a']; 
    const randomColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    setBgColor(randomColor);
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <PlannerList onAdd={addTask} />
      {tasks.map((task, index) => (
        <Plan
          {...task}
          key={index}
          onRename={newName => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}
        />
      ))}
      <div className="color-change-button">
        <p>Do you want to change the color of the page?</p>
        <button onClick={handleChangeColor}>Click Here!!</button>
      </div>
    </main>
  );
}

export default App;
