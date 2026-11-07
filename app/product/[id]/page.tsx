'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/product.module.css';
import { getProductById, Product } from '@/lib/storage';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const found = getProductById(id);
      if (found) setProduct(found);
    }
  }, [id]);

  if (!product) {
    return <div className={styles.container}>Carregando produto...</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Voltar para os produtos
      </Link>

      <div className={styles.detailCard}>
        <div className={styles.imageSection}>
          <img src={product.imageUrl} alt={product.title} className={styles.mainImage} />
          <div className={styles.overlayBadge}>
            🛡️ Imagem do usuário · Produto {product.condition}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.metaHeader}>
            <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
              {product.category}
            </span>
            <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.85rem' }}>★ {product.rating || 4.9}</span>
          </div>

          <h1 className={styles.productTitle}>{product.title}</h1>
          <div className={styles.locationText}>📍 {product.location || 'São Paulo, SP'}</div>

          <div className={styles.priceTag}>
            {product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'Disponível para Troca'}
          </div>

          <div className={styles.conditionBadge}>
            ✓ {product.condition}
          </div>

          <h2 className={styles.sectionTitle}>Sobre o produto</h2>
          <p className={styles.descriptionText}>{product.description}</p>

          <div className={styles.sellerBox}>
            <div className={styles.sellerAvatar}>
              {product.sellerName ? product.sellerName[0] : 'L'}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{product.sellerName || 'Lucas M.'}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Membro da comunidade ReUse</div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href={`/checkout/shipping?productId=${product.id}`} className={styles.btnBuy}>
              Comprar este produto →
            </Link>

            <Link href={`/trade/request?productId=${product.id}`} className={styles.btnTrade}>
              ⇄ Propor uma troca
            </Link>
          </div>

          <div className={styles.favBtn}>
            ♡ Salvar nos favoritos
          </div>
        </div>
      </div>
    </div>
  );
}
