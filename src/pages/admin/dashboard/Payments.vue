<template>
  <div>
    <h1 class="page-title mt-3">Payments</h1>
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

        <PaymentsTable
          v-model:sort-by="store.sortBy"
          v-model:sorting-order="store.sortingOrder"
          :items="store.payments"
          :loading="store.isLoading"
          :pagination="store.pagination"
        />
      </VaCardContent>
    </VaCard>
  </div>
</template>
<script setup lang="ts">
import PaymentsTable from '../../../components/admin/PaymentsTable.vue'

import { useUsers } from '../../users/composables/useUsers'
import { useProjects } from '../../projects/composables/useProjects'

import { usePaymentsStore } from '../../../stores/payments'

import { User } from '../../users/types'

const store = usePaymentsStore()


const { users, isLoading, filters, sorting, pagination, error, ...usersApi } = useUsers()
const { projects } = useProjects()

</script>
