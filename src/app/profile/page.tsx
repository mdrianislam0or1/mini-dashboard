"use client"

import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Calendar, LogOut, Mail, Shield, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/auth/signin')
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const { user } = session

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <Button

          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name || 'User'}
              </h2>
              <p className="text-gray-600">Welcome back!</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            {user.emailVerified && (
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Email Status</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Statistics
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dashboard Views</span>
              <span className="font-semibold text-gray-900">1,234</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Posts Created</span>
              <span className="font-semibold text-gray-900">42</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Users Followed</span>
              <span className="font-semibold text-gray-900">156</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Active</span>
              <span className="font-semibold text-gray-900">Now</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button  className="h-auto p-4 flex flex-col items-center gap-2">
            <User className="w-6 h-6" />
            <span>Edit Profile</span>
          </Button>

          <Button  className="h-auto p-4 flex flex-col items-center gap-2">
            <Shield className="w-6 h-6" />
            <span>Security Settings</span>
          </Button>

          <Button  className="h-auto p-4 flex flex-col items-center gap-2">
            <Mail className="w-6 h-6" />
            <span>Notifications</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
