import styles from './Content.module.css';
import { PlusCircle } from "@phosphor-icons/react";
import { ClipboardText } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Task } from '../Task/Task';

interface Task {
  id: number;
  name: string;
}

export function Content(){
  const [taskName, setTaskName] = useState('');
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const handleTaskName = (event: any) => {
    setTaskName(event.target.value);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const createdTask = () => {
    axios.post('http://localhost:3000/tasks', {
      name: taskName
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const getAllTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        console.log(response.data);
        setAllTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return(
    <main>
      <div className={styles.created}>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          value={taskName}
          onChange={handleTaskName}
        />
        <button onClick={createdTask}>
          Criar
          <PlusCircle />
        </button>
      </div>

      <div className={styles.container_tasks}>
        <div className={styles.tasks_created}>
          <p>Tarefas criadas</p>
          <p>0</p>
        </div>

        <div className={styles.tasks_completed}>
          <p>Concluídas</p>
          <p>0</p>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.container_content}>
        {
          allTasks.length <= 0 ? (
            <div className={styles.content}>
              <ClipboardText size={52} color='#808080'/>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <div>
              {allTasks.map(task => (
                <div key={task.id}>
                  <Task content={task.name} />
                </div>
              ))}
            </div>
          )
        }
      </div>
    </main>
  )
}