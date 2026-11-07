'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/trade.module.css';
import formStyles from '@/styles/anunciar.module.css';
import { getProductById, Product } from '@/lib/storage';

export default function TradeRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState<Product | null>(null);
  const [chatMsg, setChatMsg] = useState('');

  useEffect(() => {
    if (productId) {
      const p = getProductById(productId);
      if (p) setProduct(p);
    }
  }, [productId]);

  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/checkout/shipping?productId=${productId || '1'}&mode=trade`);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Voltar para o produto
      </Link>

      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Vamos fazer uma troca?</h1>
          <p className={styles.subtitle}>Converse, combine e dê uma nova vida ao seu hardware.</p>
        </div>
        <span className={styles.statusBadge}>● Em negociação</span>
      </div>

      <div className={styles.twoColumns}>
        {/* COLUNA 1: SEU ITEM */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>1. Seu item para troca</h2>
          
          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Tipo de hardware</label>
            <select className={formStyles.select}>
              <option>Computadores</option>
              <option>Placas de Vídeo</option>
              <option>Processadores</option>
              <option>Memórias</option>
            </select>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Condição de uso</label>
            <select className={formStyles.select}>
              <option>Seminovo (pouco uso)</option>
              <option>Usado em bom estado</option>
              <option>Novo na caixa</option>
            </select>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Descrição do componente</label>
            <textarea
              rows={4}
              className={formStyles.textarea}
              placeholder="Informe tempo de uso e especificações técnicas..."
            />
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Fotos do componente</label>
            <input type="file" className={formStyles.input} />
          </div>

          <div className={styles.infoBoxBlue}>
            <span>🛡️</span>
            <span>Uma boa troca começa com transparência. Compartilhe fotos reais e todas as informações do seu item.</span>
          </div>
        </div>

        {/* COLUNA 2: PRODUTO ALVO & CHAT */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>2. Produto que você quer receber</h2>

          {product && (
            <div className={styles.targetProductPreview}>
              <img src={product.imageUrl} alt={product.title} className={styles.targetImg} />
              <div>
                <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 700, background: '#eff6ff', padding: '0.1rem 0.4rem', borderRadius: 4 }}>
                  {product.category}
                </span>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: '2px' }}>{product.title}</div>
                <div style={{ fontWeight: 900, fontSize: '1rem', color: '#111827', marginTop: '2px' }}>
                  {product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'Troca'}
                </div>
              </div>
            </div>
          )}

          <div className={styles.chatSectionTitle}>Converse com o vendedor</div>

          <div className={styles.sellerBubble}>
            <strong>{product?.sellerName || 'Lucas M.'}</strong>
            <p style={{ marginTop: '4px' }}>Olá! O item está disponível. Que tal negociarmos uma troca?</p>
          </div>

          <form onSubmit={handleProceedToShipping}>
            <div className={styles.chatInputRow}>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="Escreva sua mensagem..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
              />
              <button type="submit" className={styles.btnSend}>✈</button>
            </div>

            <button type="submit" className={styles.btnAcceptTrade}>
              Aceitar troca e combinar entrega →
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.75rem' }}>
            Clique acima para definir os dados de frete e envio.
          </p>
        </div>
      </div>
    </div>
  );
}
