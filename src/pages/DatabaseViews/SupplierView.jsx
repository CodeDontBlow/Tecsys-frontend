import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './DatabaseViews.module.css'

import Input from '../../components/Input/Input/Input'
import Button from '../../components/Button/Button'

import api from '../../services/axiosConfig'

function SupplierView () {
    // VARIÁVEIS
    const navigate = useNavigate()
    const editFormRef = useRef(null)

    const redirectToForm = () => {
        editFormRef.current.scrollIntoView()
    }

    // STATES
    const [supplierProducts, setSupplierProducts] = useState([])
    const [suppliers, setSuppliers] = useState([{id: 1, name:'Fornecedor'}])
    const [formVisibility, setFormVisibility] = useState(false)
    const [formData, setFormData] = useState({
        supplierId: '',
        supplierName: '',
        products: []
    })

    // EFFECTS
    useEffect(() => {
        api.get('/supplierproduct')
            .then(res => setSupplierProducts(res.data))
            .catch(err => console.error("Erro ao chamar supplierproduct: ", err))
    }, [])

    useEffect(() => {
        if(editFormRef.current){
            redirectToForm()
        }
    }, [formVisibility])

    useEffect(() => {
        const suppliersList = Array.from(
            new Map (
                supplierProducts.map(sp => [sp.supplier.id, sp.supplier])
            ).values()
        )

        setSuppliers(suppliersList)
    }, [supplierProducts])
    
    // FUNCTIONS
    function handleEditSupplier(s) {
        setFormData({
            supplierId: s.id,
            supplierName: s.name,
            products: handleProductOfSupplier(s.id)
        })

        console.log(formData)

        setFormVisibility(true)
    }

    function handleEditCancel(){
        setFormData({
            supplierId: s.id,
            supplierName: '',
            products: [{
                relationId: '',
                erp_description: '',
                product_id: '',
                ncm: '',
                final_description: ''
            }]
        })

        setFormVisibility(false)
    }

    async function handleUpdate(id) {
        try{
            // Atualiza fornecedor
            await api.put(`/supplier/${id}`, {
                name: formData.supplierName
            })

            // Atualiza todos supplierProducts do fornecedor
            const spRequests = formData.products.map(p =>
                api.put(`/supplierproduct/${p.relationId}`, {
                    erp_description: prod.erp_description
                })
            )

            await Promise.all(spRequests)
                
            const res = await api.get("/supplierproduct");
            setSupplierProducts(res.data);
            
            setFormVisibility(false)

        }
        catch(err){
            console.error("Erro ao atualizar fornecedor: ", err)
        }

    }

    function handleProductOfSupplier(id){
        const productsList = supplierProducts
            .filter(sp => sp.supplier.id === id)
            .map(sp => ({
                relationId: sp.id,
                erp_description: sp.erp_description,
                product_id: sp.product.id,
                ncm: sp.product.ncm,
                final_description: sp.product.final_description
            }))

        return productsList
    }

    return (
        <>
            {/* HEADER */}
            <div className="container-lg">
                <header className='d-flex justify-content-between'>
                    <h1 className={styles.title}>
                        Fornecedores
                    </h1>

                    <button className={styles.returnBtn} onClick={() => {navigate(-1)}}>
                        Voltar
                    </button>
                </header>

                <p className={styles.introText}>
                    Nesta página você encontra todos os fornecedores cadastrados pelo nosso processo.
                    Clique em qualquer linha da tabela abaixo para visualizar e editar informações do fornecedor, incluindo nome e as descrições ERP dos produtos associados.
                    As alterações realizadas aqui serão aplicadas imediatamente e poderão impactar futuras análises e extrações relacionadas a este fornecedor e seus produtos.
                </p>
            </div>

            {/* TABELA */}
            <section className={`container-lg ${styles.ordersContainer}`}>
                <table className={`table rounded-3 m-0 ${styles.table}`}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome do Fornecedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers
                            .sort((a, b) => a.id - b.id)
                            .map(s => (
                            <tr onClick={() => handleEditSupplier(s)} key={s.id}>
                                <th scope="row">
                                    {s.id}
                                </th>
                                <td>
                                    {s.name ?? "---"}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </section>

            {/* FORMULÁRIO */}
            {formVisibility && (
                <form className={`container-lg mt-4`} ref={editFormRef}>
                    <Input label='Nome do Fornecedor' labelFont='label-medium' id='nome' 
                        value={formData.supplierName} 
                        onChange={
                            e => setFormData(prev => ({
                                ...prev, 
                                supplierName: e.target.value
                            })) 
                        }
                    />
                    
                    {/* PRODUTOS do fornecedor */}
                    {formData.products.length > 0 && (
                        <section className={`${styles.multiInputSection}`}>
                            <h5 className={styles.title}>
                                Produtos de {formData.supplierName}
                            </h5>

                            <section className={styles.productsContainer}>
                                
                            {formData.products.map((p, i) => (
                                <div className={styles.product}>
                                    {/* Informações do Produto */}
                                    <div className={`row ${styles.disabledInputs}`}>
                                        <div className='col-2'>
                                            <h6 className={styles.label}> NCM </h6>
                                            <p>{p.ncm}</p>
                                        </div>
                                        <div className="col">
                                            <h6 className={styles.label}> Descrição Final </h6>
                                            <p>{p.final_description}</p>
                                        </div>
                                    </div>

                                    {/* Descrição ERP */}
                                    <Input label='Descrição ERP' labelFont='label-medium' id={`erp-${i}`} 
                                        value={formData.products[i].erp_description}
                                        onChange={
                                            e => setFormData(prev => {
                                                let currentProduct = [...prev.products]
                                                currentProduct[i] = {
                                                    ...prev.products[i],
                                                    erp_description: e.target.value,
                                                }

                                                return {
                                                    ...prev, 
                                                    products: currentProduct
                                                }
                                            }) 
                                        }
                                    />
                                    
                                </div>
                            ))}

                            </section>
                        </section>
                    )}

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
                            <p className={styles.mainText}> Você tem certeza que deseja atualizar este fabricante?</p>
                            <p className={styles.text}> Note que isso pode alterar o resultado de futuras extrações deste mesmo fabricante. </p>

                            <section className={styles.btn}>
                                <Button variant='outlined' color='gray' size='small' fullWidth={true} data-bs-dismiss="modal" aria-label="Close"> 
                                    Cancelar 
                                </Button>
                                <Button color='green' size='small' fullWidth={true} onClick={() => handleUpdate(formData.supplierId) } data-bs-dismiss="modal" aria-label="Close">
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

export default SupplierView