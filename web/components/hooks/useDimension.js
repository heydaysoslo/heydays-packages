import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const initialState = {
  width: 0,
  height: 0,
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  x: 0,
  y: 0
}
//  ref is the reference to the element whose height and with is required
//  const divRef = useRef(null);
//  const { height, width } = useDimension(divRef);
//  <div ref={divRef}>
const useDimension = ref => {
  const [dimensions, setDimensions] = useState(initialState)
  const resizeObserverRef = useRef(null)

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries = []) => {
      entries.forEach(entry => {
        setDimensions({
          ...entry?.contentRect,
          outerWidth: entry?.borderBoxSize[0]?.inlineSize,
          outerHeight: entry?.borderBoxSize[0]?.blockSize
        })
      })
    })
    if (ref.current) resizeObserverRef.current.observe(ref.current)
    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
    }
  }, [ref])
  return dimensions
}

export default useDimension
