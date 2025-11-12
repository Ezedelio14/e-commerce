"use client"

import { Trash2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <div className="relative w-24 h-24 bg-muted rounded-lg flex-shrink-0">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{formatPrice(product.price)} cada</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(product.id, quantity - 1)}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(product.id, quantity + 1)}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemove(product.id)}
            className="ml-auto text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="text-right font-semibold">{formatPrice(product.price * quantity)}</div>
    </div>
  )
}
