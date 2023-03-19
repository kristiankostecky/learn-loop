import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Portal({ children }: { children: ReactNode }) {
  const [isOnClient, setIsOnClient] = useState(false)
  useEffect(() => {
    setIsOnClient(true)
  }, [])

  if (isOnClient) {
    return createPortal(children, document.body)
  }
  return null
}
