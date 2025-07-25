<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :columns="columns"
    :items="orders"
    :loading="$props.loading"
  >
    <template #cell(order_date)="{ rowData }">
      {{ new Date(rowData.order_date).toLocaleDateString() }}
    </template>

    <template #cell(total_amount)="{ rowData }"> {{ rowData.summary.total_amount }} ₴ </template>

    <template #cell(status)="{ rowData }">
      <VaBadge
        :text="rowData.payment.status === 'paid' ? 'Paid' : 'Not paid'"
        :color="rowData.payment.status === 'paid' ? 'success' : 'danger'"
      />
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>{{ $props.pagination.total }} results.</b>
      Results on the page
      <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.page === 1"
        @click="$props.pagination.page--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="$props.pagination.page === totalPages"
        @click="$props.pagination.page++"
      />
      <VaPagination
        v-model="$props.pagination.page"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useVModel } from '@vueuse/core'
import { defineVaDataTableColumns } from 'vuestic-ui'

import type { PropType } from 'vue'
import type { Order, Pagination } from '../../types/order'

const columns = defineVaDataTableColumns([
  { label: 'Order №', key: 'order_id', sortable: true },
  { label: 'Date', key: 'order_date', sortable: true },
  { label: 'Customer', key: 'customer.name', sortable: true },
  { label: 'Manufacturer', key: 'manufacturer.name', sortable: true },
  { label: 'Quantity of Items', key: 'summary.total_quantity', sortable: true },
  { label: 'Total Amount', key: 'total_amount', sortable: true },
  { label: 'Delivery Address', key: 'delivery.address', sortable: false },
  { label: 'Payment', key: 'status', sortable: true },
])

const props = defineProps({
  orders: {
    type: Array as PropType<Order[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<string | boolean>, required: true },
  sortingOrder: { type: String as PropType<'asc' | 'desc' | null>, default: null },
})

const emit = defineEmits<{
  (event: 'update:sortBy', sortBy: string): void
  (event: 'update:sortingOrder', sortingOrder: 'asc' | 'desc' | null): void
}>()

const orders = toRef(props, 'orders')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))
</script>
