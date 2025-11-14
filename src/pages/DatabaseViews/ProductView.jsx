import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './DatabaseViews.module.css'

import Input from '../../components/Input/Input/Input'
import Button from '../../components/Button/Button'

import api from '../../services/axiosConfig'

function ProductView () {
    // VARIÁVEIS
    const navigate = useNavigate()
    const editFormRef = useRef(null)

    const redirectToForm = () => {
        editFormRef.current.scrollIntoView()
    }

    // STATES
    // Todos os Produtos
    const [products, setProducts] = useState([])
    // Campos do formulário para edição
    const [formVisibility, setFormVisibility] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        ncm: '',
        final_description: ''
    })

    // EFFECTS
    useEffect(() => {
        api.get('/product')
            .then(res => setProducts(res.data))
            .catch(err => console.error("Erro ao chamar produtos: ", err))
    }, [])

    useEffect(() => {
        if(editFormRef.current){
            redirectToForm()
        }
    }, [formData])
    
    // FUNCTIONS
    function handleEditProduct(product) {
        setFormData({
            id: product.id,
            ncm: product.ncm ?? '',
            final_description: product.final_description ?? '',
        })

        setFormVisibility(true)        
    }

    function handleEditCancel(){
        setFormData({
            id: '',
            ncm: '',
            final_description: ''
        })

        setFormVisibility(false)
    }

    function handleUpdateProduct(id) {
        api.put(`/product/${id}`, {
            ncm: formData.ncm,
            final_description: formData.final_description
        })
        .then(res => {
            console.log('Produto Atualizado: ', res.data)
            setProducts(prev => prev.map(p => p.id === id ? res.data : p))
        })
        .catch(err => console.error("Erro ao atualizar produto: ", err))

        setFormVisibility(false)
    }

    return (
        <>
            {/* HEADER */}
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

            {/* TABELA */}
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
                        {products
                            .sort((a, b) => a.id - b.id)
                            .map(p => (
                            <tr onClick={() => handleEditProduct(p)} key={p.id}>
                                <th scope="row">
                                    {p.id}
                                </th>
                                <td>
                                    {p.ncm ?? "---"}
                                </td>
                                <td>
                                    {p.final_description ?? "---"}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </section>

            {/* FORMULÁRIO */}
            {formVisibility && (
                <form className={`container-lg mt-4`} ref={editFormRef}>
                    <div className="col-3">
                        <Input label='NCM do produto' labelFont='label-medium' id='ncm' 
                            value={formData.ncm} 
                            onChange={
                                e => setFormData(prev => ({
                                    ...prev, 
                                    ncm: e.target.value
                                })) 
                            }
                        />
                    </div>

                    <Input label='Descrição Final' labelFont='label-medium' id='desc' type='textarea' 
                        value={formData.final_description} 
                        onChange={
                            e => setFormData(prev => ({
                                ...prev, 
                                final_description: e.target.value
                            })) 
                        }
                        />

                    <section className='d-flex mt-2'>
                        <Button color='gray' variant='outlined' fullWidth={true} size='small' onClick={() => handleEditCancel()}> 
                            Cancelar
                        </Button>
                        <Button color='royal' fullWidth={true} size='small' data-bs-toggle="modal" data-bs-target="#confirmModal"> 
                            Atualizar
                        </Button>
                    </section>

                </form>
            )}

            {/* MODAL DE CONFIRMAÇÃO */}
            <div className={`modal modal-md fade ${styles.confirmModal}`} id="confirmModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className={`modal-body p-4 ${styles.body}`}>
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
                                <Button variant='outlined' color='gray' size='small' fullWidth={true} data-bs-dismiss="modal" aria-label="Close"> 
                                    Cancelar 
                                </Button>
                                <Button color='green' size='small' fullWidth={true} onClick={() => handleUpdateProduct(formData.id) } data-bs-dismiss="modal" aria-label="Close">
                                    Salvar Edição
                                </Button>
                            </section>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductView