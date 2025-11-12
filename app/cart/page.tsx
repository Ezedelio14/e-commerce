"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CartItemComponent from "@/components/cart-item"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
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
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8">Comece a comprar para adicionar itens ao seu carrinho</p>
          <Link href="/">
            <Button>Continuar Comprando</Button>
          </Link>
        </main>
      </div>
    )
  }

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
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {items.map((item) => (
                <CartItemComponent
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envio</span>
                  <span className="font-medium">{formatPrice(10)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Imposto</span>
                  <span className="font-medium">{formatPrice(total * 0.1)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>{formatPrice(total + 10 + total * 0.1)}</span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Prosseguir para Checkout
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  Continuar Comprando
                </Button>
                <Button variant="ghost" className="w-full" onClick={clearCart}>
                  Limpar Carrinho
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
