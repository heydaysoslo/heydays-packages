/*
https://material.io/design/motion/speed.html#easing
When elements ENTER the screen, use STANDARD EASING: [0.4, 0.0, 0.2, 1]
When elements EXIT the screen, use ACCELERATED EASING: [0.4, 0.0, 1, 1]
*/

export const easings = {
  default: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
}

export const transitions = {
  stagger: {
    initial: {
      opacity: 1
    },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.15
      }
    }
  },
  fadeInUp: {
    animate: {
      opacity: 1,
      y: 0,
      transition: easings.default
    },
    initial: {
      opacity: 0,
      y: 50,
      transition: easings.default
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3, ease: [0.4, 0.0, 1, 1] }
    }
  },
  fadeIn: {
    animate: {
      opacity: 1,
      transition: easings.default
    },
    initial: {
      opacity: 0,
      transition: easings.default
    }
  }
}
