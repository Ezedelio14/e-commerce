"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/15 via-accent/5 to-primary/10 py-16 md:py-24 overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Conteúdo à esquerda */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold">
                Novidades disponíveis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
              Tecnologia premium a{" "}
              <span className="text-accent">preços imbatíveis</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Descubra a nossa coleção exclusiva de eletrónica, equipamentos de
              áudio e acessórios de última geração. Envio gratuito em compras
              superiores a 100.000 Kz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#products">
                <Button size="lg" className="gap-2">
                  Comprar agora
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Ver promoções
              </Button>
            </div>
          </div>

          {/* Estatísticas à direita */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="text-3xl font-bold text-primary">24+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Produtos premium
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="text-3xl font-bold text-accent">4.7★</div>
              <div className="text-sm text-muted-foreground mt-1">
                Avaliação média
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Clientes satisfeitos
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground mt-1">
                Produtos autênticos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
