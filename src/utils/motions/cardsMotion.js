export const cardsContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export const cardsVariants = {
  initial: {
    y: 0,
    opacity: 0,
  },
  animate: {
    y: -25,
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};
