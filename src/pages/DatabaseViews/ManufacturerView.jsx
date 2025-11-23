import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './DatabaseViews.module.css'

import Input from '../../components/Input/Input/Input'
import Button from '../../components/Button/Button'

import api from '../../services/axiosConfig'

function ManufacturerView () {
    // VARIÁVEIS
    const navigate = useNavigate()
    const editFormRef = useRef(null)

    const redirectToForm = () => {
        editFormRef.current.scrollIntoView()
    }

    // STATES
    const [manufacturers, setManufacturers] = useState([])
    const [formVisibility, setFormVisibility] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        origin_country: '',
    })

    // EFFECTS
    useEffect(() => {
        api.get('/manufacturer')
            .then(res => setManufacturers(res.data))
            .catch(err => console.error("Erro ao chamar fabricantes: ", err))
    }, [])

    useEffect(() => {
        if(editFormRef.current){
            redirectToForm()
        }
    }, [formData])
    
    // FUNCTIONS
    function handleEditManufacturer(m) {
        setFormData({
            id: m.id,
            name: m.name,
            address: m.address,
            origin_country: m.origin_country,
        })

        setFormVisibility(true)        
    }

    function handleEditCancel(){
        setFormData({
            id: '',
            name: '',
            address: '',
            origin_country: '',
        })

        setFormVisibility(false)
    }

    function handleUpdateManufacturer(id) {
        api.put(`/manufacturer/${id}`, {
            name: formData.name,
            origin_country: formData.origin_country,
            address: formData.address,
        })
        .then(res => {
            console.log('Fabricante Atualizado: ', res.data)
            setManufacturers(prev => prev.map(p => p.id === id ? res.data : p))
        })
        .catch(err => console.error("Erro ao atualizar fabricante: ", err))

        setFormVisibility(false)
    }

    return (
        <>
            {/* HEADER */}
            <div className="container-lg">
                <header className='d-flex justify-content-between'>
                    <h1 className={styles.title}>
                        Fabricantes
                    </h1>

                    <button className={styles.returnBtn} onClick={() => {navigate(-1)}}>
                        Voltar
                    </button>
                </header>

                <p className={styles.introText}>
                    Nesta página você encontra todos os fabricantes cadastrados em nossa base. Clique em qualquer linha da tabela abaixo para editar informações como nome, endereço e país de origem do fabricante.
                </p>
            </div>

            {/* TABELA */}
            <section className={`container-lg ${styles.ordersContainer}`}>
                <table className={`table rounded-3 m-0 ${styles.table}`}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome do Fabricante</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">País de Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers
                            .sort((a, b) => a.id - b.id)
                            .map(m => (
                            <tr onClick={() => handleEditManufacturer(m)} key={m.id}>
                                <th scope="row">
                                    {m.id}
                                </th>
                                <td>
                                    {m.name ?? "---"}
                                </td>
                                <td>
                                    {m.address ?? "---"}
                                </td>
                                <td>
                                    {m.origin_country ?? "---"}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </section>

            {/* FORMULÁRIO */}
            {formVisibility && (
                <form className={`container-lg mt-4`} ref={editFormRef}>
                        <Input label='Nome do Fabricante' labelFont='label-medium' id='nome' 
                            value={formData.name} 
                            onChange={
                                e => setFormData(prev => ({
                                    ...prev, 
                                    name: e.target.value
                                })) 
                            }
                        />
                    <div className="col">
                        <Input label='Endereço' labelFont='label-medium' id='address' 
                            value={formData.address} 
                            onChange={
                                e => setFormData(prev => ({
                                    ...prev, 
                                address: e.target.value
                                })) 
                            }
                        />

                        <Input label='País de Origem' labelFont='label-medium' id='country' 
                            value={formData.origin_country} 
                            onChange={
                                e => setFormData(prev => ({
                                    ...prev, 
                                origin_country: e.target.value
                                })) 
                            }
                        />

                    </div>

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
                                <Button color='green' size='small' fullWidth={true} onClick={() => handleUpdateManufacturer(formData.id) } data-bs-dismiss="modal" aria-label="Close">
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

export default ManufacturerView