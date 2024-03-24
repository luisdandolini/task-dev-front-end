import styles from './Content.module.css';
import { PlusCircle } from "@phosphor-icons/react";
import { ClipboardText } from '@phosphor-icons/react';

export function Content(){
  return(
    <main>
      <div className={styles.created}>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
        />
        <button>
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
        <div className={styles.content}>
          <ClipboardText size={52} color='#808080'/>
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      </div>
    </main>
  )
}