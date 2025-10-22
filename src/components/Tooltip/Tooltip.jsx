/*
 * COMPONENTE TOOLTIP
 * 
 * Tooltip reutilizável que pode envolver qualquer elemento
 * (ícones, texto, botões, imagens, etc)
 * 
 * Como usar:
 * import Tooltip from './Tooltip'
 * 
 * // SIMPLES - apenas texto
 * <Tooltip text="Descrição do NCM que aparece ao passar o mouse">
 *   <ícone />
 * </Tooltip>
 * 
 * // COMPOSTO - conteúdo HTML/React para poder usar mais de uma linha, formatação, etc
 * <Tooltip content={
 *   <div>
 *     <strong>NCM 8532.24:</strong> Capacitores de papel<br/>
 *     <strong>NCM 8532.24.10:</strong> Capacitores de dielétrico
 *   </div>
 * }>
 *   <ícone />
 * </Tooltip>
 * 
 * // Exemplos de uso com diferentes elementos:
 * <Tooltip text="Informação adicional">
 *   <FontAwesomeIcon icon={faCircleInfo} />
 * </Tooltip>
 * 
 * <Tooltip text="Informação adicional">
 *   <button>Clique aqui</button>
 * </Tooltip>
 * 
 * <Tooltip text="Mais detalhes">
 *   <span>Texto com tooltip</span>
 * </Tooltip>
 * 
 * Props:
 * - text: texto simples que aparece na tooltip (string)
 * - content: conteúdo React/HTML (JSX) - tem prioridade sobre 'text'
 * - position: posição da tooltip - 'top', 'bottom', 'left', 'right' (padrão: 'top')
 * - children: elemento que dispara a tooltip (pode ser qualquer elemento)
 * 
 */

import { useState } from 'react'
import styles from './Tooltip.module.css'

const Tooltip = ({ 
  children,              // elemento que vai mostrar a tooltip ao passar o mouse 
  text,                  // texto simples que aparece na tooltip
  content,               // conteúdo React/HTML mais complexo - tem prioridade sobre 'text'
  position = 'top'       // posição: 'top', 'bottom', 'left', 'right'
}) => {
  const [isVisible, setIsVisible] = useState(false)

  // se não tiver nem texto nem conteúdo, não renderiza nada
  if (!text && !content) return children

  // o que será mostrado: content tem prioridade sobre text
  const tooltipContent = content || text

  return (
    <div 
      className={styles['tooltip-container']}
      onMouseEnter={() => setIsVisible(true)}   // mostra tooltip ao passar o mouse
      onMouseLeave={() => setIsVisible(false)}  // esconde tooltip ao sair o mouse
    >
      {children}
      
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[`tooltip-${position}`]}`}>
          {tooltipContent}
        </div>
      )}
    </div>
  )
}

export default Tooltip
