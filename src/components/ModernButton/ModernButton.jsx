'use client';

import styles from './ModernButton.module.css';
import { motion } from 'framer-motion';

const ModernButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ''
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className={styles.content}>{children}</span>
      <span className={styles.glow}></span>
    </motion.button>
  );
};

export default ModernButton;
