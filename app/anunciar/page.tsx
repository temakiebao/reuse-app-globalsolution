'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/anunciar.module.css';
import { saveProduct } from '@/lib/storage';

export default function AnunciarPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('350,00');
  const [category, setCategory] = useState('Computadores');
  const [imageUrl, setImageUrl] = useState('');
  const [acceptTrade, setAcceptTrade] = useState(true);

  // Seleção de Foto (Câmera ou Galeria no Smartphone)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Informe o título do anúncio!');
    
    saveProduct({
      title,
      description: description || 'Sem descrição informada.',
      price: price ? parseFloat(price.replace(',', '.')) : undefined,
      type: acceptTrade ? 'BOTH' : 'SALE',
      condition: 'Seminovo',
      category,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=700&auto=format&fit=crop'
    });

    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Voltar ao início
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Novo anúncio</h1>
        <p className={styles.subtitle}>Conecte sua peça ao próximo setup. Venda, troque ou doe.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título do anúncio</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder="Ex.: Placa de Vídeo RTX 3060 12GB"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Preço (R$)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="350,00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Categoria</label>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Computadores">Computadores</option>
                <option value="Placas de Vídeo">Placas de Vídeo</option>
                <option value="Video Games">Video Games</option>
                <option value="Memórias e Armazenamento">Memórias e Armazenamento</option>
                <option value="Processadores">Processadores</option>
                <option value="Periféricos">Periféricos</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fotos do produto</label>
            <input
              type="file"
              accept="image/*"
              id="photoUpload"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            
            {!imageUrl ? (
              <label htmlFor="photoUpload" className={styles.uploadDashedBox}>
                <div className={styles.uploadIcon}>📦</div>
                <div className={styles.uploadTitle}>Selecione as fotos do seu produto</div>
                <div className={styles.uploadSub}>
                  PNG ou JPG · até 10 MB por foto (Clique para abrir Câmera ou Galeria)
                </div>
              </label>
            ) : (
              <div className={styles.previewContainer}>
                <img src={imageUrl} alt="Foto selecionada" className={styles.previewImg} />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className={styles.btnRemovePhoto}
                >
                  🗑️ Remover foto
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descrição</label>
            <textarea
              rows={4}
              className={styles.textarea}
              placeholder="Conte sobre o estado da peça, tempo de uso e especificações..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={acceptTrade}
              onChange={(e) => setAcceptTrade(e.target.checked)}
            />
            <span>Estou aberto a propostas de troca</span>
          </label>

          <button type="submit" className={styles.btnSubmit}>
            Publicar anúncio →
          </button>

          <p className={styles.footerNote}>
            Ao anunciar, você contribui para um futuro com menos descarte.
          </p>
        </form>
      </div>
    </div>
  );
}