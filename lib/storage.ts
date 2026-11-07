export interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  type: 'SALE' | 'TRADE' | 'BOTH';
  condition: string;
  imageUrl: string;
  category: string;
  location?: string;
  sellerName?: string;
  rating?: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Placa de Vídeo RTX 3060 12GB',
    description: 'Em excelente estado, pouco uso em jogos. Acompanha caixa original. Entre em contato para esclarecer dúvidas e combinar todos os detalhes.',
    price: 1650.00,
    type: 'BOTH',
    condition: 'Seminovo - Em ótimo estado',
    category: 'Placas de Vídeo',
    location: 'São Paulo, SP',
    sellerName: 'Lucas M.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=700&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Console PlayStation 5 Slim 1TB',
    description: 'Acompanha dois controles originais e 3 jogos físicos. Pronto para uso.',
    price: 1500.00,
    type: 'BOTH',
    condition: 'Seminovo',
    category: 'Video Games',
    location: 'Campinas, SP',
    sellerName: 'Rodrigo K.',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Kit Memória RAM 16GB (2x8GB) DDR4',
    description: 'Memórias de 3200MHz com dissipador de calor. Desempenho e alta estabilidade.',
    price: 320.00,
    type: 'SALE',
    condition: 'Usado',
    category: 'Memórias e Armazenamento',
    location: 'Osasco, SP',
    sellerName: 'Ana P.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=700&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Processador AMD Ryzen 5 5600X',
    description: 'Acompanha cooler Wraith Stealth. Excelente desempenho em jogos.',
    price: 650.00,
    type: 'BOTH',
    condition: 'Seminovo',
    category: 'Processadores',
    location: 'São Paulo, SP',
    sellerName: 'Gabriel S.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=700&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Notebook Gamer Core i7 RTX 3050',
    description: 'Tela 144Hz, 16GB RAM e SSD 512GB. Muito bem conservado.',
    price: 3200.00,
    type: 'SALE',
    condition: 'Seminovo',
    category: 'Computadores',
    location: 'Santo André, SP',
    sellerName: 'Felipe T.',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Headset Gamer Havit H2015D',
    description: 'Som surround estéreo com microfone cancelador. Conexão P2 e USB.',
    price: 120.00,
    type: 'BOTH',
    condition: 'Usado',
    category: 'Periféricos',
    location: 'Guarulhos, SP',
    sellerName: 'Mariana C.',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Gabinete Gamer ATX Vidro Temperado',
    description: 'Acompanha 4 ventoinhas ARGB de 120mm instaladas e controlador de luzes.',
    price: 380.00,
    type: 'BOTH',
    condition: 'Seminovo',
    category: 'Computadores',
    location: 'São Paulo, SP',
    sellerName: 'Thiago R.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'SSD NVMe M.2 1TB Kingston NV2',
    description: 'Velocidade de leitura 3500MB/s, ótimo para aceleração de carregamentos.',
    price: 410.00,
    type: 'SALE',
    condition: 'Novo na caixa',
    category: 'Memórias e Armazenamento',
    location: 'Campinas, SP',
    sellerName: 'Beatriz L.',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'Teclado Mecânico RGB Switches Blue',
    description: 'Layout ABNT2 com anti-ghosting em todas as teclas. Cabo trançado.',
    price: 230.00,
    type: 'BOTH',
    condition: 'Usado',
    category: 'Periféricos',
    location: 'São Bernardo do Campo, SP',
    sellerName: 'Vitor H.',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop'
  }
];

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  const data = localStorage.getItem('reuse_products');
  if (!data) {
    localStorage.setItem('reuse_products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(data);
}

export function saveProduct(product: Omit<Product, 'id'>): Product {
  const products = getStoredProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    sellerName: 'Gustavo',
    rating: 5.0,
    location: 'São Paulo, SP'
  };
  const updated = [newProduct, ...products];
  localStorage.setItem('reuse_products', JSON.stringify(updated));
  return newProduct;
}

export function getProductById(id: string): Product | undefined {
  const products = getStoredProducts();
  return products.find((p) => p.id === id);
}
