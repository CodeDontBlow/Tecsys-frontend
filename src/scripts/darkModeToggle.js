/**
 * Dark Mode Toggle - Sistema Independente
 * 
 * Script vanilla JavaScript que:
 * - Cria um botão no navbar com ícone Bootstrap Icons
 * - Gerencia o estado do tema (light/dark)
 * - Persiste a escolha no localStorage
 * - Detecta preferência do sistema
 * - Não interfere com código React existente
 */

(function() {
    'use strict';

    // Chave para localStorage
    const STORAGE_KEY = 'theme-preference';
    
    // Número máximo de tentativas para criar o botão (20 × 100ms = 2 segundos)
    const MAX_BUTTON_CREATION_ATTEMPTS = 20;
    
    // Função para obter o tema inicial
    function getInitialTheme() {
        // Primeiro, verifica localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return saved;
        }
        
        // Depois, verifica preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Padrão: light
        return 'light';
    }
    
    // Função para aplicar o tema
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleButton(theme);
    }
    
    // Função para alternar tema
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
    }
    
    // Função para criar o botão de toggle
    function createToggleButton() {
        // Verifica se já existe
        if (document.getElementById('dark-mode-toggle')) {
            return;
        }
        
        // Encontra o navbar
        const navbar = document.querySelector('.navbar-nav:last-child');
        if (!navbar) {
            console.warn('Navbar não encontrado, botão não foi criado');
            return;
        }
        
        // Cria o item de lista
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        // Cria o botão
        const button = document.createElement('button');
        button.id = 'dark-mode-toggle';
        button.setAttribute('aria-label', 'Alternar modo escuro');
        button.setAttribute('type', 'button');
        button.setAttribute('tabindex', '0');
        button.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        
        // Event listeners para mouse e teclado
        button.addEventListener('click', toggleTheme);
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // Adiciona ao navbar
        li.appendChild(button);
        navbar.appendChild(li);
    }
    
    // Função para atualizar o ícone do botão
    function updateToggleButton(theme) {
        const button = document.getElementById('dark-mode-toggle');
        if (button) {
            const icon = theme === 'light' 
                ? '<i class="bi bi-moon-stars-fill"></i>' 
                : '<i class="bi bi-sun-fill"></i>';
            const title = theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro';
            button.innerHTML = icon;
            button.setAttribute('title', title);
        }
    }
    
    // Listener para mudanças na preferência do sistema
    function watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Só aplica se não houver preferência salva
                if (!localStorage.getItem(STORAGE_KEY)) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    // Inicialização
    function init() {
        // Aplica tema inicial imediatamente (antes do DOM carregar)
        const initialTheme = getInitialTheme();
        document.documentElement.setAttribute('data-theme', initialTheme);
        
        // Função para tentar criar o botão (com retry)
        function tryCreateButton(attempts = 0) {
            const navbar = document.querySelector('.navbar-nav:last-child');
            if (navbar) {
                createToggleButton();
                updateToggleButton(initialTheme);
            } else if (attempts < MAX_BUTTON_CREATION_ATTEMPTS) {
                // Tenta novamente após 100ms
                setTimeout(() => tryCreateButton(attempts + 1), 100);
            }
        }
        
        // Quando o DOM estiver pronto, tenta criar o botão
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                tryCreateButton();
                watchSystemTheme();
            });
        } else {
            tryCreateButton();
            watchSystemTheme();
        }
    }
    
    // Executa inicialização
    init();
    
    // Expõe funções globalmente (opcional, para debug)
    window.darkMode = {
        toggle: toggleTheme,
        set: applyTheme,
        get: () => document.documentElement.getAttribute('data-theme')
    };
})();
