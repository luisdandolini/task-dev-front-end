import styles from './Content.module.css';
import { PlusCircle } from "@phosphor-icons/react";
import { ClipboardText } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Task } from '../Task/Task';
import Swal from 'sweetalert2';

interface Task {
  id: number;
  name: string;
}

export function Content(){
  const [taskName, setTaskName] = useState('');
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const createdTask = () => {
    axios.post('http://localhost:3000/tasks', {
      name: taskName
    }).then(() => {
      getAllTasks();
    }).catch(error => {
      console.log(error);
    });
  };

  const getAllTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setAllTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const editTask = (id: number, newName: string) => {
    axios.put(`http://localhost:3000/tasks/${id}`, {
      name: newName 
    })
      .then(() => {
        setAllTasks(prevTasks => prevTasks.map(task => {
          if (task.id === id) {
            return { ...task, name: newName }; 
          }
          return task;
        }));
      })
      .catch(error => {
        console.log(error);
      })
  };

  const handleDeleteTask = (id: number) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Uma vez excluída, você não poderá recuperar esta tarefa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E6F9F",
      cancelButtonColor: "#E25858",
      confirmButtonText: "Sim, exclua!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        Swal.fire("Excluído!", "Sua tarefa foi excluída.", "success");
      }
    });
  };

  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        console.log('Tarefa excluida:', id);
        setAllTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.log(error)
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
          <p>{allTasks.length}</p>
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
                  <Task 
                    content={task.name} 
                    onDelete={() => handleDeleteTask(task.id)}
                    onEditTask={(newContent) => editTask(task.id, newContent)} // Corrigido aqui
                    />
                </div>
              ))}
            </div>
          )
        }
      </div>
    </main>
  )
}