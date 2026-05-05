'use client';

import { useState } from 'react';
import styles from './Card3D.module.css';
import { motion } from 'framer-motion';

const Card3D = ({ children, className = '' }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;

    setRotateX(angleX);
    setRotateY(angleY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`${styles.card3d} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      <motion.div
        className={styles.content}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Card3D;
