'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/shipping.module.css';
import { getProductById, Product } from '@/lib/storage';

function ShippingCheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const mode = searchParams.get('mode') || 'buy';
  const [product, setProduct] = useState<Product | null>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'correios' | 'public'>('correios');
  const [fullName, setFullName] = useState('Gustavo');
  const [cep, setCep] = useState('01001-000');
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [address, setAddress] = useState('Rua das Flores, 123 - Centro, São Paulo - SP');
  const [packagePhotoUrl, setPackagePhotoUrl] = useState('');

  useEffect(() => {
    if (productId) {
      const p = getProductById(productId);
      if (p) setProduct(p);
    }
  }, [productId]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPackagePhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <Link href={mode === 'trade' ? `/trade/request?productId=${productId || '1'}` : `/product/${productId || '1'}`} className={styles.backLink}>
        ← Voltar à tela anterior
      </Link>

      <div className={styles.stepperHeader}>
        <div className={`${styles.stepItem} ${step >= 1 ? (step === 1 ? styles.stepActive : styles.stepCompleted) : ''}`}>
          <div className={styles.stepNumber}>{step > 1 ? '✓' : '1'}</div>
          <span>Modalidade</span>
        </div>

        <div className={`${styles.stepItem} ${step >= 2 ? (step === 2 ? styles.stepActive : styles.stepCompleted) : ''}`}>
          <div className={styles.stepNumber}>{step > 2 ? '✓' : '2'}</div>
          <span>Dados do destino</span>
        </div>

        <div className={`${styles.stepItem} ${step >= 3 ? (step === 3 ? styles.stepActive : styles.stepCompleted) : ''}`}>
          <div className={styles.stepNumber}>{step > 3 ? '✓' : '3'}</div>
          <span>Fotos da embalagem</span>
        </div>

        <div className={`${styles.stepItem} ${step === 4 ? styles.stepActive : ''}`}>
          <div className={styles.stepNumber}>4</div>
          <span>Código e envio</span>
        </div>
      </div>

      <div className={styles.card}>
        {step === 1 && (
          <div>
            <div className={styles.sectionTag}>ENTREGA DA TROCA / COMPRA</div>
            <h1 className={styles.title}>Como será realizada a entrega?</h1>
            <p className={styles.subtitle}>Escolha o método mais conveniente para ambos os lados.</p>

            <div className={styles.optionsGrid}>
              <div
                className={`${styles.optionCard} ${deliveryMethod === 'correios' ? styles.optionCardSelected : ''}`}
                onClick={() => setDeliveryMethod('correios')}
              >
                <div className={styles.optionHeader}>
                  <div className={styles.optionIcon}>📦</div>
                  <div className={`${styles.radioCircle} ${deliveryMethod === 'correios' ? styles.radioCircleSelected : ''}`}>
                    {deliveryMethod === 'correios' && <div className={styles.radioDot} />}
                  </div>
                </div>
                <div>
                  <div className={styles.optionTitle}>Correios ou transportadora</div>
                  <p className={styles.optionSubtext}>Envio rastreado até o endereço do destinatário.</p>
                </div>
              </div>

              <div
                className={`${styles.optionCard} ${deliveryMethod === 'public' ? styles.optionCardSelected : ''}`}
                onClick={() => setDeliveryMethod('public')}
              >
                <div className={styles.optionHeader}>
                  <div className={styles.optionIcon}>📍</div>
                  <div className={`${styles.radioCircle} ${deliveryMethod === 'public' ? styles.radioCircleSelected : ''}`}>
                    {deliveryMethod === 'public' && <div className={styles.radioDot} />}
                  </div>
                </div>
                <div>
                  <div className={styles.optionTitle}>Encontro em local público</div>
                  <p className={styles.optionSubtext}>Combine a entrega em um lugar seguro para os dois.</p>
                </div>
              </div>
            </div>

            <div className={styles.actionsRow}>
              <button onClick={() => history.back()} className={styles.btnBack}>
                ← Voltar
              </button>
              <button onClick={() => setStep(2)} className={styles.btnNext}>
                Confirmar e continuar →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className={styles.title}>Para onde vamos enviar?</h1>
            <p className={styles.subtitle}>Preencha os dados para combinar a entrega.</p>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nome completo</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="Nome do destinatário"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className={styles.rowTwo}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CEP</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefone</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Endereço completo</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="Rua, número, complemento e cidade"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.actionsRow}>
              <button onClick={() => setStep(1)} className={styles.btnBack}>
                ← Voltar
              </button>
              <button onClick={() => setStep(3)} className={styles.btnNext}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className={styles.title}>Proteja seu hardware</h1>
            <p className={styles.subtitle}>Registre a embalagem e utilize proteção adequada para o produto.</p>

            <div className={styles.infoBannerBlue}>
              <span style={{ fontSize: '1.25rem' }}>📦</span>
              <span>Use plástico bolha, uma caixa resistente e preencha os espaços vazios. Fotografe o produto antes de fechar a embalagem.</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Fotos da embalagem</label>
              <input
                type="file"
                accept="image/*"
                id="packagePhoto"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="packagePhoto" className={styles.uploadBox}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📷</div>
                <div style={{ fontWeight: 700, color: '#2563eb' }}>Clique para enviar fotos da embalagem fechada</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>Garante segurança extra para o seu envio</div>
              </label>
              {packagePhotoUrl && (
                <img src={packagePhotoUrl} alt="Embalagem" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
              )}
            </div>

            <div className={styles.actionsRow}>
              <button onClick={() => setStep(2)} className={styles.btnBack}>
                ← Voltar
              </button>
              <button onClick={() => setStep(4)} className={styles.btnNext}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div className={styles.successIconCircle}>✓</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>
              TUDO COMBINADO
            </div>
            <h1 className={styles.title} style={{ marginTop: '0.25rem' }}>
              {mode === 'trade' ? 'Sua troca está preparada!' : 'Sua compra foi confirmada!'}
            </h1>
            <p className={styles.subtitle}>Combine o envio com o vendedor e compartilhe o código de rastreamento.</p>

            <div className={styles.summaryBox}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827' }}>
                  {product?.title || 'Placa de Vídeo RTX 3060 12GB'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>Referência: RE-000001</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#111827' }}>
                {product?.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'R$ 1.650,00'}
              </div>
            </div>

            <div className={styles.infoBannerBlue} style={{ justifyContent: 'center' }}>
              <span>🛡️ Este é um fluxo demonstrativo. Nenhuma compra, cobrança ou etiqueta de envio real foi gerada.</span>
            </div>

            <Link href="/" className={styles.btnNext} style={{ margin: '1.5rem auto 0 auto', display: 'inline-flex', width: 'auto' }}>
              Voltar para a comunidade →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShippingCheckoutPage() {
  return (
    <Suspense fallback={<div className={styles.container}>Carregando opções de frete...</div>}>
      <ShippingCheckoutContent />
    </Suspense>
  );
}