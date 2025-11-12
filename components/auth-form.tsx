"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  isLogin?: boolean;
}

export default function AuthForm({ isLogin = true }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          setError("As palavras-passe não coincidem");
          return;
        }
        await signup(email, password);
      }
      router.push("/perfil");
    } catch (err) {
      const error = err as { code?: string; message?: string };
      if (error.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso");
      } else if (error.code === "auth/weak-password") {
        setError("A palavra-passe deve ter pelo menos 6 caracteres");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("E-mail ou palavra-passe inválidos");
      } else {
        setError(error.message || "Ocorreu um erro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">
        {isLogin ? "Iniciar Sessão" : "Criar Conta"}
      </h2>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirmar palavra-passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? "A carregar..."
            : isLogin
            ? "Iniciar Sessão"
            : "Criar Conta"}
        </Button>
      </form>

      <p className="text-center text-muted-foreground text-sm mt-4">
        {isLogin ? "Ainda não tem conta? " : "Já tem conta? "}
        <Link
          href={isLogin ? "/auth/signup" : "/auth/login"}
          className="text-primary hover:underline"
        >
          {isLogin ? "Registar-se" : "Iniciar Sessão"}
        </Link>
      </p>
    </Card>
  );
}
