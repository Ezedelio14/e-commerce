import Link from "next/link"
import AuthForm from "@/components/auth-form"

export default function LoginPage() {
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
        <AuthForm isLogin={true} />
      </main>
    </div>
  )
}
