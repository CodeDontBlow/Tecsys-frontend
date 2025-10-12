import styles from './TableEdit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo , faFilePen } from '@fortawesome/free-solid-svg-icons';

function TableEdit() {

    return (
        <>
            <section className={styles.introText}>
                <p className={styles.text}>
                    Abaixo está a tabela gerada pelo sistema. Caso seja necessário editar algum dado da tabela, clique na linha correspondente.
                </p>
                <p className={styles.text}>
                    Quando estiver tudo pronto, clique em “Finalizar” para gerar e baixar o Excel com os dados abaixo.
                </p>
            </section>

            <div className={`table-responsive card p-0 m-0 rounded-3`}>
                <table className={`table rounded-3 m-0 overflow-hidden ${styles.table}`}>
                    <thead>
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
                        <tr data-bs-toggle="modal" data-bs-target="#formModal">
                            <th scope="row">1</th>
                            <td>20020067</td>
                            <td>0603 15PF 50V 5% C0G PN: MA0603CG</td>
                            <td>CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V, C0G P/N: MA0603CG150J500. (COD. 020020067)</td>
                            <td className={styles.ncm}>
                                8532.24.10 
                                <FontAwesomeIcon icon={faCircleInfo} className={styles.icon}/>
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
                                <FontAwesomeIcon icon={faCircleInfo} className={styles.icon}/>
                            </td>
                            <td>MERITEK ELECTRONICS CORPORATION</td>
                            <td>5160 RIVERGRADE RD, CA 91706</td>
                            <td>ESTADOS UNIDOS</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <section className={styles.buttonsContainer}>

            </section>


            {/* MODAL FORMULÁRIO */}
            <div className={`modal fade ${styles.formModal}`} id="formModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className={`modal-body ${styles.modalBody}`}>
                            <header className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>
                                    <FontAwesomeIcon icon={faFilePen} className={styles.icon} />
                                    Editar Informações
                                </h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </header>

                            <form action="">

                            </form>

                            <section className={styles.fomrButtons}>

                            </section>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default TableEdit;