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

export const saveProduct = createAsyncThunk('product/saveProduct', async (form: FormData, { rejectWithValue }) => {
    return await axios.post('/api/product/', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        return rejectWithValue(err.response.data)
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
            state.products.push(action.payload)
            state.error = ''
        })

        builder.addCase(saveProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    },
})


export default productSlice.reducer