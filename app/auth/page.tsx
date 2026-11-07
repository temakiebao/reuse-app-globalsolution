'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/auth.module.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.splitCard}>
        {/* BANNER VERDE LATERAL */}
        <div className={styles.leftBanner}>
          <div>
            <div className={styles.bannerBadge}>TECNOLOGIA QUE CONTINUA CIRCULANDO</div>
            <h2 className={styles.bannerTitle}>
              {isLogin
                ? 'Seu próximo hardware já pode estar aqui.'
                : 'Faça parte de uma comunidade que reaproveita.'}
            </h2>
            <p className={styles.bannerDesc}>
              Compre, venda e troque eletrônicos com mais transparência, menos desperdício e novas possibilidades para cada equipamento.
            </p>
          </div>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>♡</div>
              <div>
                <div className={styles.featureTitle}>Negociações mais seguras</div>
                <div className={styles.featureSubtext}>Informações claras em cada etapa da jornada.</div>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⇄</div>
              <div>
                <div className={styles.featureTitle}>Venda ou troca</div>
                <div className={styles.featureSubtext}>Escolha a melhor forma de renovar seu setup.</div>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>💬</div>
              <div>
                <div className={styles.featureTitle}>Watson ajuda você</div>
                <div className={styles.featureSubtext}>Orientação fácil para encontrar, anunciar e trocar.</div>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO DIREITA */}
        <div className={styles.rightForm}>
          <div className={styles.formTopNav}>
            <Link href="/" className={styles.backHomeLink}>
              ← Voltar para o início
            </Link>
          </div>

          <div className={styles.formLogo}>
            RE <span>USE</span>
          </div>

          <div className={styles.subHeading}>
            {isLogin ? 'BEM-VINDO DE VOLTA' : 'CRIE SUA CONTA'}
          </div>
          <h1 className={styles.mainHeading}>
            {isLogin ? 'Entre no ReUse' : 'Comece sua jornada'}
          </h1>
          <p className={styles.subText}>
            {isLogin
              ? 'Acesse seus favoritos, anúncios e negociações'
              : 'Leva menos de um minuto para criar seu perfil'}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Nome completo</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    required
                    placeholder="Como podemos chamar você?"
                    className={styles.input}
                  />
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>E-mail</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉</span>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Senha</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  required
                  placeholder={isLogin ? 'Digite sua senha' : 'Crie uma senha segura'}
                  className={styles.input}
                />
              </div>
            </div>

            {!isLogin && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirmar senha</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    required
                    placeholder="Digite a senha novamente"
                    className={styles.input}
                  />
                </div>
              </div>
            )}

            <div className={styles.formRow}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>
                  {isLogin
                    ? 'Manter minha conta conectada'
                    : 'Aceito os termos e a política de privacidade'}
                </span>
              </label>
              {isLogin && (
                <span className={styles.forgotLink}>Esqueci minha senha</span>
              )}
            </div>

            <button type="submit" className={styles.btnSubmit}>
              {isLogin ? 'Entrar na minha conta →' : 'Criar minha conta →'}
            </button>
          </form>

          <div className={styles.switchAuthText}>
            {isLogin ? (
              <>
                Ainda não tem uma conta?{' '}
                <button onClick={() => setIsLogin(false)}>Cadastre-se gratuitamente</button>
              </>
            ) : (
              <>
                Já possui uma conta?{' '}
                <button onClick={() => setIsLogin(true)}>Fazer login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
