import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './DatabaseViews.module.css'

import Input from '../../components/Input/Input/Input'
import Button from '../../components/Button/Button'

import api from '../../services/axiosConfig'

function ProductView () {
    const navigate = useNavigate()

    // Todos os Produtos
    const [products, setProducts] = useState([])

    // Campos do formulário para edição
    const [formVisibility, setFormVisibility] = useState(false)
    const [formId, setFormId] = useState()
    const [formNcm, setFormNcm] = useState('8532.24.10')
    const [formDescricao, setFormDescricao] = useState('CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V')

    function showForm(
        // product
    ){
        // setFormId(product.id)
        // setFormNcm(product.ncm)
        // setFormDescricao(product.descricao)

        setFormVisibility(true)
    }

    useEffect(() => {
        api.get('api/v1/product')
            .then(res => setProducts(res.data))
            .cathc(err => console.err("Erro ao chamar dados", err))
    }, [])

    return (
        <>
            <div className="container-lg">
                <header className='d-flex justify-content-between'>
                    <h1 className={styles.title}>
                        Produtos
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
                <table className={`table rounded-3 m-0 ${styles.table}`}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NCM</th>
                            <th scope="col">Descrição Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Linhas (representam 1 Produto) */}
                        {products.map((p, index) => (
                            <tr onClick={() => showForm(p)} key={index}>
                                <th scope="row">1</th>
                                <td>8532.24.10</td>
                                <td>CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V</td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </section>

            {/* FORMULÁRIO */}
            {formVisibility && (
                <form className={`container-lg mt-5`}>
                    <div className="col-3">
                        <Input label='NCM do produto' labelFont='label-medium' id='ncm' value={formNcm} onChange={e => setFormNcm(e.target.value) }/>
                    </div>

                    <Input label='Descrição Final' labelFont='label-medium' id='desc' type='textarea' value={formDescricao} onChange={e => setFormDescricao(e.target.value) }/>

                    <section className='d-flex mt-2'>
                        <Button children='Cancelar' color='gray' variant='outlined' fullWidth={true} size='small' onClick={() => setFormVisibility(false)}/>
                        <Button children='Atualizar' color='royal' fullWidth={true} size='small' data-bs-toggle="modal" data-bs-target="#confirmModal"/>
                    </section>

                </form>
            )}



            {/* MODAL DE CONFIRMAÇÃO */}
            <div className={`modal modal-md fade ${styles.confirmModal}`} id="confirmModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className={`modal-body ${styles.body}`}>
                            <header className={styles.header}>
                                <div className={styles.headerText}>
                                    <i className={`bi bi-question-diamond-fill ${styles.icon}`}></i>
                                    <h3 className={styles.title}>
                                        Confirmar Alteração
                                    </h3>
                                </div>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </header>

                            {/* CORPO */}
                            <p className={styles.mainText}> Você tem certeza que deseja atualizar este produto?</p>
                            <p className={styles.text}> Note que isso pode alterar o resultado de futuras extrações deste mesmo produto. </p>

                            <section className={styles.btn}>
                                <Button children='Cancelar' variant='outlined' color='red' size='small' fullWidth={true} data-bs-dismiss="modal" aria-label="Close"/>
                                <Button children='Salvar Edição' color='green' size='small' fullWidth={true} onClick={() => setFormVisibility(false)} data-bs-dismiss="modal" aria-label="Close"/>
                            </section>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductView