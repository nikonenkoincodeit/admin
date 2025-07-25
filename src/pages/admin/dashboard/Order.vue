<template>
  <div>
    <h1 class="page-title mt-3">Orders</h1>
    <VaCard>
      <VaCardContent>
        <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
          <div class="flex flex-col md:flex-row gap-2 justify-start">
            <VaInput v-model="store.search" placeholder="Search">
              <template #prependInner>
                <VaIcon name="search" color="secondary" size="small" />
              </template>
            </VaInput>
          </div>
        </div>
        <OrdersTable
          v-model:sort-by="store.sortBy"
          v-model:sorting-order="store.sortingOrder"
          :loading="store.isLoading"
          :pagination="store.pagination"
          :orders="store.orders"
        />
      </VaCardContent>
    </VaCard>
  </div>
</template>
<script setup lang="ts">
import OrdersTable from '../../../components/admin/OrdersTable.vue'

import { useOrdersStore } from '../../../stores/orders'

const store = useOrdersStore()
</script>
