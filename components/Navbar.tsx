'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/navbar.module.css';

interface NavbarProps {
  onToggleHighContrast?: () => void;
  onFontChange?: (delta: number) => void;
  onOpenWatson?: () => void;
}

export default function Navbar({ onToggleHighContrast, onFontChange, onOpenWatson }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* BARRA DE ACESSIBILIDADE */}
      <div className={styles.accessibilityBar}>
        <span>♿ Acessibilidade ReUse</span>
        <div className={styles.a11yControls}>
          <button
            onClick={() => onFontChange && onFontChange(-0.1)}
            className={styles.a11yBtn}
            title="Diminuir tamanho do texto"
            aria-label="Diminuir texto"
          >
            A-
          </button>
          <button
            onClick={() => onFontChange && onFontChange(0.1)}
            className={styles.a11yBtn}
            title="Aumentar tamanho do texto"
            aria-label="Aumentar texto"
          >
            A+
          </button>
          <button
            onClick={onToggleHighContrast}
            className={styles.a11yBtn}
            title="Alternar Modo de Alto Contraste"
            aria-label="Alto contraste"
          >
            ◑ Alto Contraste
          </button>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.brandLogo} aria-label="ReUse Início">
            RE <span>USE</span>
          </Link>

          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Pesquisar peças, placas, consoles..."
              aria-label="Campo de pesquisa de hardware"
            />
          </div>

          <div className={styles.userActions}>
            <Link href="/anunciar" className={styles.btnAnunciar}>
              + ANUNCIAR
            </Link>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={styles.profileMenu}
              aria-expanded={isDropdownOpen}
              aria-label="Menu Minha Conta"
            >
              <div className={styles.avatarCircle}>G</div>
              <div className={styles.profileInfo}>
                <span className={styles.greetingText}>Olá, Gustavo</span>
                <span className={styles.accountName}>Minha conta ▾</span>
              </div>
              <span className={styles.menuIcon}>≡</span>
            </button>

            {/* DROPDOWN MENU FIDEDIGNO À IMAGEM ANEXADA */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  href="/#favoritos"
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className={styles.dropdownIcon}>♡</span>
                  <span>Meus favoritos (0)</span>
                </Link>

                <Link
                  href="/#meus-anuncios"
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className={styles.dropdownIcon}>📦</span>
                  <span>Meus anúncios</span>
                </Link>

                <Link
                  href="/checkout/shipping"
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className={styles.dropdownIcon}>🔀</span>
                  <span>Jornada de compra</span>
                </Link>

                <Link
                  href="/auth"
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className={styles.dropdownIcon}>🔒</span>
                  <span>Entrar ou criar conta</span>
                </Link>

                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (onOpenWatson) onOpenWatson();
                  }}
                >
                  <span className={styles.dropdownIcon}>💬</span>
                  <span>Falar com Watson</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
