"use client"
import { useEffect, useRef, useState } from "react"

interface UseTypingAnimationOptions {
  text: string
  speed?: number
  delay?: number
  pauseBetween?: number
  enabled?: boolean
  onComplete?: () => void
  key?: string | number
}

export function useTypingAnimation({
  text,
  speed = 50,
  delay = 0,
  pauseBetween = 2000,
  enabled = true,
  onComplete,
  key = 0,
}: UseTypingAnimationOptions) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!enabled) {
      setDisplayedText("")
      setIsComplete(false)
      setIsTyping(false)
      return
    }

    setDisplayedText("")
    setIsComplete(false)
    setIsTyping(false)

    let cancelled = false
    let intervalId: ReturnType<typeof setInterval>

    const startTimer = setTimeout(() => {
      if (cancelled) return
      setIsTyping(true)
      let index = 0

      intervalId = setInterval(() => {
        if (cancelled) {
          clearInterval(intervalId)
          return
        }

        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(intervalId)
          setIsTyping(false)
          setIsComplete(true)
          // Fire callback after pauseBetween
          setTimeout(() => {
            if (!cancelled) {
              onCompleteRef.current?.()
            }
          }, pauseBetween)
        }
      }, speed)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      clearInterval(intervalId)
    }
  }, [text, speed, delay, pauseBetween, enabled, key])

  return { displayedText, isComplete, isTyping }
}
