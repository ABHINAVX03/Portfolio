'use client';

import styles from './GlassCard.module.css';
import { motion } from 'framer-motion';

const GlassCard = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      className={`${styles.glassCard} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
