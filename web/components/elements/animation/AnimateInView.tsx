import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { transitions } from '../../../utils/animation'
import { transitions as transitionType } from '../../../types'

/**
 * Usage:
 *
 * <AnimateInView
 *   className="Card"
 *   activeClassName="Card--is-visible"
 *   onInView={props => console.log(props.inView ? `I'm in view` : `I'm not in view`)}
 *   element="span"
 * >
 *   // Add children
 * </AnimateInView>
 *
 * Other resources
 * 📚Package: https://www.npmjs.com/package/react-intersection-observer
 * 🎥 With react-spring:  https://github.com/thebuilder/react-intersection-observer/blob/HEAD/docs/Recipes.md#trigger-animations
 */

type Props = {
  /**
   * The amount of the element to be visible before triggering animation.
   * Number between 0 - 1.
   */
  threshold?: number
  /**
   * Handler when element get into or out of view (threshold).
   */
  onInView?: (args: {
    inView?: boolean
    ref?: (node?: Element) => void
    entry?: IntersectionObserverEntry
  }) => void
  /**
   * Trigger animation multiple times.
   * Defaults to true.
   */
  triggerOnce?: boolean
  /**
   * Name of transition
   */
  transition?: transitionType
}

const AnimateInView: React.FC<Props> = ({
  children,
  threshold = 0.25,
  onInView,
  triggerOnce = true,
  transition = 'fadeInUp',
  ...props
}) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold,
    triggerOnce
  })

  useEffect(() => {
    if (onInView) {
      onInView({ inView, ref, entry })
    }
  }, [onInView, inView, ref, entry])

  return (
    <motion.div
      variants={transitions[transition]}
      animate={inView ? 'visible' : 'hidden'}
      ref={ref}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default styled(AnimateInView)(({ theme }) => css``)
