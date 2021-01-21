import React from 'react'
import { motion } from 'framer-motion'
import { transitions } from '../../../utils/animation'
import { transitions as transitionsType } from 'types'

type Props = {
  /**
   * Name of transition
   */
  type?: transitionsType
  className?: string
}

const Animate: React.FC<Props> = ({
  className,
  children,
  type = 'fadeInUp'
}) => {
  return (
    <motion.div
      className={className}
      {...transitions[type]}
      exit={transitions[type].exit || transitions[type].initial}
    >
      {children}
    </motion.div>
  )
}

export default Animate
