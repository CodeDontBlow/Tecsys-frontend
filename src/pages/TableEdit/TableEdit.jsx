import { useState, useEffect } from 'react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

import styles from './TableEdit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFilePen } from '@fortawesome/free-solid-svg-icons';

import StepMap from '../../components/StepMap/StepMap';
import Input from '../../components/Input/Input/Input'
import Dropdown from '../../components/Input/Dropdown/Dropdown'
import Button from '../../components/Button/Button';
import Tooltip from '../../components/Tooltip/Tooltip';

function TableEdit() {
    const location = useLocation();

    // ESTADOS PARA O FORMULÁRIO -----------------------------------
    const [formPN, setFormPN] = useState('MA0603CG150J500');
    const [formCodERP, setFormCodERP] = useState('20020067');
    const [formDescERP, setFormDescERP] = useState('0603 15PF 50V 5% C0G PN: MA0603CG');
    const [formDescDI, setFormDescDI] = useState('CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V, C0G P/N: MA0603CG150J500. (COD. 020020067)');
    // NCM ------------------------------
    // Todos NCM's pai
    const [formParentNCMArray, setParentNCMArray] = useState([]);
    // NCM Pai Atual (primeiro do array formParentNCMArray)
    const [formParentNCM, setFormParentNCM] = useState(formParentNCMArray[0]);
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
    // NCM Filho Atual (primeiro do array formNCMArray)
    const [formNCM, setFormNCM] = useState(formNCMArray[0]);
    const [formFabNome, setFormFabNome] = useState('MERITEK ELECTRONICS CORPORATION');
    const [formFabEndereco, setFormFabEndereco] = useState('5160 RIVERGRADE RD, CA 91706');
    const [formFabDesc, setFormFabDesc] = useState('ESTADOS UNIDOS');

    const [orderData, setOrderData] = useState()
    const [orderNcms, setOrderNcms] = useState() //NCMs virão aqui

    useEffect(() => {
        api.get('/imports/')
            .then(res => setOrderData(res.data))
            .catch(err => console.err("Erro ao chamar dados", err))
    }, [])

    useEffect(() => {
        if (!location.state.data) return;

        const data = location.state.data || [];

        // 1 — transforma a lista inteira
        const transformed = data.map(item => {
            const ncms = item.ncms || [];
            return ncms.map(ncm => ({
                valor: ncm.ncm_6,
                descricao: ncm.description,
                filhos: (ncm.ncm_8 ?? []).map(f => ({
                    valor: f.ncm_code,
                    descricao: f.description
                }))
            }));
        });

        // 2 — duplica essa lista transformada para cada item
        const final = data.map(() => ({
            item: transformed
        }));
        console.log('result', transformed)


        setOrderNcms(transformed)

    }, [location])

    function setInfoToModal(i) {
        const d = orderData[i];

        // --- Preenche dados gerais ---
        setFormPN(d.product_part_number);
        setFormCodERP(d.supplier_product.product.erp_code);
        setFormDescERP(d.supplier_product.erp_description);
        setFormDescDI(d.supplier_product.product.final_description);
        setFormFabNome(d.manufacturer.name);

        const ncms = location.state.data?.[i]?.ncms || [];

        const result = ncms.map(ncm => ({
            valor: ncm.ncm_6,
            descricao: ncm.description,
            filhos: (ncm.ncm_8 ?? []).map(f => ({
                valor: f.ncm_code,
                descricao: f.description
            }))
        }));
        setParentNCMArray(result);

        const firstParent = result[0] || null;
        setFormParentNCM(firstParent);

        const firstChildren = firstParent?.filhos || [];
        setFormNCM(firstChildren);
    }

    return (
        <div className='container-lg'>

            <StepMap currentStep={3} />

            <section className={styles.introText}>
                <p className={styles.text}>
                    Abaixo está a tabela gerada pelo sistema. Caso seja necessário editar algum dado da tabela, clique na linha correspondente.
                </p>
                <p className={styles.text}>
                    Quando estiver tudo pronto, clique em “Finalizar” para gerar e baixar o Excel com os dados abaixo.
                </p>
            </section>

            <table className={`table rounded-3 m-0 ${styles.table}`}>
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

                    {orderData && (
                        orderData.map((d, index) => (
                            <tr data-bs-toggle="modal" data-bs-target="#formModal" key={index + 1} onClick={() => setInfoToModal(index)}>
                                <th scope="row"> {index + 1} </th>
                                <td>
                                    {d.supplier_product.product.erp_code}
                                </td>
                                <td>
                                    {d.supplier_product.erp_description}
                                </td>
                                <td> {`
                                        ${d.supplier_product.product.final_description}.
                                        P/N: ${d.product_part_number}.
                                    `} </td>
                                <td className={styles.ncm}>
                                    {orderNcms && (
                                        <Tooltip content={
                                            <div>
                                                <strong>
                                                    { orderNcms[index][0].valor }
                                                </strong>
                                                <span>
                                                    { orderNcms[index][0].descricao }
                                                </span>

                                                <br />
                                                <br />

                                                <strong>
                                                    { orderNcms[index][0].filhos[0].valor }
                                                </strong> 
                                                <span> 
                                                    { orderNcms[index][0].filhos[0].descricao }
                                                </span>
                                            </div>
                                        } position='right'>
                                            { orderNcms[index][0].filhos[0].valor}
                                            <FontAwesomeIcon icon={faCircleInfo} className={styles.icon} />
                                        </Tooltip>
                                    )}
                                </td>
                                <td> {d.manufacturer.name} </td>
                                <td>5160 RIVERGRADE RD, CA 91706</td>
                                <td>ESTADOS UNIDOS</td>
                            </tr>
                        ))
                    )}


                </tbody>
            </table>

            <section className={styles.buttonsContainer}>
                <Button children='Cancelar' variant='outlined' color='gray' fullWidth={true} />
                <Button children='Finalizar' fullWidth={true} />
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
                                    <Dropdown label='NCM Pai' options={formParentNCMArray} dataType='object' onChange={value => setFormParentNCM(value)} />
                                    <Dropdown
                                        label='NCM do Produto'
                                        options={formParentNCM?.filhos || []}
                                        dataType='object'
                                        onChange={value => setFormNCM(value)}
                                    />
                                </section>

                                <Input label='Fabricante' placeholder='Nome do Fabricante' id='fabNome' value={formFabNome} onChange={e => setFormFabNome(e.target.value)} />
                                <section className={styles.duoSection}>
                                    <Input label='Endereço do Fabricante' id='fabEndereco' value={formFabEndereco} onChange={e => setFormFabEndereco(e.target.value)} />
                                    <Input label='Descrição do País' placeholder='País do Fabricante' id='fabDesc' value={formFabDesc} onChange={e => setFormFabDesc(e.target.value)} />
                                </section>
                            </form>


                            <section className={styles.formButtons}>
                                <Button children='Cancelar Edição' variant='outlined' color='gray' size='small' fullWidth={true} />
                                <Button children='Salvar Edição' size='small' fullWidth={true} />
                            </section>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableEdit;