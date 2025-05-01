"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AuthRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  redirectUrl?: string
}

export default function AuthRequiredModal({ isOpen, onClose, redirectUrl }: AuthRequiredModalProps) {
  const router = useRouter()

  const handleLogin = () => {
    router.push(`/login${redirectUrl ? `?redirect=${redirectUrl}` : ""}`)
    onClose()
  }

  const handleSignup = () => {
    router.push(`/signup${redirectUrl ? `?redirect=${redirectUrl}` : ""}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          <DialogDescription>
            You need to be logged in to perform this action. Please log in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleLogin} className="sm:mr-2">
            Log In
          </Button>
          <Button onClick={handleSignup}>Sign Up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
