export interface OrderItem {
  product_id: number
  name: string
  quantity: number
  price: number
}

export interface Order {
  order_id: string
  order_date: string
  customer: {
    name: string
  }
  manufacturer: {
    name: string
  }
  items: OrderItem[]
  delivery: {
    address: string
  }
  payment: {
    status: 'paid' | 'unpaid'
  }
  summary: {
    total_quantity: number
    total_amount: number
  }
}

export interface Pagination {
  page: number
  perPage: number
  total: number
}
