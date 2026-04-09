export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  measures?: {
    boca?: string;
    altura?: string;
    base?: string;
  };
  capacity?: string;
  features?: string[];
  colors?: string[];
  materials?: string;
  careInstructions?: string[];
  customizationOptions?: string[];
}

export const CATEGORIES = [
  { id: 'eco', name: 'Linha Sustentável', description: 'Brindes amigos do planeta, livres de BPA e recicláveis.' },
  { id: 'tacas', name: 'Taças Premium', description: 'Elegância redefinida para momentos especiais.' },
  { id: 'copos', name: 'Copos & Canecas', description: 'Versatilidade e estilo para todos os eventos.' },
  { id: 'outros', name: 'Kits & Acessórios', description: 'O complemento perfeito para sua marca.' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'ecolabel-550',
    name: 'Copo Ecolabel 550ml',
    category: 'eco',
    description: 'Impressão de qualidade fotográfica 360° sem limites. O queridinho dos eventos sustentáveis.',
    images: [
      'https://picsum.photos/seed/eco1/800/1000',
      'https://picsum.photos/seed/eco2/800/1000',
      'https://picsum.photos/seed/eco3/800/1000',
    ],
    capacity: '550ml',
    measures: { boca: '9,8cm', altura: '14cm', base: '6cm' },
    features: ['Ecologicamente Sustentável', 'Qualidade Fotográfica', 'Impressão 360°'],
    materials: 'Plástico PP (Polipropileno) 100% Reciclável',
    careInstructions: ['Lavar com esponja macia', 'Não utilizar no micro-ondas', 'Evitar produtos abrasivos'],
    customizationOptions: ['Impressão Digital 360°', 'Silk Screen', 'Qualidade Fotográfica'],
  },
  {
    id: 'gin-elegance',
    name: 'Taça Gin Elegance',
    category: 'tacas',
    description: 'Experimente a elegância redefinida com acabamento translúcido e design ergonômico.',
    images: [
      'https://picsum.photos/seed/gin1/800/1000',
      'https://picsum.photos/seed/gin2/800/1000',
      'https://picsum.photos/seed/gin3/800/1000',
    ],
    capacity: '600ml',
    measures: { boca: '8,5cm', altura: '21,5cm', base: '8cm' },
    features: ['Design Premium', 'Cores Translúcidas', 'Alta Resistência'],
    materials: 'Poliestireno de Alta Resistência',
    careInstructions: ['Lavar com detergente neutro', 'Não empilhar quando molhado', 'Evitar quedas bruscas'],
    customizationOptions: ['Transfer Laser', 'Silk Screen', 'Tampografia'],
  },
  {
    id: 'gel-congelante',
    name: 'Caneca com Gel Congelante',
    category: 'copos',
    description: 'Mantenha sua bebida gelada por muito mais tempo com nossa tecnologia de gel térmico.',
    images: [
      'https://picsum.photos/seed/mug1/800/1000',
      'https://picsum.photos/seed/mug2/800/1000',
      'https://picsum.photos/seed/mug3/800/1000',
    ],
    capacity: '300ml',
    measures: { boca: '7,5cm', altura: '12cm', base: '8,5cm' },
    features: ['Gel Térmico', 'Cores Vibrantes', 'Ideal para Chopp'],
    materials: 'Acrílico com Gel Térmico Atóxico',
    careInstructions: ['Congelar de boca para baixo', 'Não utilizar no micro-ondas', 'Lavar manualmente'],
    customizationOptions: ['Silk Screen', 'Transfer Laser'],
  },
  {
    id: 'balde-gelo',
    name: 'Balde de Gelo 5L',
    category: 'outros',
    description: 'O centro das atenções em qualquer festa ou evento corporativo. Amplo espaço para sua marca.',
    images: [
      'https://picsum.photos/seed/bucket1/800/1000',
      'https://picsum.photos/seed/bucket2/800/1000',
      'https://picsum.photos/seed/bucket3/800/1000',
    ],
    capacity: '5 Litros',
    measures: { boca: '24,5cm', altura: '20,5cm', base: '15,5cm' },
    features: ['Grande Capacidade', 'Personalização Ampla', 'Resistente'],
    materials: 'Poliestireno Reforçado',
    careInstructions: ['Limpar com pano úmido', 'Não utilizar solventes', 'Secar após o uso'],
    customizationOptions: ['Silk Screen', 'Adesivo Vinil', 'Impressão Digital'],
  },
  {
    id: 'new-eco',
    name: 'Copo New Eco',
    category: 'eco',
    description: 'Estilo Starbucks com tampa e canudo, perfeito para o dia a dia e brindes corporativos.',
    images: [
      'https://picsum.photos/seed/starbucks1/800/1000',
      'https://picsum.photos/seed/starbucks2/800/1000',
    ],
    capacity: '480ml',
    measures: { boca: '8,5cm', altura: '12,7cm', base: '6,4cm' },
    features: ['Biodegradável', 'Com Tampa e Canudo', 'Reutilizável'],
    materials: 'Plástico PP com Aditivo Biodegradável',
    careInstructions: ['Lavar antes do primeiro uso', 'Pode ir à lava-louças (ciclo suave)', 'Não ferver'],
    customizationOptions: ['Silk Screen', 'Transfer Laser', 'Impressão 360°'],
  },
  {
    id: 'taca-vinho',
    name: 'Taça Vinho Elegance',
    category: 'tacas',
    description: 'Sofisticação em cada detalhe para vinhos e espumantes. O toque de classe que seu evento merece.',
    images: [
      'https://picsum.photos/seed/wine1/800/1000',
      'https://picsum.photos/seed/wine2/800/1000',
    ],
    capacity: '600ml',
    measures: { boca: '7cm', altura: '24cm', base: '8.5cm' },
    features: ['Haste Longa', 'Cristalino', 'Premium'],
    materials: 'Poliestireno Cristal Premium',
    careInstructions: ['Lavar com detergente neutro', 'Não utilizar esponja de aço', 'Secar com pano de microfibra'],
    customizationOptions: ['Transfer Laser', 'Silk Screen'],
  },
  {
    id: 'copo-long-drink',
    name: 'Copo Long Drink 350ml',
    category: 'copos',
    description: 'O clássico indispensável para qualquer celebração. Versátil, resistente e com cores vibrantes.',
    images: [
      'https://picsum.photos/seed/long1/800/1000',
      'https://picsum.photos/seed/long2/800/1000',
    ],
    capacity: '350ml',
    measures: { boca: '6cm', altura: '15cm', base: '5.5cm' },
    features: ['Cores Neon', 'Alta Durabilidade', 'Econômico'],
    materials: 'Poliestireno de Alta Qualidade',
    careInstructions: ['Lavar com sabão neutro', 'Não utilizar em temperaturas extremas', 'Evitar quedas'],
    customizationOptions: ['Silk Screen', 'Transfer Laser', 'Tampografia'],
  },
  {
    id: 'kit-caipirinha',
    name: 'Kit Caipirinha Premium',
    category: 'outros',
    description: 'Tudo o que você precisa para preparar a bebida mais brasileira com estilo e praticidade.',
    images: [
      'https://picsum.photos/seed/kit1/800/1000',
      'https://picsum.photos/seed/kit2/800/1000',
    ],
    features: ['Completo', 'Personalizado', 'Presente Ideal'],
    materials: 'Copo em Vidro ou Acrílico, Socador em Madeira, Tábua em Bambu',
    careInstructions: ['Lavar itens de madeira à mão', 'Secar imediatamente', 'Não deixar de molho'],
    customizationOptions: ['Gravação a Laser', 'Silk Screen'],
  },
  {
    id: 'taca-champagne',
    name: 'Taça Champagne 180ml',
    category: 'tacas',
    description: 'Brinde aos sucessos com nossa taça de champagne de design slim e elegante.',
    images: [
      'https://picsum.photos/seed/champ1/800/1000',
      'https://picsum.photos/seed/champ2/800/1000',
    ],
    capacity: '180ml',
    measures: { boca: '5cm', altura: '22cm', base: '6.5cm' },
    features: ['Design Slim', 'Brilho Intenso', 'Festas'],
    materials: 'Poliestireno Cristal',
    careInstructions: ['Lavar com cuidado', 'Não utilizar produtos químicos fortes', 'Secar à sombra'],
    customizationOptions: ['Transfer Laser', 'Silk Screen'],
  }
];
