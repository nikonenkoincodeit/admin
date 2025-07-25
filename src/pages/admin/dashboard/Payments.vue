<template>
  <div>
    <h1 class="page-title mt-3">Payments</h1>
    <VaCard>
      <VaCardContent>
        <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
          <div class="flex flex-col md:flex-row gap-2 justify-start">
            <VaInput v-model="filters.search" placeholder="Search">
              <template #prependInner>
                <VaIcon name="search" color="secondary" size="small" />
              </template>
            </VaInput>
          </div>
        </div>

        <UsersTable
          v-model:sort-by="sorting.sortBy"
          v-model:sorting-order="sorting.sortingOrder"
          :users="users"
          :projects="projects"
          :loading="isLoading"
          :pagination="pagination"
          @editUser="showEditUserModal"
          @deleteUser="onUserDelete"
        />
      </VaCardContent>
    </VaCard>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useToast } from 'vuestic-ui'

import UsersTable from '../../users/widgets/UsersTable.vue'

import { useUsers } from '../../users/composables/useUsers'
import { useProjects } from '../../projects/composables/useProjects'

import { User } from '../../users/types'

const doShowEditUserModal = ref(false)

const { users, isLoading, filters, sorting, pagination, error, ...usersApi } = useUsers()
const { projects } = useProjects()

const userToEdit = ref<User | null>(null)

const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

watchEffect(() => {
  if (error.value) {
    notify({
      message: error.value.message,
      color: 'danger',
    })
  }
})

const onUserDelete = () => {}
</script>
