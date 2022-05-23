import React from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import Todo from './components/todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = React.useState(props.tasks);
  const [filter, setFilter] = React.useState('All');

  function addTask(name) {
    const newTask = { id: "todo-"+nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task=>id!==task.id);
    setTasks(remainingTasks);
  }

  function editTask(id,newName){
    const editedTaskList = tasks.map(task=>{
      //if the task has the same id as the edited task
      if (id===task.id){
        return {...task,name:newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) { 
    const updatedTasks = tasks.map(task =>{
      if (id === task.id) {
        return {...task, completed:!task.compleated}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task=>(
    <Todo 
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterButtons = FILTER_NAMES.map(filterName => (
    <FilterButton
      key={filterName}
      name={filterName}
      setFilter={setFilter}
      isPressed={filterName === filter}
    />
  ));

  const tasksNoun = taskList.length==1?"task":"tasks";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div>
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className='filters btn-group stack-exception'>
        {filterButtons}
      </div>
      <h2 className='list-heading'>{headingText} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
