import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { getProductById, updateProduct } from '../features/product/productSlice'

const UpdateProduct = () => {

    const state = useAppSelector((state: RootState) => state.product)
    const [form, setForm] = useState({
        name: '',
        price: ''
    })
    const [productImage, setProductImage] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getProductById(id)).then(res => {
            setForm(res.payload)
            setProductImage(res.payload.image)
        })
    }, [])

    const changeHandler = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const fileChangeHandler = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.files[0]
        })
    }

    const submitHandler = (e: any) => {
        e.preventDefault()

        const obj = {
            navigate,
            form,
            id
        }

        dispatch(updateProduct(obj))

    }

    return (
        <div className="new-product-container">
            <div>
                <h3>Update product</h3>
                <form onSubmit={submitHandler} id="formEles">
                    {productImage !== '' && <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <img src={`../../../uploads/${productImage}`} style={{ width: '120px' }} alt="image" />
                    </div>}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`text-input ${state.error.nameError && 'invalid'}`}
                            value={form.name}
                            onChange={changeHandler}

                        />
                        {state.error.nameError &&
                            <div className="error-feedback">
                                {state.error.nameError}
                            </div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className={`text-input ${state.error.priceError && 'invalid'}`}
                            value={form.price}
                            onChange={changeHandler}
                        />
                        {state.error.priceError &&
                            <div className="error-feedback">
                                {state.error.priceError}
                            </div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className={`image-input ${state.error.imageError && 'invalid'}`}
                            onChange={fileChangeHandler}
                        />
                        {state.error.imageError &&
                            <div className="error-feedback">
                                {state.error.imageError}
                            </div>
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <button type="submit" className="btn">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct