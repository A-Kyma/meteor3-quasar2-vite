<template>
  <div class="q-pa-md bkui-page">
    <bk-bread-crumb class="q-mb-md" />

    <div class="row items-center justify-between q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md">
        <div class="text-h4 text-weight-bold">BkUI standalone components</div>
        <div class="text-body1 text-grey-7">
          Galerie des composants non couverts uniquement par le formulaire principal: langues, modal, auth, traductions, imports/exports et composants de navigation.
        </div>
      </div>
      <div class="col-auto">
        <q-btn color="primary" outline @click="$refs.exampleModal.show()">
          Open modal playground
        </q-btn>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-6">
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 q-mb-md">Translation and navigation</div>
            <div class="column q-gutter-md">
              <div>
                <div class="text-caption text-grey-7 q-mb-xs">BkTranslate</div>
                <t>route.components.title</t>
              </div>
              <div>
                <div class="text-caption text-grey-7 q-mb-xs">BkLabel</div>
                <bk-label :model="record" field="title" />
              </div>
              <div>
                <div class="text-caption text-grey-7 q-mb-xs">BkLanguage</div>
                <div class="row q-gutter-sm items-center">
                  <bk-language view="dropdown" />
                  <bk-language view="flags" />
                  <bk-language view="nav" />
                </div>
              </div>
              <div>
                <div class="text-caption text-grey-7 q-mb-xs">BkButtonIcon</div>
                <div class="row q-gutter-sm">
                  <bk-button-icon for="back" label="app.back" />
                  <bk-button-icon for="view" :model="record" :fields="['title', 'status', 'progress']" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 q-mb-md">Standalone inputs</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7 q-mb-xs">BkDropdown</div>
                <bk-dropdown :model="record" field="approvalMode" :options="approvalOptions" />
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7 q-mb-xs">BkDatalistInput</div>
                <bk-datalist-input :model="record.address" :options="cityOptions" />
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7 q-mb-xs">BkActionableBadges</div>
                <bk-actionable-badges :model="record" field="palette" :options="paletteOptions" :value="record.palette" />
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7 q-mb-xs">BkExportToXlsxButton</div>
                <bk-export-to-xlsx-button from-bk-table :params="{}" @export="noop" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 q-mb-md">Loaders and modal</div>
            <div class="row q-col-gutter-md items-center q-mb-md">
              <div class="col-auto"><bk-loading type="dots" /></div>
              <div class="col-auto"><bk-loading type="loading" /></div>
              <div class="col-auto"><bk-loading /></div>
            </div>

            <bk-modal ref="exampleModal" title="app.ok" @ok="onModalOk">
              <template #default>
                <div class="text-body1">BkModal with arbitrary slot content.</div>
              </template>
            </bk-modal>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-lg-6">
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 q-mb-md">Auth-related forms</div>
            <div class="column q-gutter-xl">
              <bk-login />
              <bk-change-password />
              <bk-reset-password />
              <bk-subscribe />
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 q-mb-md">Admin-oriented components</div>
            <div class="column q-gutter-md">
              <router-link :to="{ name: 'bkui-parameter-tables' }">Open BkParameterTables</router-link>
              <router-link :to="{ name: 'bkui-parameter-elements', params: { name: 'demo', id: 'placeholder' } }">Open BkParameterTableElements</router-link>
              <router-link :to="{ name: 'bkui-translations' }">Open BkTranslations</router-link>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QCard,
  QCardSection,
} from 'quasar'
import { createBkUIDemoRecord } from '../classes/BkUIDemo'

export default {
  name: 'BkUIPlaygroundComponents',
  components: {
    QBtn,
    QCard,
    QCardSection,
  },
  data() {
    return {
      record: createBkUIDemoRecord(),
      approvalOptions: [
        { text: 'Manual review', value: 'manual' },
        { text: 'Automatic approval', value: 'automatic' },
        { text: 'Hybrid flow', value: 'hybrid' },
      ],
      cityOptions: ['Bruxelles', 'Namur', 'Liège', 'Lille', 'Paris'],
      paletteOptions: [
        { value: 'red' },
        { value: 'orange' },
        { value: 'green' },
        { value: 'blue' },
      ],
    }
  },
  methods: {
    noop() {},
    onModalOk(event) {
      event.preventDefault()
      this.$refs.exampleModal.hide()
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