"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useParams } from "next/navigation"
import { formatPrice } from "@/lib/format-price"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProducts.find((p) => p.id === productId)
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
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
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          <Link href="/" className="text-primary hover:underline">
            Voltar para produtos
          </Link>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            TechStore
          </Link>
          <Link href="/cart">
            <Button variant="outline">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar para Produtos
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden min-h-96">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} avaliações)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-2">Disponibilidade</p>
                <p className={`text-lg font-semibold ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>
                  {product.stock > 0 ? `${product.stock} em estoque` : "Fora de estoque"}
                </p>
              </div>
            </div>

            {/* Purchase Section */}
            <Card className="p-6 border">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Quantidade:</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      −
                    </Button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addedToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addedToCart ? "Adicionado ao Carrinho!" : "Adicionar ao Carrinho"}
                </Button>

                <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => setLiked(!liked)}>
                  <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current text-destructive" : ""}`} />
                  {liked ? "Remover da Lista de Desejos" : "Adicionar à Lista de Desejos"}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Envio Grátis</h3>
            <p className="text-sm text-muted-foreground">Envio grátis em pedidos acima de {formatPrice(100)}</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Devoluções em 30 Dias</h3>
            <p className="text-sm text-muted-foreground">Não satisfeito? Devolva dentro de 30 dias</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Garantia de 1 Ano</h3>
            <p className="text-sm text-muted-foreground">Todos os produtos incluem garantia do fabricante de 1 ano</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
