import styles from './Header.module.css';
import { Rocket } from '@phosphor-icons/react';

export function Header() {
  return(
    <header className={styles.bg_header}>
      <div className={styles.title}>
        <Rocket size={32} color='#4EA8DE' />
        <h1>Tas<span>ks</span></h1>
      </div>
    </header>
  )
}  