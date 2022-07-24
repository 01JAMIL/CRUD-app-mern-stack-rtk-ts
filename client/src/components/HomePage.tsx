import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { fetchProducts, deleteProduct } from '../features/product/productSlice'

const HomePage = () => {

    const products = useAppSelector((state: RootState) => state.product)
    const [productDeleted , setProductDeleted] = useState(false)
    const dispatch = useAppDispatch()


    useEffect(() => {
        const getProducts = () => {
            dispatch(fetchProducts())
        }

        getProducts()
    }, [productDeleted])

    const deleteProd = (id: string) => {
        console.log(productDeleted)
        if (window.confirm('Are you sure you want to delete this product ?')) {
            dispatch(deleteProduct(id)).then(() => {
                setProductDeleted(true)
            })
        }
    }

    return (
        <div className='container'>
            <div className="container-main">

                <h3>Products</h3>

                {
                    products.loading === true ?
                        (<div style={{ textAlign: "center" }}>Loading...</div>) :
                        (products.error ? <div style={{ textAlign: 'center' }}>{products.error.message}</div> :
                            (products.products.length > 0 ?
                                <div className='products-list'>
                                    <table className="table" cellSpacing={0}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.products.map((product, index) => (
                                                <tr key={index}>
                                                    <td> {product.name} </td>
                                                    <td> {product.price + ' DT'} </td>
                                                    <td> <img src={`../../../uploads/${product.image}`} alt="img" style={{ width: '120px' }} /> </td>
                                                    <td>
                                                        <button className='btn'><i className="fa-solid fa-gear"></i></button>
                                                        <button className='btn' onClick={() => deleteProd(product._id)}><i className="fa-solid fa-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div> : <div style={{ textAlign: 'center' }}> No product found </div>
                            ))
                }
            </div>
        </div>
    )
}

export default HomePage