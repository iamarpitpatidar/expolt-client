import { DialogProps } from '@lib/types/components'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Spinner } from '@components/ui/spinner'
import { useTransition } from 'react'
import { Logout } from '@lib/actions'

export default function LogoutDialog({ dialog }: { dialog: DialogProps }) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await Logout()
    })
  }

  return (
    <Dialog {...dialog.props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            All existing running VM will be terminated, are you sure you want to
            logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={dialog.dismiss}>Cancel</Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleClick}
          >
            {isPending && <Spinner className="w-4 h-4 mr-2" />}
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
