import { useEffect, useState } from 'react'
import styles from './DatabaseViews.module.css'
import { useNavigate } from 'react-router-dom'

function HistoryView () {
    const navigate = useNavigate()

   const [imports, setImports] = useState([{}])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        api.get('/imports')
            .then(res => setImports(res.data))
            .catch(err => console.error("Erro ao chamar orders: ", err))
    }, [])

    useEffect(() => {
        const ordersList = Array.from(
            new Map(
                imports.map(i => [i.order.id, {
                    id: i.order.id,
                    date: i.order.order_date
                }])
            ).values()
        ).map(order => ({
            ...order,
            imports: handleImportsOfOrder(order.id)
        }));    

        setOrders(ordersList)
        console.log(ordersList)
    }, [imports])

    function handleImportsOfOrder(id){
        const importsList = imports
            .filter(i => i.order.id === id)
            .map(i => ({
                erp_cod: i.supplier_product.product.erp_code 
                    || '20020067',
                erp_description: i.supplier_product.erp_description 
                    || '0603 15PF 50V 5% C0G PN: MA0603CG',
                final_description: i.supplier_product.product.final_description
                    || 'CONDENSADORES ELÉTRICOS( CAPACITORES) DE CAMADAS MÚLTIPLAS, FIXOS, SMD, 15 PF ± 5% 50V, C0G P/N: MA0603CG150J500. (COD. 020020067',
                ncm: i.supplier_product.product.ncm
                    || '8532.24.10',
                manufacturer: {
                    name: i.manufacturer.name
                        || 'MERITEK ELECTRONICS CORPORATION',
                    address: i.manufacturer.address
                        || '5160 RIVERGRADE RD, CA 91706',
                    country: i.manufacturer.origin_country
                        || 'ESTADOS UNIDOS',
                }
            }))

        return importsList
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }




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
                {orders.map(order => (
                    <table className={`table rounded-3 m-0 ${styles.orderTable} ${styles.table}`}>
                        <thead>
                            {/* Informações do Order */}
                            <tr className={styles.orderRow}>
                                <th colSpan={6}>
                                    {order.id}
                                </th>

                                <th colSpan={2}>
                                    Extraído em: {formatDate(order.date)}
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
                            {order.imports.map((imp, index) => (
                                <tr>
                                    <th scope="row"> {index + 1} </th>
                                    <td>{imp.erp_cod}</td>
                                    <td>{imp.erp_description}</td>
                                    <td>{imp.final_description}</td>
                                    <td className={styles.ncm}>
                                        {imp.ncm}
                                    </td>
                                    <td>{imp.manufacturer.name}</td>
                                    <td>{imp.manufacturer.address}</td>
                                    <td>{imp.manufacturer.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}

            </section>
        </>
    )
}

export default HistoryView