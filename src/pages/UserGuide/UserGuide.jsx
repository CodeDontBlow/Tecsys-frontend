import { useState, useEffect } from 'react'
import styles from './UserGuide.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFileUpload, 
    faGears, 
    faEdit, 
    faDatabase, 
    faChevronRight,
    faFileArrowDown,
    faLightbulb
} from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

function UserGuide() {
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState('overview')

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'upload', 'process', 'edit', 'database']
            const scrollPosition = window.scrollY + 150

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetBottom = offsetTop + element.offsetHeight

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const sections = [
        { id: 'overview', label: 'Visão Geral', icon: faLightbulb },
        { id: 'upload', label: 'Carregar Pedido', icon: faFileUpload },
        { id: 'process', label: 'Processar Pedido', icon: faGears },
        { id: 'edit', label: 'Editar Resultados', icon: faEdit },
        { id: 'database', label: 'Banco de Dados', icon: faDatabase },
    ]

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId)
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className={styles.container}>
            {/* Sidebar de Navegação */}
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Guia do Usuário</h2>
                <nav className={styles.nav}>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ''}`}
                            onClick={() => scrollToSection(section.id)}
                            aria-label={`Navegar para ${section.label}`}
                            aria-current={activeSection === section.id ? 'true' : 'false'}
                        >
                            <FontAwesomeIcon icon={section.icon} className={styles.navIcon} aria-hidden="true" />
                            <span>{section.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Conteúdo Principal */}
            <main className={styles.content}>
                {/* Visão Geral */}
                <section id="overview" className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faLightbulb} className={styles.sectionIcon} />
                        <h1 className={styles.sectionTitle}>Bem-vindo ao Descriptum</h1>
                    </div>
                    
                    <p className={styles.description}>
                        O <strong>Descriptum</strong> é uma solução completa para automatizar o processo de registro aduaneiro, 
                        transformando pedidos de compra em informações organizadas e prontas para análise.
                    </p>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <FontAwesomeIcon icon={faFileUpload} className={styles.featureIcon} />
                            <h3>Envio Rápido</h3>
                            <p>Carregue seus pedidos em PDF de forma simples e rápida</p>
                        </div>
                        <div className={styles.featureCard}>
                            <FontAwesomeIcon icon={faGears} className={styles.featureIcon} />
                            <h3>Processamento Automático</h3>
                            <p>O sistema identifica automaticamente produtos, fabricantes e fornecedores</p>
                        </div>
                        <div className={styles.featureCard}>
                            <FontAwesomeIcon icon={faDatabase} className={styles.featureIcon} />
                            <h3>Associação de NCM</h3>
                            <p>Produtos são associados aos principais NCM's correspondentes</p>
                        </div>
                        <div className={styles.featureCard}>
                            <FontAwesomeIcon icon={faEdit} className={styles.featureIcon} />
                            <h3>Revisão Facilitada</h3>
                            <p>Revise e ajuste detalhes conforme necessário antes de finalizar</p>
                        </div>
                    </div>

                    <div className={styles.workflow}>
                        <h2>Fluxo de Trabalho</h2>
                        <div className={styles.workflowSteps}>
                            <div className={styles.workflowStep}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h4>Carregar Pedido</h4>
                                    <p>Faça upload do PDF do pedido de compra</p>
                                </div>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className={styles.stepArrow} />
                            <div className={styles.workflowStep}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h4>Processar Pedido</h4>
                                    <p>Acompanhe a extração automática dos dados</p>
                                </div>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className={styles.stepArrow} />
                            <div className={styles.workflowStep}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h4>Editar Resultados</h4>
                                    <p>Revise e ajuste as informações geradas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Carregar Pedido */}
                <section id="upload" className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faFileUpload} className={styles.sectionIcon} />
                        <h1 className={styles.sectionTitle}>Passo 1: Carregar Pedido</h1>
                    </div>

                    <p className={styles.description}>
                        Nesta etapa, você fará o upload do arquivo PDF contendo o pedido de compra que deseja processar.
                    </p>

                    <div className={styles.instructionBox}>
                        <h3>Como fazer:</h3>
                        <ol className={styles.instructionList}>
                            <li>
                                <span>Clique no botão <strong>"Começar a Extrair"</strong> na página inicial ou acesse diretamente a página de upload</span>
                            </li>
                            <li>
                                <span>Arraste e solte o arquivo PDF do pedido na área indicada ou clique para selecionar</span>
                            </li>
                            <li>
                                <span>Aguarde o upload ser concluído - você verá uma confirmação visual</span>
                            </li>
                        </ol>
                    </div>

                    <div className={styles.tipBox}>
                        <FontAwesomeIcon icon={faLightbulb} className={styles.tipIcon} />
                        <div>
                            <h4>Dicas importantes:</h4>
                            <ul>
                                <li>Certifique-se de que o arquivo está em formato PDF</li>
                                <li>O arquivo deve conter informações legíveis do pedido de compra</li>
                                <li>Verifique se o PDF não está protegido por senha</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Processar Pedido */}
                <section id="process" className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faGears} className={styles.sectionIcon} />
                        <h1 className={styles.sectionTitle}>Passo 2: Processar Pedido</h1>
                    </div>

                    <p className={styles.description}>
                        Após o upload, o sistema iniciará automaticamente o processamento do pedido. 
                        Nesta fase, o Descriptum extrai e organiza todas as informações relevantes.
                    </p>

                    <div className={styles.instructionBox}>
                        <h3>O que acontece nesta etapa:</h3>
                        <ol className={styles.instructionList}>
                            <li>
                                <span><strong>Extração de Dados:</strong> O sistema lê o PDF e identifica produtos, códigos e quantidades</span>
                            </li>
                            <li>
                                <span><strong>Identificação Automática:</strong> Cada produto é analisado e associado a informações de fabricante e fornecedor</span>
                            </li>
                            <li>
                                <span><strong>Associação de NCM:</strong> O sistema sugere os códigos NCM mais adequados para cada produto</span>
                            </li>
                            <li>
                                <span><strong>Geração de Descrições:</strong> Descrições completas são criadas automaticamente para declaração aduaneira</span>
                            </li>
                        </ol>
                    </div>

                    <div className={styles.progressInfo}>
                        <h3>Acompanhamento em Tempo Real</h3>
                        <p>
                            Durante o processamento, você verá uma lista de verificação (checklist) indicando 
                            o progresso de cada etapa. Aguarde até que todas as etapas sejam concluídas antes de prosseguir.
                        </p>
                    </div>

                    <div className={styles.tipBox}>
                        <FontAwesomeIcon icon={faLightbulb} className={styles.tipIcon} />
                        <div>
                            <h4>Importante:</h4>
                            <ul>
                                <li>Não feche a página durante o processamento</li>
                                <li>O tempo de processamento varia de acordo com o tamanho do pedido</li>
                                <li>Você será automaticamente direcionado para a próxima etapa quando concluído</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Editar Resultados */}
                <section id="edit" className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faEdit} className={styles.sectionIcon} />
                        <h1 className={styles.sectionTitle}>Passo 3: Editar Resultados</h1>
                    </div>

                    <p className={styles.description}>
                        Após o processamento, você terá acesso à tabela com todos os dados extraídos e poderá 
                        revisar e editar qualquer informação antes de finalizar.
                    </p>

                    <div className={styles.instructionBox}>
                        <h3>Como revisar e editar:</h3>
                        <ol className={styles.instructionList}>
                            <li>
                                <span><strong>Visualizar a Tabela:</strong> Todos os produtos extraídos serão exibidos em formato de tabela</span>
                            </li>
                            <li>
                                <span><strong>Editar um Item:</strong> Clique na linha do produto que deseja editar</span>
                            </li>
                            <li>
                                <span><strong>Modificar Campos:</strong> Um formulário será aberto com todos os campos editáveis:
                                    <ul className={styles.subList}>
                                        <li>Part Number (PN)</li>
                                        <li>Código ERP</li>
                                        <li>Descrição ERP</li>
                                        <li>Descrição para DI (Declaração de Importação)</li>
                                        <li>NCM (Nomenclatura Comum do Mercosul)</li>
                                        <li>Dados do Fabricante (Nome, Endereço, País)</li>
                                    </ul>
                                </span>
                            </li>
                            <li>
                                <span><strong>Salvar Alterações:</strong> Clique em "Salvar" para confirmar as modificações</span>
                            </li>
                            <li>
                                <span><strong>Finalizar:</strong> Quando estiver satisfeito com todas as informações, clique em "Finalizar" para gerar o Excel</span>
                            </li>
                        </ol>
                    </div>

                    <div className={styles.featureHighlight}>
                        <FontAwesomeIcon icon={faFileArrowDown} className={styles.highlightIcon} />
                        <div>
                            <h3>Exportação de Dados</h3>
                            <p>
                                Ao finalizar, o sistema gera automaticamente um arquivo Excel contendo todos os dados 
                                organizados e prontos para uso no processo de registro aduaneiro.
                            </p>
                        </div>
                    </div>

                    <div className={styles.tipBox}>
                        <FontAwesomeIcon icon={faLightbulb} className={styles.tipIcon} />
                        <div>
                            <h4>Dicas para edição:</h4>
                            <ul>
                                <li>Revise especialmente as descrições para DI, garantindo que estejam completas e corretas</li>
                                <li>Verifique se os códigos NCM sugeridos estão adequados ao produto</li>
                                <li>Confirme os dados de fabricante e fornecedor para evitar problemas na documentação</li>
                                <li>Você pode editar quantas linhas forem necessárias antes de finalizar</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Banco de Dados */}
                <section id="database" className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faDatabase} className={styles.sectionIcon} />
                        <h1 className={styles.sectionTitle}>Banco de Dados</h1>
                    </div>

                    <p className={styles.description}>
                        O Descriptum mantém um banco de dados completo com informações de produtos, fornecedores e 
                        fabricantes, além do histórico de todas as extrações realizadas.
                    </p>

                    <div className={styles.databaseGrid}>
                        <div className={styles.databaseCard}>
                            <FontAwesomeIcon icon={faFileUpload} className={styles.databaseIcon} />
                            <h3>Histórico de Extrações</h3>
                            <p>Acesse o registro completo de todos os pedidos processados, com data, status e informações detalhadas de cada extração realizada.</p>
                        </div>

                        <div className={styles.databaseCard}>
                            <FontAwesomeIcon icon={faDatabase} className={styles.databaseIcon} />
                            <h3>Produtos</h3>
                            <p>Explore o catálogo completo de produtos já processados. Visualize e atualize informações como códigos, descrições e especificações técnicas.</p>
                        </div>

                        <div className={styles.databaseCard}>
                            <FontAwesomeIcon icon={faDatabase} className={styles.databaseIcon} />
                            <h3>Fornecedores</h3>
                            <p>Gerencie o cadastro de fornecedores, incluindo razão social, endereço, país de origem e outras informações relevantes para o processo aduaneiro.</p>
                        </div>

                        <div className={styles.databaseCard}>
                            <FontAwesomeIcon icon={faDatabase} className={styles.databaseIcon} />
                            <h3>Fabricantes</h3>
                            <p>Mantenha atualizado o cadastro de fabricantes com nome, endereço completo, país de fabricação e demais dados necessários para documentação.</p>
                        </div>
                    </div>

                    <div className={styles.instructionBox}>
                        <h3>Como utilizar o Banco de Dados:</h3>
                        <ol className={styles.instructionList}>
                            <li>
                                <span>Acesse o menu "Banco de Dados" na navegação principal</span>
                            </li>
                            <li>
                                <span>Selecione a categoria que deseja consultar ou editar</span>
                            </li>
                            <li>
                                <span>Use os filtros e busca para encontrar registros específicos</span>
                            </li>
                            <li>
                                <span>Clique em qualquer registro para visualizar detalhes ou editar informações</span>
                            </li>
                        </ol>
                    </div>

                    <div className={styles.tipBox}>
                        <FontAwesomeIcon icon={faLightbulb} className={styles.tipIcon} />
                        <div>
                            <h4>Benefícios do Banco de Dados:</h4>
                            <ul>
                                <li>Reutilização de informações em futuras extrações</li>
                                <li>Melhoria contínua da precisão dos dados</li>
                                <li>Histórico completo para auditoria e rastreabilidade</li>
                                <li>Facilita a padronização de descrições e classificações</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className={styles.ctaSection}>
                    <h2>Pronto para começar?</h2>
                    <p>Inicie agora o processo de extração e aproveite todos os recursos do Descriptum!</p>
                    <Button 
                        variant="filled" 
                        color="royal" 
                        size="large"
                        icon={faChevronRight}
                        iconPosition="right"
                        onClick={() => navigate('/input-files')}
                    >
                        Começar a Extrair
                    </Button>
                </section>
            </main>
        </div>
    )
}

export default UserGuide
