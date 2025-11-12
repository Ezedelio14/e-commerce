"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { mockProducts, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CategoryFilter from "@/components/category-filter";

export default function Home() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    ...Array.from(new Set(mockProducts.map((p) => p.category))),
  ];

  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    if (activeCategory !== "All") {
      products = products.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return products;
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Pesquisar por nome, categoria ou recursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8" id="products">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
            Procurar por Categoria
          </h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {mockProducts.length}{" "}
            produtos
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar sua pesquisa ou filtros
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-bold">
                  ⚡
                </div>
                EzedHub
              </h4>
              <p className="text-sm text-muted-foreground">
                Produtos de tecnologia premium para todos
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Loja</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Ofertas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Novidades
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contacte-nos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Devoluções
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Informações de Envio
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EzedHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
