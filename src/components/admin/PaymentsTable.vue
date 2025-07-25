<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :columns="columns"
    :items="items"
    :loading="$props.loading"
  >
    <template #cell(date)="{ rowData }">
      {{ new Date(rowData.date).toLocaleString() }}
    </template>

    <template #cell(status)="{ rowData }">
      <VaBadge
        :text="rowData.status === 'paid' ? 'Paid' : 'Not paid'"
        :color="rowData.status === 'paid' ? 'success' : 'danger'"
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
import type { Pagination } from '../../types/order'
import type { PaymentType } from '../../types/payment'

const columns = defineVaDataTableColumns([
  { label: 'Transaction ID', key: 'transaction_id', sortable: true },
  { label: 'Date', key: 'date', sortable: true },
  { label: 'Status', key: 'status', sortable: true },
])

const props = defineProps({
  items: {
    type: Array as PropType<PaymentType[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<string>, required: true },
  sortingOrder: { type: String as PropType<'asc' | 'desc' | null>, default: null },
})

const emit = defineEmits<{
  (event: 'update:sortBy', sortBy: string): void
  (event: 'update:sortingOrder', sortingOrder: 'asc' | 'desc' | null): void
}>()

const items = toRef(props, 'items')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))
</script>
