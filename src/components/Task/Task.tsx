import styles from './Task.module.css';
import { Trash, Pencil, Check, X } from "@phosphor-icons/react"
import axios from 'axios';
import { useState } from 'react';

interface Props {
  content: string;
  onDelete: () => void;
  onEditTask: (newContent: string) => void;
  taskId: number;
  onTaskCompletion: () => void;
}

export function Task({ content, onDelete, onEditTask, taskId, onTaskCompletion }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [completed, setCompleted] = useState(false);

  const handleEditConfirm = () => {
    setIsEditing(false);
    onEditTask(editedContent);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleCheckboxChange = () => {
    setCompleted(true);
    axios.put(`http://localhost:3000/tasks/${taskId}`, {
      name: editedContent,
      completed: true
    }).then(() => {
      console.log('Tarefa marcada como concluída:', taskId);
      onTaskCompletion();
    }).catch(error => {
      console.log(error);
    });
  };

  return(
    <div className={styles.container}>
      <input 
        type="checkbox" 
        className={styles.checkbox}
        checked={completed}
        onChange={handleCheckboxChange} 
      />
      <label className={styles.custom_checkbox}></label>

      {isEditing ? (
        <div className={styles.container_edit}>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleEditConfirm}
            autoFocus
          />
          <button onClick={handleEditConfirm}>
            <Check color='#28a745' />
          </button>
          <button onClick={handleCancelEdit}>
            <X color='#dc3545' />
          </button>
        </div>
      ) : (
        <p onClick={() => setIsEditing(true)}>
          {content}
        </p>
      )}

      <div className={styles.container_buttons}>
        <button onClick={onDelete}>
          <Trash size={20} color='#808080'/>
        </button>

        <button onClick={() => setIsEditing(true)}>
          <Pencil size={20} color='#808080'/>
        </button>
      </div>
    </div>
  )
} 