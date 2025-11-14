import styles from './DatabaseViews.module.css'
import { useNavigate } from 'react-router-dom'

function HistoryView () {
    const navigate = useNavigate()

    return (
        <>
            <div className="container-lg">
                <header className='d-flex justify-content-between'>
                    <h1 className={styles.title}>
                        Histórico de Extrações
                    </h1>

                    <button className={styles.returnBtn} onClick={() => {navigate(-1)}}>
                        Voltar
                    </button>
                </header>

                <p className={styles.introText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione iusto dignissimos ea, nostrum velit, modi soluta eum consectetur omnis maiores alias magni quo corrupti ex enim minima excepturi cupiditate nihil totam. Consequuntur, ipsum incidunt?
                </p>
            </div>

            <section className={`container-lg ${styles.ordersContainer}`}>
                {/* Tabela (representa 1 Order) */}
                <table className={`table rounded-3 m-0 ${styles.table}`}>
                    <thead>
                        {/* Informações do Order */}
                        <tr className={styles.orderRow}>
                            <th colSpan={6}>
                                Extração Número XX
                            </th>

                            <th colSpan={2}>
                                Extraído em XX/XX/XXXX
                            </th>
                        </tr>
                        {/* Informações dos Imports */}
                        <tr>
                            <th scope="col">SEQ</th>
                            <th scope="col">Cod ERP</th>
                            <th scope="col">Descrição ERP</th>
                            <th scope="col">Descrição para DI</th>
                            <th scope="col">NCM</th>
                            <th scope="col">Fabricante</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Descrição País</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Linha (representa 1 Import) */}
                        <tr data-bs-toggle="modal" data-bs-target="#formModal">
                            <th scope="row">1</th>
                            <td>20020067</td>
                            <td>0603 15PF 50V 5% C0G PN: MA0603CG</td>
                            <td>CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V, C0G P/N: MA0603CG150J500. (COD. 020020067)</td>
                            <td className={styles.ncm}>
                                8532.24.10
                            </td>
                            <td>MERITEK ELECTRONICS CORPORATION</td>
                            <td>5160 RIVERGRADE RD, CA 91706</td>
                            <td>ESTADOS UNIDOS</td>
                        </tr>
                        <tr data-bs-toggle="modal" data-bs-target="#formModal">
                            <th scope="row">2</th>
                            <td>20020067</td>
                            <td>0603 15PF 50V 5% C0G PN: MA0603CG</td>
                            <td>CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V, C0G P/N: MA0603CG150J500. (COD. 020020067)</td>
                            <td className={styles.ncm}>
                                8532.24.10
                            </td>
                            <td>MERITEK ELECTRONICS CORPORATION</td>
                            <td>5160 RIVERGRADE RD, CA 91706</td>
                            <td>ESTADOS UNIDOS</td>
                        </tr>
                    </tbody>
                </table>

            </section>
        </>
    )
}

export default HistoryView