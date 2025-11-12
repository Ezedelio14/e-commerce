"use client"

import Link from "next/link"
import { useState } from "react"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAdded, setShowAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-smooth group">
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-56 bg-secondary overflow-hidden cursor-pointer">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </div>
          )}
          {product.stock < 5 && (
            <div className="absolute bottom-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-semibold">
              Estoque Baixo
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 cursor-pointer text-sm">
              {product.name}
            </h3>
          </Link>
          <button onClick={() => setIsWishlisted(!isWishlisted)} className="flex-shrink-0 mt-1 transition-smooth">
            <Heart
              className="w-5 h-5"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              color={isWishlisted ? "rgb(239, 68, 68)" : "currentColor"}
            />
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5"
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
                color={i < Math.floor(product.rating) ? "rgb(251, 191, 36)" : "rgb(209, 213, 219)"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full transition-smooth relative overflow-hidden"
        >
          {showAdded ? (
            <span>Adicionado!</span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
