import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

import type { PaymentType } from '../types/payment'
import paymentsJsonRaw from '../data/pages/payments.json'

export const usePaymentsStore = defineStore('payments', () => {
  const paymentsJson = paymentsJsonRaw as PaymentType[]

  const _payments = ref(paymentsJson)
  const isLoading = ref(false)
  const _sortingOrder = ref<'asc' | 'desc' | null>('desc')
  const _sortBy = ref<string>('order_date')
  const _search = ref<string>('')

  const filterByFields = ['transaction_id', 'date']

  const pagination = reactive({
    page: 1,
    perPage: 10,
    total: _payments.value.length,
  })

  const sortingOrder = computed<'asc' | 'desc' | null>({
    get: () => _sortingOrder.value,
    set: (value) => (_sortingOrder.value = value),
  })

  const sortBy = computed<string>({
    get: () => _sortBy.value,
    set: (value) => (_sortBy.value = value),
  })

  const search = computed<string>({
    get: () => _search.value,
    set: (value) => (_search.value = value),
  })

  const payments = computed(() => {
    let result = [..._payments.value]

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

  function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => o?.[key], obj)
  }

  return {
    sortBy,
    search,
    payments,
    isLoading,
    pagination,
    sortingOrder,
  }
})
