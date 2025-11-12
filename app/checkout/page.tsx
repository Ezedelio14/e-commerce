"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/app/providers"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState<"shipping" | "payment" | "confirm">("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              TechStore
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
          <Link href="/">
            <Button>Continuar Comprando</Button>
          </Link>
        </main>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
          <p className="text-muted-foreground mb-2">Obrigado pela sua compra.</p>
          <p className="text-muted-foreground mb-6">Confirmação do pedido foi enviada para seu email.</p>
          <p className="text-sm text-muted-foreground mb-6">Redirecionando para a página inicial em 3 segundos...</p>
          <Link href="/">
            <Button className="w-full">Voltar para Início</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const shippingCost = 10
  const taxAmount = total * 0.1
  const finalTotal = total + shippingCost + taxAmount

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            TechStore
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/cart" className="inline-flex items-center text-primary hover:underline mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar para Carrinho
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Steps */}
            <div className="flex gap-4 mb-8">
              {["shipping", "payment", "confirm"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step === s || ["shipping", "payment", "confirm"].indexOf(step) > i
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && <div className="h-1 w-8 bg-border" />}
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            {step === "shipping" && (
              <Card className="p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Endereço de Entrega</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Primeiro Nome"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Último Nome"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Número de Telefone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Endereço"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Cidade"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="Província"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="CEP"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <Button
                  className="w-full mt-6"
                  onClick={() => setStep("payment")}
                  disabled={!formData.firstName || !formData.address || !formData.city || !formData.zip}
                >
                  Prosseguir para Pagamento
                </Button>
              </Card>
            )}

            {/* Payment Form */}
            {step === "payment" && (
              <Card className="p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Informação de Pagamento</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Número do Cartão"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={16}
                    className="w-full px-4 py-2 border rounded-lg bg-background text-foreground"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      maxLength={5}
                      className="px-4 py-2 border rounded-lg bg-background text-foreground"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={3}
                      className="px-4 py-2 border rounded-lg bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("shipping")}>
                    Voltar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setStep("confirm")}
                    disabled={!formData.cardNumber || !formData.expiry || !formData.cvv}
                  >
                    Revisar Pedido
                  </Button>
                </div>
              </Card>
            )}

            {/* Order Review */}
            {step === "confirm" && (
              <Card className="p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Revisar Pedido</h2>
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <p>
                    <strong>Nome:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zip}
                  </p>
                  <p>
                    <strong>Cartão:</strong> •••• {formData.cardNumber.slice(-4)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("payment")}>
                    Voltar
                  </Button>
                  <Button className="flex-1" onClick={handlePlaceOrder}>
                    Fazer Pedido
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envio</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Imposto</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
