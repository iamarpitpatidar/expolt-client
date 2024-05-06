export interface DialogProps {
  props: {
    open: boolean
    onOpenChange: (open: boolean) => void
  }
  trigger: () => void
  dismiss: () => void
}
