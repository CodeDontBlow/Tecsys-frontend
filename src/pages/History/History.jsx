import styles from './History.module.css'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'

function History () {
    const navigate = useNavigate()

    return (
        <>
            <div className="container-md">
                <header className='d-flex justify-content-between'>
                    <h1 className={styles.title}>
                        Histórico de Extrações
                    </h1>

                    <button className={styles.returnBtn} onClick={() => {navigate(-1)}}>
                        Voltar
                    </button>
                </header>

                <p className={styles.introText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eos iusto commodi natus unde fuga ea dolore sunt id dolor.
                </p>
            </div>

            <div className="conatiner-lg">                
                
                <table className={`table rounded-3 m-0 ${styles.table}`}>
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                Extração Número XX
                            </th>

                            <th colSpan={2}>
                                Extraído em XX/XX/XXXX
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">SEQ</th>
                            {/* <th scope="col">Cod ERP</th> */}
                            <th scope="col">Descrição ERP</th>
                            <th scope="col">Descrição para DI</th>
                            <th scope="col">NCM</th>
                            <th scope="col">Fabricante</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Descrição País</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-bs-toggle="modal" data-bs-target="#formModal">
                            <th scope="row">1</th>
                            {/* <td>20020067</td> */}
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
                            {/* <td>20020067</td> */}
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
            </div>
        </>
    )
}

export default History