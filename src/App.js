import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {

    const getTasks = async () => {
      const tasksfromServer = await fetchTasks();
      setTasks(tasksfromServer);
    };

    getTasks();
  }, []);

  // Fatch Tasks - using fetch API with async.....await
  const fetchTasks = async () => {
    // fetch returns a 'promise', and we have to await that 'promise'
    const res = await fetch(`http://localhost:5000/tasks`);
    const data = await res.json();  // Get json data

    return data;
  };

  // Fatch Task
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();  // Get json data

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`,
    {
      method: 'POST',
      // Since we are adding data, we have to add 'headers' because we need to specify our 'Content-type' and a 'body'
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks(prevTasks => [...prevTasks, data]);

    /* const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task };
    setTasks(prevTasks => [...prevTasks, newTask]); */
  };

  // Delete Task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE'
      }
    );

    setTasks(prevTasks => prevTasks.filter(task => id !== task.id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(prevShowAddTask => !prevShowAddTask)} showAdd={showAddTask} />

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} /> }
              
              {tasks.length > 0 ? 
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : 
                'No Tasks to Show' 
              }
            </>
          )}
        />
        
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
