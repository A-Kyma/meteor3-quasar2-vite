<template>
  <div class="q-pa-md bkui-page">
    <bk-bread-crumb class="q-mb-md" />

    <div class="text-h4 text-weight-bold q-mb-sm">BkUI table playground</div>
    <div class="text-body1 text-grey-7 q-mb-lg">
      Table locale basée sur des instances de classe Bk avec pagination, actions de ligne, filtres visuels et export BkUI.
    </div>

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Standalone filters block</div>
        <bk-filters />
      </q-card-section>
    </q-card>

    <q-card flat bordered>
      <q-card-section>
        <bk-table
          :array="rows"
          model="BkUIDemoRecord"
          :fields="['title', 'status', 'approvalMode', 'progress', 'satisfaction', 'buttonActions']"
          :actions="['view', 'update', 'export']"
          :per-page="2"
          update-route
          card-with-label
        >
          <template #customHeader>
            <div class="text-h6 q-mb-sm">Local class instances in BkTable</div>
          </template>

          <template #cell(progress)="{ model }">
            <bk-view-clean :model="model" field="progress" />
          </template>

          <template #cell(satisfaction)="{ model }">
            <bk-view-clean :model="model" field="satisfaction" />
          </template>
        </bk-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {
  QCard,
  QCardSection,
} from 'quasar'
import { createBkUIDemoTableRows } from '../classes/BkUIDemo'

export default {
  name: 'BkUIPlaygroundTable',
  components: {
    QCard,
    QCardSection,
  },
  data() {
    return {
      rows: createBkUIDemoTableRows(),
    }
  },
}
</script>

<style scoped>
.bkui-page {
  max-width: 1440px;
  margin: 0 auto;
}
</style>