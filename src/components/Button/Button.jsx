/*
 * COMPONENTE BUTTON 
 * 
 * Como usar:
 * import Button from './Button'
 * import { faChevronRight } from '@fortawesome/free-solid-svg-icons' // qualquer ícone do FontAwesome
 * 
 * <Button variant="filled" color="royal" icon={faChevronRight} onClick={() => alert('Oi!')}>
 *   Clique aqui
 * </Button>
 * 
 * Button com icone: passar o objeto do ícone (ex: faChevronRight) 
 * o componente button vai renderizar a tag <FontAwesome /> internamente
 * 
 * Variações:
 * - variant: filled (preenchido), outlined (só borda)
 * - color: royal, green, gray, red 
 * - size: small, medium, large
 * - fullWidth: true para ocupar largura total
 * 
 */

import styles from './Button.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ 
  children,                    // texto que vai aparecer dentro do botão
  variant = 'filled',          // tipo do botão: 'filled' (preenchido) ou 'outlined' (só borda)
  color = 'royal',             // cor do botão: 'royal', 'green', 'gray' ou 'red'
  size = 'medium',             // tamanho: 'small', 'medium' ou 'large'
  icon = null,                 // objeto do ícone FontAwesome (ex: faChevronRight) - não precisa da tag <FontAwesome />
  iconPosition = 'left',       // posição do ícone 'left' ou 'right' 
  fullWidth = false,           // se true, o botão ocupa toda a largura disponível
  disabled = false,            // se true, o botão fica cinza e não funciona
  type = 'button',             // tipo HTML 
  onClick,                     // função chamada quando clica no botão
  className = '',              // classes CSS extras que o usuário pode passar
  ...props                     // qualquer outra prop extra
}) => {
  
  const buttonClasses = [
    styles.button,                              // classe base que todos os botões têm
    styles[`button-${variant}`],                // ex: se variant='filled' vira 'button-filled'
    styles[`button-${color}`],                  // ex: se color='royal' vira 'button-royal' 
    styles[`button-${size}`],                   // ex: se size='medium' vira 'button-medium'
    disabled && styles['button-disabled'],      // só adiciona se disabled for true
    icon && styles['button-with-icon'],         // só adiciona se tiver um ícone
    fullWidth && styles['button-full-width'],   // só adiciona se fullWidth for true
    className                                   // qualquer classe extra que o usuário passar
  ].filter(Boolean).join(' ')                  
  
  // filter(Boolean) remove null, false, undefined do array
  // join(' ') transforma o array em string separada por espaços
  // no final: "button button-filled button-royal button-medium"

  // jsx que vai ser renderizado na tela
  return (
    <button 
      className={buttonClasses}    
      disabled={disabled}          
      type={type}                  
      onClick={onClick}            
      {...props}                   
    >
      {// ÍCONE À ESQUERDA 
       // só renderiza se tiver ícone e posição for 'left'
       // agora renderiza automaticamente a tag FontAwesome com o objeto do ícone
      }
      {icon && iconPosition === 'left' && (
        <span className={styles['button-icon']}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      
      {// TEXTO DO BOTÃO
       // só renderiza se tiver conteúdo (children)
       // permite botões só com ícone 
      }
      {children && (
        <span className={styles['button-text']}>
          {children}
        </span>
      )}
      
      {// ÍCONE À DIREITA
       // só renderiza se tiver ícone e posição for 'right'
       // agora renderiza automaticamente a tag FontAwesome com o objeto do ícone
      }
      {icon && iconPosition === 'right' && (
        <span className={styles['button-icon']}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
    </button>
  )
}

export default Button