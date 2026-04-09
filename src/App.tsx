import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Leaf, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  Instagram, 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Star,
  Droplets,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  LayoutGrid,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PRODUCTS, CATEGORIES, type Product } from "./constants";
import { cn } from "@/lib/utils";

// --- Components ---

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] bg-secondary/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === currentIndex ? "w-6 bg-brand-magenta" : "bg-white/50"
                )} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProductPage = ({ categoryId, onBack, onNavigate }: { categoryId: string, onBack: () => void, onNavigate: (id: string) => void, key?: string }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const products = PRODUCTS.filter(p => p.category === categoryId);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-4">{category?.name}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{category?.description}</p>
        </div>

        <div className="space-y-32">
          {products.map((product, index) => {
            const isExpanded = expandedProductId === product.id;
            
            return (
              <div 
                key={product.id} 
                className={cn(
                  "grid lg:grid-cols-2 gap-16 items-start",
                  index % 2 !== 0 && "lg:flex-row-reverse"
                )}
              >
                <div className={cn(index % 2 !== 0 && "lg:order-2", "sticky top-32")}>
                  <ImageCarousel images={product.images} />
                </div>
                <div className="space-y-8">
                  <div 
                    className="cursor-pointer group/info"
                    onClick={() => toggleExpand(product.id)}
                  >
                    <Badge className="mb-4 bg-brand-magenta/10 text-brand-magenta border-none">
                      {product.capacity}
                    </Badge>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-4xl font-heading font-bold group-hover/info:text-brand-magenta transition-colors">
                        {product.name}
                      </h2>
                      <div className={cn(
                        "w-8 h-8 rounded-full bg-secondary flex items-center justify-center transition-transform duration-300",
                        isExpanded && "rotate-180 bg-brand-magenta/10 text-brand-magenta"
                      )}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 text-sm font-bold text-brand-magenta flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      {isExpanded ? "Clique para recolher detalhes" : "Clique para ver mais detalhes técnicos"}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-8 space-y-8 border-t border-muted mt-4">
                          {product.materials && (
                            <div>
                              <h4 className="text-sm uppercase tracking-widest font-bold text-foreground mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-brand-magenta" />
                                Material
                              </h4>
                              <p className="text-muted-foreground">{product.materials}</p>
                            </div>
                          )}

                          {product.customizationOptions && (
                            <div>
                              <h4 className="text-sm uppercase tracking-widest font-bold text-foreground mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-brand-magenta" />
                                Opções de Personalização
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {product.customizationOptions.map(opt => (
                                  <Badge key={opt} variant="outline" className="rounded-lg px-3 py-1">
                                    {opt}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {product.careInstructions && (
                            <div>
                              <h4 className="text-sm uppercase tracking-widest font-bold text-foreground mb-3 flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-brand-magenta" />
                                Instruções de Cuidado
                              </h4>
                              <ul className="space-y-2">
                                {product.careInstructions.map(inst => (
                                  <li key={inst} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-magenta/40" />
                                    {inst}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-muted">
                    {product.measures && (
                      <>
                        <div className="text-center">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Boca</div>
                          <div className="font-bold">{product.measures.boca}</div>
                        </div>
                        <div className="text-center border-x border-muted">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Altura</div>
                          <div className="font-bold">{product.measures.altura}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Base</div>
                          <div className="font-bold">{product.measures.base}</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {product.features?.map(f => (
                      <div key={f} className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm font-medium">
                        <Sparkles className="w-4 h-4 text-brand-magenta" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="w-full sm:w-auto gradient-bg h-14 px-10 rounded-2xl shadow-lg">
                    Solicitar Orçamento
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-32 pt-16 border-t border-muted flex flex-col items-center text-center">
          <h3 className="text-2xl font-heading font-bold mb-6">Gostou desses modelos?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onBack}
              className="h-14 px-8 rounded-2xl"
            >
              Voltar para Home
            </Button>
            <Button 
              size="lg" 
              onClick={() => {
                const currentIndex = CATEGORIES.findIndex(c => c.id === categoryId);
                const nextIndex = (currentIndex + 1) % CATEGORIES.length;
                onNavigate(CATEGORIES[nextIndex].id);
              }}
              className="gradient-bg h-14 px-8 rounded-2xl shadow-lg"
            >
              Ver Próxima Linha
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GallerySection = ({ onSelectCategory }: { onSelectCategory: (id: string) => void }) => {
  return (
    <section id="galeria" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-magenta font-bold mb-4">
            <LayoutGrid className="w-6 h-6" />
            <span>GALERIA DE PRODUTOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Explore Nosso Universo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clique em uma categoria para ver todos os detalhes e modelos disponíveis em nosso catálogo 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              className="cursor-pointer group"
              onClick={() => onSelectCategory(cat.id)}
            >
              <Card className="h-full overflow-hidden border-none shadow-lg rounded-3xl bg-background">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${cat.id}/800/1000`} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">{cat.name}</h3>
                    <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                      <span>Ver modelos</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-brand-magenta/30">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          scrolled || currentPage !== "home" ? "glass shadow-sm py-3" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigateTo("home")}
          >
            <img 
              src="https://i.postimg.cc/Ghb2fL88/LOGO_CUSTOMIDIA_PERSONALIZADOS_PRETO.png" 
              alt="Customidia Logo" 
              className="h-26 md:h-40 w-auto object-contain transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateTo("home")} className="text-sm font-medium hover:text-brand-magenta transition-colors">Home</button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => navigateTo(cat.id)}
                className={cn(
                  "text-sm font-medium hover:text-brand-magenta transition-colors",
                  currentPage === cat.id && "text-brand-magenta"
                )}
              >
                {cat.name}
              </button>
            ))}
            <a href="#galeria" className="text-sm font-medium hover:text-brand-magenta transition-colors">Galeria</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex gradient-bg border-none hover:opacity-90 shadow-md">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <button 
              className="md:hidden p-2 hover:bg-secondary rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <button onClick={() => navigateTo("home")} className="text-2xl font-heading font-bold text-left">Home</button>
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => navigateTo(cat.id)}
                  className="text-2xl font-heading font-bold text-left"
                >
                  {cat.name}
                </button>
              ))}
              <Button className="w-full gradient-bg mt-4">
                Solicitar Orçamento
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          {currentPage === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-magenta/10 blur-[120px] rounded-full" />
                  <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-blue/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <Badge className="bg-brand-magenta/10 text-brand-magenta border-brand-magenta/20 px-4 py-1 text-sm">
                      Catálogo 2026 • Novidades
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-[1.1]">
                      O Seu Estilo, <br />
                      <span className="gradient-text">Impresso em Cada Detalhe.</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                      Brindes personalizados e sustentáveis com qualidade fotográfica e impressão 360° para eventos inesquecíveis.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        size="lg" 
                        onClick={() => navigateTo("eco")}
                        className="gradient-bg h-14 px-8 text-lg shadow-xl hover:scale-105 transition-transform"
                      >
                        Explorar Linhas
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                        Ver Catálogo 2026
                      </Button>
                    </div>
                  </div>

                  <div className="relative aspect-square">
                    <div className="absolute inset-0 gradient-bg opacity-20 blur-3xl rounded-full animate-pulse" />
                    <img 
                      src="https://picsum.photos/seed/hero-cup/1000/1000" 
                      alt="Brinde Premium" 
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-muted-foreground/30 rounded-full animate-[spin_20s_linear_infinite]" />
                  </div>
                </div>
              </section>

              {/* Gallery Section */}
              <GallerySection onSelectCategory={navigateTo} />

              {/* Eco-Friendly Highlight */}
              <section className="py-24 bg-brand-green/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 text-brand-green font-bold mb-4">
                        <Leaf className="w-6 h-6" />
                        <span>LINHA SUSTENTÁVEL</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Compromisso com o Planeta
                      </h2>
                      <p className="text-lg text-muted-foreground mb-8">
                        Nossa linha reutilizável em Plástico PP é livre de BPA, atóxica e 100% reciclável. 
                        Personalização que cuida do meio ambiente sem abrir mão do estilo.
                      </p>
                      <Button 
                        onClick={() => navigateTo("eco")}
                        className="bg-brand-green hover:bg-brand-green/90 text-white h-12 px-8 rounded-xl"
                      >
                        Conhecer Linha Eco
                      </Button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="space-y-4 pt-12">
                        <Card className="overflow-hidden rounded-3xl border-none shadow-lg">
                          <img src="https://picsum.photos/seed/eco-cup-1/400/500" alt="Eco Cup" className="w-full aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
                        </Card>
                      </div>
                      <div className="space-y-4">
                        <Card className="overflow-hidden rounded-3xl border-none shadow-lg">
                          <img src="https://picsum.photos/seed/eco-cup-2/400/500" alt="Eco Cup" className="w-full aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
                        </Card>
                        <Card className="overflow-hidden rounded-3xl border-none shadow-lg">
                          <img src="https://picsum.photos/seed/eco-cup-3/400/300" alt="Eco Cup" className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <ProductPage 
              key={currentPage} 
              categoryId={currentPage} 
              onBack={() => navigateTo("home")} 
              onNavigate={navigateTo}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 pt-20 pb-10 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="https://i.postimg.cc/Ghb2fL88/LOGO_CUSTOMIDIA_PERSONALIZADOS_PRETO.png" 
                  alt="Customidia Logo" 
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-muted-foreground max-w-sm mb-8">
                Transformando ideias em brindes inesquecíveis. Qualidade premium e compromisso sustentável em cada detalhe.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Linhas</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => navigateTo(cat.id)} className="hover:text-brand-magenta transition-colors">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Contato</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: (00) 00000-0000
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  www.customidiabrindes.com.br
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Customidia Brindes Personalizados. Todos os direitos reservados.</p>
            <p className="font-medium text-foreground">Transformando Ideias em Brindes.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full w-14 h-14 p-0 gradient-bg shadow-2xl hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7" />
        </Button>
      </div>
    </div>
  );
}
