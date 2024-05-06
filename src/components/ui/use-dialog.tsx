import { useState } from 'react'
import { DialogProps } from '@lib/types/components'

export function useDialog(): DialogProps {
  const [isOpen, setIsOpen] = useState(false)

  const trigger = () => setIsOpen(true)

  return {
    props: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
    trigger: trigger,
    dismiss: () => setIsOpen(false),
  }
}
