'use client';

import { useState } from 'react';
import styles from '@/styles/watson.module.css';

interface WatsonChatProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export default function WatsonChat({ isOpenExternal, onCloseExternal }: WatsonChatProps) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'watson', text: 'Olá! Sou o assistente Watson da ReUse. Como posso ajudar com seu hardware, entrega ou trocas hoje?' }
  ]);

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal;
  const toggleChat = () => {
    if (onCloseExternal && isOpenExternal) {
      onCloseExternal();
    } else {
      setIsOpenInternal(!isOpenInternal);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = 'Estou aqui para ajudar com a compatibilidade de peças, estimativa de preço ou etapas de entrega!';
      const lower = userMsg.toLowerCase();
      if (lower.includes('troca') || lower.includes('trocar')) {
        reply = 'Para negociar uma troca, clique em "Propor uma troca" na tela do produto e siga para a etapa de envio!';
      } else if (lower.includes('frete') || lower.includes('entrega') || lower.includes('envio')) {
        reply = 'Na etapa de frete você pode escolher entre envio por Correios/transportadora ou combinar encontro em local público!';
      } else if (lower.includes('placa') || lower.includes('rtx') || lower.includes('gpu')) {
        reply = 'Placas de vídeo usadas costumam ter ótima durabilidade. Verifique o estado da ventoinha e se acompanha caixa!';
      }
      setMessages((prev) => [...prev, { sender: 'watson', text: reply }]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={styles.watsonTrigger}
        aria-label="Converse com assistente Watson"
      >
        <div className={styles.watsonIcon}>💬</div>
        <div className={styles.textGroup}>
          <span className={styles.subLabel}>PRECISA DE UMA MÃO?</span>
          <span className={styles.mainLabel}>Converse com Watson</span>
        </div>
        <span style={{ marginLeft: '4px', fontSize: '1.2rem' }}>{isOpen ? '✕' : '+'}</span>
      </button>

      {isOpen && (
        <div className={styles.chatModal} role="dialog" aria-label="Assistente Watson AI">
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderTitle}>
              <span className={styles.onlineBadge}></span>
              <span>Assistente Watson AI</span>
            </div>
            <button onClick={toggleChat} className={styles.closeBtn} aria-label="Fechar chat">✕</button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`${styles.msgBubble} ${m.sender === 'watson' ? styles.watsonMsg : styles.userMsg}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className={styles.chatFooter}>
            <input
              type="text"
              placeholder="Digite sua dúvida..."
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn}>Enviar</button>
          </form>
        </div>
      )}
    </>
  );
}
