import { useState } from 'react';

import styles from './TableEdit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo , faFilePen } from '@fortawesome/free-solid-svg-icons';

import StepMap from '../../components/StepMap/StepMap';
import Input from '../../components/Input/Input/Input'
import Dropdown from '../../components/Input/Dropdown/Dropdown'

function TableEdit() {
    const [formPN, setFormPN] = useState('MA0603CG150J500');
    const [formCodERP, setFormCodERP] = useState('20020067');
    const [formDescERP, setFormDescERP] = useState('0603 15PF 50V 5% C0G PN: MA0603CG');
    const [formDescDI, setFormDescDI] = useState('CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V, C0G P/N: MA0603CG150J500. (COD. 020020067)');
    // NCM
        const [formParentNCM, setFormParentNCM] = useState('8532.24');
        // Todos NCM's pai
        const [formParentNCMArray, setParentNCMArray] = useState([
            {
                valor: '8532.24',
                descricao: 'Descrição',
            },
            {
                valor: '8532.40',
                descricao: 'Descrição',
            },
            {
                valor: '8532.19',
                descricao: 'Descrição',
            }
        ]);
        const [formNCM, setFormNCM] = useState('8532.24.10');
        // Todos NCM's filho
        const [formNCMArray, setFormNCMArray] = useState([
            [
                {
                    valor: '8532.24.10',
                    descricao: 'Descrição',
                },
                {
                    valor: '8532.24.70',
                    descricao: 'Descrição',
                },
                {
                    valor: '8532.24.20',
                    descricao: 'Descrição',
                },
            ],
            [
                {
                    valor: '8532.40.10',
                    descricao: 'Descrição',
                },
                {
                    valor: '8532.40.70',
                    descricao: 'Descrição',
                },
                {
                    valor: '8532.40.20',
                    descricao: 'Descrição',
                },
            ],
            [
                {
                    valor: '8532.19.10',
                    descricao: 'Descrição',
                },
                {
                    valor: '8532.19.70',
                    descricao: 'Descrição',
                },
                {
                    valor: '8532.19.20',
                    descricao: 'Descrição',
                },
            ],
            
        ]);
    const [formFabNome, setFormFabNome] = useState('MERITEK ELECTRONICS CORPORATION');
    const [formFabEndereco, setFormFabEndereco] = useState('5160 RIVERGRADE RD, CA 91706');
    const [formFabDesc, setFormFabDesc] = useState('ESTADOS UNIDOS');


    return (
        <div className='px-lg-5 px-md-3'>

            <StepMap currentStep={3} />

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
            <div className={`modal modal-lg fade ${styles.formModal}`} id="formModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                            {/* FORMULÁRIO */}
                            <form action="">
                                <section className={styles.duoSection}>
                                    <Input label='Part Number' id='PN' value={formPN} onChange={e => setFormPN(e.target.value)} />
                                    <Input label='Código ERP' id='CodERP' value={formCodERP} onChange={e => setFormCodERP(e.target.value)} />
                                </section>
                                
                                <Input label='Descrição ERP' id='DescERP' value={formDescERP} onChange={e => setFormDescERP(e.target.value)} />
                                <Input label='Descrição para DI' id='DescDI' type='textarea' value={formDescDI} onChange={e => setFormDescDI(e.target.value)} />

                                <section className={styles.duoSection}>
                                    <Dropdown label='NCM Pai' options={formParentNCMArray} onChange={value => setFormParentNCM(value)}/>
                                    <Dropdown label='NCM do Produto' options={formNCMArray[formParentNCMArray.findIndex(o => o.valor === formParentNCM)]} onChange={value => setFormNCM(value)} />
                                </section>

                                <Input label='Fabricante' placeholder='Nome do Fabricante' id='fabNome' value={formFabNome} onChange={e => setFormFabNome(e.target.value)} />
                                <section className={styles.duoSection}>
                                    <Input label='Endereço do Fabricante' id='fabEndereco' value={formFabEndereco} onChange={e => setFormFabEndereco(e.target.value)} />
                                    <Input label='Descrição do País' placeholder='País do Fabricante' id='fabDesc' value={formFabDesc} onChange={e => setFormFabDesc(e.target.value)} />
                                </section>
                            </form>


                            <section className={styles.formButtons}>

                            </section>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableEdit;