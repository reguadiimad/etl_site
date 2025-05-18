export const leftAnimation = (d = 0) => ({
    initial: { x: -50, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { type: "spring", damping: 10, delay: d }
  }), rightAnimation = (d = 0) => ({
    initial: { x: 50, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { type: "spring", damping: 10, delay: d }
  }),topAnimation = (d = 0) => ({
    initial: { y: -50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { type: "spring", damping: 10, delay: d }
  }),bottomAnimation = (d = 0) => ({
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { type: "spring", damping: 10, delay: d }
  }), scaleAnimation = (d = 0) => ({
    initial: { scale: 0.5, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { type: "spring", damping: 12, delay: d }
  });

