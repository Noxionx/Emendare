/**
 * Hook to use hammerJs
 */
import { useEffect, useState, useRef } from 'react'
import Hammer from 'hammerjs'
import { Callback } from 'diff'

export const useGesture = (
  gestures: Array<{ effect: string; callback: Function }>,
  option?: any
) => {
  const [hammerTime, setHammerTime] = useState<HammerManager>()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (node instanceof HTMLElement) {
      setHammerTime(new Hammer(node, option))
    }
  }, [])

  useEffect(() => {
    if (hammerTime) {
      gestures.forEach((gesture: { effect: string; callback: any }) => {
        console.log('hey')
        hammerTime.on(gesture.effect, gesture.callback)
      })
      return () => {
        hammerTime.stop(true)
        hammerTime.destroy()
      }
    }
  }, [hammerTime])

  return { ref }
}
