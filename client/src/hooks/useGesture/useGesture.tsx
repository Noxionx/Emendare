import { useEffect, useState, useRef } from 'react'
import Hammer from 'hammerjs'

export const useGesture = ({
  gestures,
  option
}: {
  gestures: Array<{ effect: string; callback: Function }>
  option?: any
}) => {
  const [hammerTime, setHammerTime] = useState()
  const ref = useRef(new HTMLElement())

  // useEffect(() => {
  //   const node = ref
  //   if (node instanceof HTMLElement) {
  //     setHammerTime(new Hammer(node.current, option))
  //   }
  // }, [])

  useEffect(() => {
    gestures.forEach((gesture: { effect: string; callback: Function }) => {
      hammerTime.on(gesture.effect, () => gesture.callback())
    })
    return () => {
      hammerTime.stop()
      hammerTime.destroy()
    }
  }, [gestures])
}
