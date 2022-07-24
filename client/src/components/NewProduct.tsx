import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { saveProduct } from '../features/product/productSlice'
import { RootState } from '../app/store'


const NewProduct = () => {

    const state = useAppSelector((state: RootState) => state.product)

    const [form, setForm] = useState(new FormData())
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
        dispatch(saveProduct(form)).then(() => {
            navigate('/', { replace: true })
        })
    }

    return (
        <div className="new-product-container">
            <div>
                <h3>New product</h3>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`text-input ${state.error.nameError && 'invalid'}`}
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
                        <button type="submit" className="btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewProduct