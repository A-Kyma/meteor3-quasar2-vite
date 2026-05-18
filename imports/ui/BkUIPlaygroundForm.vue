<template>
  <div class="q-pa-md bkui-page">
    <bk-bread-crumb class="q-mb-md" />

    <bk-page :model="record">
      <template #title>
        <div class="row items-center justify-between q-col-gutter-md q-mb-md">
          <div class="col-12 col-md">
            <div class="text-h4 text-weight-bold">BkUI form playground</div>
            <div class="text-body1 text-grey-7">
              Formulaire complet avec classes imbriquées, relations, fichiers, vues read-only et composants d'input spécifiques.
            </div>
          </div>
          <div class="col-auto">
            <bk-language view="dropdown" />
          </div>
        </div>
      </template>

      <template #default="{ model }">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-xl-7">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Main form</div>
                <bk-form
                  :model="model"
                  :exclude="['owner', 'reviewers']"
                  @submit="onSubmit"
                  @cancel="onCancel"
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-xl-5">
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="text-h6 q-mb-md">Standalone relation inputs</div>
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <bk-label :model="model" field="owner" />
                    <bk-belongs-to-input
                      :model="model"
                      field="owner"
                      :options="personOptions"
                      class="q-mt-xs"
                    />
                  </div>
                  <div class="col-12">
                    <bk-label :model="model" field="reviewers" />
                    <bk-belongs-to-many
                      :model="model"
                      field="reviewers"
                      :options="personOptions"
                      class="q-mt-xs"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Read-only preview</div>
                <div class="column q-gutter-sm">
                  <bk-view :model="model" field="title" />
                  <bk-view-inner :model="model" field="status" />
                  <bk-view-clean :model="model" field="progress" />
                  <bk-view-clean :model="model" field="richDescription" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
    </bk-page>
  </div>
</template>

<script>
import {
  QCard,
  QCardSection,
} from 'quasar'
import { createBkUIDemoRecord, demoPeople } from '../classes/BkUIDemo'

export default {
  name: 'BkUIPlaygroundForm',
  components: {
    QCard,
    QCardSection,
  },
  data() {
    return {
      record: createBkUIDemoRecord(),
    }
  },
  computed: {
    personOptions() {
      return demoPeople.map((person) => ({
        text: person.defaultName(),
        value: person._id,
        record: person,
      }))
    },
  },
  methods: {
    /** @param {Event} event */
    onSubmit(event) {
      event.preventDefault()
    },
    /** @param {Event} event */
    onCancel(event) {
      event.preventDefault()
    },
  },
}
</script>

<style scoped>
.bkui-page {
  max-width: 1440px;
  margin: 0 auto;
}
</style>