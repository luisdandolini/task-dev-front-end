import styles from './Task.module.css';
import { Trash } from "@phosphor-icons/react"

interface Props {
  content: string
}

export function Task({ content }: Props) {
  return(
    <div className={styles.container}>
      <input 
        type="checkbox" 
        className={styles.checkbox}
      />
      <label className={styles.custom_checkbox}></label>

      <p>
        {content}
      </p>

      <button>
        <Trash size={20} color='#808080'/>
      </button>
    </div>
  )
} 