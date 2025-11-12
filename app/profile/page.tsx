"use client"

import Link from "next/link"
import { LogOut, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/app/providers"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              TechStore
            </Link>
          </div>
        </header>
        <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              TechStore
            </Link>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">You need to be logged in to view your profile</p>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline">Create Account</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            TechStore
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info */}
          <Card className="md:col-span-1 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold">{user.email}</h2>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.metadata.creationTime || "").toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Edit Profile
            </Button>
          </Card>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors p-4 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">My Orders</h3>
                  <p className="text-sm text-muted-foreground">View your order history</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Account Settings</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                  Manage Addresses
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                  Payment Methods
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                  Notification Settings
                </button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
