'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/feed.module.css';
import { getStoredProducts, Product } from '@/lib/storage';

const CATEGORIES = [
  'Todos',
  'Computadores',
  'Placas de Vídeo',
  'Video Games',
  'Memórias e Armazenamento',
  'Processadores',
  'Periféricos'
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));

  const featuredProducts = filteredProducts.slice(0, 3);

  return (
    <main className={styles.container}>
      <nav className={styles.categoryNav} aria-label="Navegação por categorias de produtos">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.catBtn} ${selectedCategory === cat ? styles.catActive : ''}`}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* BANNER */}
      <div className={styles.heroBanner}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Seja bem vindo!</h1>
          <p className={styles.heroSubtitle}>
            Economize em peças de hardware com desconto ou doações!
          </p>
        </div>
        <div className={styles.heroGraphic}>💻</div>
      </div>

      {/* MEUS ANÚNCIOS */}
      <div className={styles.sectionHeader} id="meus-anuncios">
        <h2 className={styles.sectionTitle}>Meus anúncios</h2>
      </div>
      <div className={styles.myListingsCard}>
        <p className={styles.emptyText}>Nenhum anúncio pessoal cadastrado ainda.</p>
        <Link href="/anunciar" className={styles.btnCreate}>
          Criar meu primeiro anúncio
        </Link>
      </div>

      {/* ITENS EM DESTAQUE */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Itens em Destaque {selectedCategory !== 'Todos' && `• ${selectedCategory}`}
        </h2>
        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Oportunidades recentes na plataforma</span>
      </div>
      <div className={styles.grid}>
        {featuredProducts.map((p) => (
          <Link key={`feat-${p.id}`} href={`/product/${p.id}`} className={styles.card}>
            <button className={styles.heartBtn} aria-label="Adicionar aos favoritos">♡</button>
            <div className={styles.cardImageWrapper}>
              <img src={p.imageUrl} alt={p.title} className={styles.cardImg} />
            </div>
            <div className={styles.cardBody}>
              <div>
                <div className={styles.tagRow}>
                  <span className={styles.categoryTag}>{p.category}</span>
                  <span className={styles.ratingTag}>★ {p.rating || 5.0}</span>
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.priceText}>
                  {p.price ? `R$ ${p.price.toFixed(2).replace('.', ',')}` : 'Troca'}
                </span>
                <span className={styles.detailLink}>Ver detalhes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Outras Ofertas na Comunidade {selectedCategory !== 'Todos' && `• ${selectedCategory}`}
        </h2>
        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Anúncios filtrados de toda a rede ({filteredProducts.length})</span>
      </div>
      <div className={styles.grid}>
        {filteredProducts.map((p) => (
          <Link key={`comm-${p.id}`} href={`/product/${p.id}`} className={styles.card}>
            <button className={styles.heartBtn} aria-label="Adicionar aos favoritos">♡</button>
            <div className={styles.cardImageWrapper}>
              <img src={p.imageUrl} alt={p.title} className={styles.cardImg} />
            </div>
            <div className={styles.cardBody}>
              <div>
                <div className={styles.tagRow}>
                  <span className={styles.categoryTag}>{p.category}</span>
                  <span className={styles.ratingTag}>★ {p.rating || 4.8}</span>
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.priceText}>
                  {p.price ? `R$ ${p.price.toFixed(2).replace('.', ',')}` : 'Troca'}
                </span>
                <span className={styles.detailLink}>Ver detalhes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
