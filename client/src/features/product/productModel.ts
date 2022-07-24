export class Product {
    _id: string
    name: string
    price: string
    image: string
}

export interface ProductState {
    loading: boolean
    products: Product[]
    error: any
}