import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axios from 'axios'
import { Product, ProductState } from './productModel'

const initialState: ProductState = {
    loading: false,
    products: [],
    error: {}
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    return await axios.get('/api/product')
        .then(res => {
            return res.data
        })
})

export const getProductById = createAsyncThunk('product/getProductById', async (id: string) => {
    return await axios.get(`/api/product/${id}`).then(res => {
        return res.data
    })
})

export const saveProduct = createAsyncThunk('product/saveProduct', async (data: any, { rejectWithValue }) => {
    const { form, navigate } = data
    return await axios.post('/api/product/', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        navigate('/', { replace: true })
        return res.data
    }).catch(err => {
        return rejectWithValue(err.response.data)
    })
})

export const updateProduct = createAsyncThunk('product/updateProduct', async (data: any, { rejectWithValue }) => {
    const { navigate, form, id } = data
    return await axios.put(`/api/product/${id}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        navigate('/', { replace: true })
        return res.data
    }).catch(err => {
        return rejectWithValue(err.response.data)
    })
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string) => {
    return await axios.delete(`/api/product/${id}`).then(res => {
        return res.data
    })
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })

        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })


        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error
        })

        builder.addCase(saveProduct.pending, state => {
            state.loading = true
        })

        builder.addCase(saveProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.loading = false
            state.products = [...state.products, action.payload]
            state.error = ''
        })

        builder.addCase(saveProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(updateProduct.pending, state => {
            state.loading = true
        })

        builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.loading = false
            const index = state.products.findIndex(p => p._id === action.payload._id)
            state.products[index] = action.payload
            state.error = ''
        })


        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(deleteProduct.pending, state => {
            state.loading = true
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    },
})


export default productSlice.reducer