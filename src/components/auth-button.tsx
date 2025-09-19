"use client"

import { Button } from "@/components/button"
import { LogOut, User } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/profile">
          <Button variant="outline" className="flex items-center gap-2">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <User className="w-4 h-4" />
            )}
            {session.user?.name || 'Profile'}
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn('google', { callbackUrl: '/profile' })}>
      Sign In
    </Button>
  )
}
