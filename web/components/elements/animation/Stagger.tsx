import React from 'react'
import { motion } from 'framer-motion'
import { transitions } from '../../../utils/animation'
import { nanoid } from 'nanoid'

import { transitions as transitionsType } from '../../../types'

const ID = nanoid(10)

type Props = {
  /**
   * Name of transition
   */
  type?: transitionsType
  className?: string
  childrenClassName?: string
}

const Stagger: React.FC<Props> = ({
  className,
  children,
  type = 'fadeInUp',
  childrenClassName = '',
  ...props
}) => {
  return (
    <motion.div
      className={className}
      variants={transitions.stagger}
      initial="initial"
      animate="animate"
      exit="initial"
      {...props}
    >
      {Array.isArray(children) &&
        children.map((child, i) => {
          return (
            <motion.div
              className={childrenClassName}
              key={`stagger-child-${ID}-${i}`}
              variants={transitions[type]}
            >
              {child}
            </motion.div>
          )
        })}
    </motion.div>
  )
}

export default Stagger
