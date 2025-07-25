import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

import type { Order } from '../types/order'
import ordersJsonRaw from '../data/pages/orders.json'

export const useOrdersStore = defineStore('orders', () => {
  const ordersJson = ordersJsonRaw as Order[]

  const _search = ref<string>('')
  const _orders = ref<Order[]>(ordersJson)
  const _sortingOrder = ref<'asc' | 'desc' | null>('desc')
  const _sortBy = ref<string | false>('order_date')
  const filterByFields = ['customer.name', 'manufacturer.name']
  const isLoading = ref(false)

  const pagination = reactive({
    page: 1,
    perPage: 10,
    total: _orders.value.length,
  })

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((o, key) => o?.[key], obj)
  }

  const sortingOrder = computed<'asc' | 'desc' | null>({
    get: () => _sortingOrder.value,
    set: (value) => (_sortingOrder.value = value),
  })

  const sortBy = computed<string | false>({
    get: () => _sortBy.value,
    set: (value) => (_sortBy.value = value),
  })

  const search = computed<string>({
    get: () => _search.value,
    set: (value) => (_search.value = value),
  })

  const orders = computed(() => {
    let result = [..._orders.value]

    if (_search.value.trim()) {
      const searchLower = _search.value.trim().toLowerCase()
      result = result.filter((order) =>
        filterByFields.some((field) => {
          const fieldValue = getNestedValue(order, field)
          return String(fieldValue).toLowerCase().includes(searchLower)
        }),
      )
    }

    if (_sortBy.value && _sortingOrder.value) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, _sortBy.value as string)
        const bValue = getNestedValue(b, _sortBy.value as string)

        if (aValue == null) return 1
        if (bValue == null) return -1
        if (aValue === bValue) return 0

        const comparison = aValue > bValue ? 1 : -1
        return _sortingOrder.value === 'desc' ? -comparison : comparison
      })
    }

    return result
  })

  return {
    search,
    orders,
    sortBy,
    isLoading,
    pagination,
    sortingOrder,
  }
})
