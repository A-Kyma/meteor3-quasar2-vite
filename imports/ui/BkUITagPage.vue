<template>
  <div class="q-pa-md bkui-page">
    <div class="row items-center q-col-gutter-sm q-mb-md action-bar">
      <div class="col-auto">
        <q-btn flat color="primary" :to="{ name: 'bkui-tags' }" label="Back to tag list" />
      </div>
      <div class="col-auto">
        <q-btn color="primary" outline @click="retryRender">Retester ce tag</q-btn>
      </div>
      <div class="col-auto" v-if="tagName === 'BkModal'">
        <q-btn color="secondary" @click="openModal">Ouvrir la modal</q-btn>
      </div>
      <div class="col">
        <div class="text-h5 text-weight-bold">{{ tagName }}</div>
      </div>
    </div>

    <q-banner v-if="!tagExists" class="bg-red-2 text-negative q-mb-md" dense>
      Tag inconnu: {{ tagName }}
    </q-banner>

    <q-banner v-else-if="errorMessage" class="bg-red-2 text-negative q-mb-md" dense>
      <div class="text-weight-bold">Erreur capturée</div>
      <div class="q-mt-xs">{{ errorMessage }}</div>
      <div class="q-mt-sm" v-if="errorDetails.info">
        <strong>Info Vue:</strong> {{ errorDetails.info }}
      </div>
      <div class="q-mt-sm" v-if="errorDetails.name">
        <strong>Type:</strong> {{ errorDetails.name }}
      </div>
      <div class="q-mt-sm" v-if="errorDetails.stack">
        <div class="text-weight-medium q-mb-xs">Stack trace</div>
        <pre class="error-block">{{ errorDetails.stack }}</pre>
      </div>
    </q-banner>

    <q-card v-if="tagExists" flat bordered>
      <q-card-section>
        <div class="text-caption text-grey-7 q-mb-sm">
          Apercu du composant en conditions minimales de rendu.
        </div>

        <div class="preview-area">
        <component :is="tagName" :key="renderKey" v-bind="componentProps" ref="testedComponent">
          <template v-if="tagName === 'BkTranslate'">
            route.home.title
          </template>
          <template v-if="tagName === 'BkPage'" #title>
            <div class="text-subtitle1">Titre de page de test</div>
          </template>
          <template v-if="tagName === 'BkPage'" #default="{ model }">
            <div>Modele charge: {{ model?.defaultName?.() || 'n/a' }}</div>
          </template>
          <template v-if="tagName === 'BkTable'" #customHeader>
            <div class="text-subtitle2">Header de test</div>
          </template>
          <template v-if="tagName === 'BkTable'" #cell(title)="{ model }">
            <strong>{{ model.title }}</strong>
          </template>
          <template v-if="tagName === 'BkButtonIcon'">
            <span>Trigger</span>
          </template>
          <template v-if="tagName === 'BkModal'" #default>
            Modal test content.
          </template>
        </component>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle2 text-weight-medium q-mb-sm">Props utilisées</div>
        <pre class="props-block">{{ prettyProps }}</pre>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {
  QBanner,
  QBtn,
  QCard,
  QCardSection,
  QSeparator,
} from 'quasar'
import { BKUI_TAGS } from './bkuiTags'
import { createBkUIDemoRecord, createBkUIDemoTableRows, demoPeople } from '../classes/BkUIDemo'

const buildMockDatatable = () => ({
  page: 1,
  getCount() { return 10 },
  getCountLocal() { return 3 },
  handler: { ready() { return true } },
  setPage() {},
})

export default {
  name: 'BkUITagPage',
  components: {
    QBanner,
    QBtn,
    QCard,
    QCardSection,
    QSeparator,
  },
  data() {
    return {
      renderKey: 0,
      errorMessage: '',
      errorDetails: {
        name: '',
        message: '',
        stack: '',
        info: '',
      },
      record: createBkUIDemoRecord(),
      rows: createBkUIDemoTableRows(),
    }
  },
  errorCaptured(err, _instance, info) {
    const name = err && typeof err === 'object' && 'name' in err ? err.name : ''
    const message = err && typeof err === 'object' && 'message' in err ? err.message : String(err)
    const stack = err && typeof err === 'object' && 'stack' in err ? err.stack : ''
    this.errorMessage = String(message)
    this.errorDetails = {
      name: String(name || ''),
      message: String(message || ''),
      stack: String(stack || ''),
      info: String(info || ''),
    }
    return false
  },
  computed: {
    tagName() {
      const raw = this.$route.params.tag
      if (Array.isArray(raw)) return raw[0] || ''
      return raw || ''
    },
    tagExists() {
      return BKUI_TAGS.includes(this.tagName)
    },
    personOptions() {
      return demoPeople.map((person) => ({
        text: person.defaultName(),
        value: person._id,
        record: person,
      }))
    },
    componentProps() {
      const byTag = new Map([
        ['BkLabel', { model: this.record, field: 'title' }],
        ['BkViewClean', { model: this.record, field: 'progress' }],
        ['BkActionableBadges', {
          model: this.record,
          field: 'palette',
          value: this.record.palette,
          options: [
            { value: 'red' },
            { value: 'orange' },
            { value: 'green' },
            { value: 'blue' },
          ],
        }],
        ['BkBelongsToInput', { model: this.record, field: 'owner', options: this.personOptions }],
        ['BkBelongsToMany', { model: this.record, field: 'reviewers', options: this.personOptions }],
        ['BkDatalistInput', { model: this.record.address, options: ['Bruxelles', 'Namur', 'Liège'] }],
        ['BkDatePicker', { value: new Date(), for: 'edit' }],
        ['BkDropdown', { model: this.record, field: 'approvalMode', options: [{ text: 'Manual', value: 'manual' }, { text: 'Auto', value: 'automatic' }] }],
        ['BkInnerInput', { model: this.record, field: 'title' }],
        ['BkInput', { model: this.record, field: 'title' }],
        ['BkTextEditor', { model: this.record, field: 'richDescription', value: this.record.richDescription }],
        ['BkTable', { model: 'BkUIDemoRecord', array: this.rows, fields: ['title', 'status'], actions: ['view'], perPage: 2 }],
        ['BkPagination', { datatable: buildMockDatatable(), perPage: 10, count: 10 }],
        ['BkPage', { model: this.record }],
        ['BkView', { model: this.record, field: 'title' }],
        ['BkViewInner', { model: this.record, field: 'title' }],
        ['BkFile', { model: this.record, field: 'avatar', for: 'view' }],
        ['BkButtonIcon', { for: 'back', label: 'app.back' }],
        ['BkExportToXlsxButton', { fromBkTable: true, params: {} }],
        ['BkModal', { title: 'app.ok' }],
        ['BkLoading', { type: 'dots' }],
        ['BkCardListClass', { model: this.record, field: 'tasks' }],
        ['BkFieldList', { model: this.record, fields: 'title,status' }],
        ['BkForm', { model: this.record }],
        ['BkSubmit', { for: 'new' }],
      ])
      return { ...(byTag.get(this.tagName) || {}) }
    },
    prettyProps() {
      const seen = new WeakSet()
      /** @type {(value: any, depth?: number) => any} */
      const sanitize = (value, depth = 0) => {
        if (value === null || value === undefined) return value
        if (depth > 3) return '[MaxDepth]'
        const type = typeof value
        if (type === 'string' || type === 'number' || type === 'boolean') return value
        if (type === 'function') return `[Function ${value.name || 'anonymous'}]`
        if (value instanceof Date) return value.toISOString()
        if (Array.isArray(value)) return value.map((x) => sanitize(x, depth + 1))
        if (type === 'object') {
          if (seen.has(value)) return '[Circular]'
          seen.add(value)

          if (value.constructor && value.constructor.getName && value.defaultName) {
            return {
              __model: value.constructor.getName(),
              defaultName: value.defaultName(),
              _id: value._id,
            }
          }

          /** @type {Record<string, any>} */
          const out = {}
          /** @type {Record<string, any>} */
          const source = value
          Object.keys(value).forEach((k) => {
            out[k] = sanitize(source[k], depth + 1)
          })
          return out
        }
        return String(value)
      }
      return JSON.stringify(sanitize(this.componentProps), null, 2)
    },
  },
  watch: {
    tagName() {
      this.errorMessage = ''
      this.errorDetails = { name: '', message: '', stack: '', info: '' }
      this.renderKey += 1
    },
  },
  methods: {
    retryRender() {
      this.errorMessage = ''
      this.errorDetails = { name: '', message: '', stack: '', info: '' }
      this.renderKey += 1
    },
    openModal() {
      const ref = /** @type {any} */ (this.$refs.testedComponent)
      if (ref && typeof ref.show === 'function') ref.show()
    },
  },
}
</script>

<style scoped>
.bkui-page {
  max-width: 1280px;
  margin: 0 auto;
}

.action-bar {
  position: sticky;
  top: 0;
  z-index: 5000;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  pointer-events: auto;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}

.preview-area {
  min-height: 140px;
  border: 1px dashed #dbe3ef;
  border-radius: 10px;
  padding: 12px;
  background: linear-gradient(180deg, #fafcff 0%, #f7fafd 100%);
}

.props-block,
.error-block {
  white-space: pre-wrap;
  word-break: break-word;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
  line-height: 1.45;
  max-height: 300px;
  overflow: auto;
}

:deep(.q-btn.bg-primary) {
  background: linear-gradient(90deg, #0f62fe 0%, #0353e9 100%) !important;
}

:deep(.q-btn.text-primary) {
  color: #0f62fe !important;
}

:deep(.bk-plaintext .q-badge) {
  min-width: 36px;
  min-height: 24px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(2, 6, 23, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.55);
}

:deep(.bk-plaintext .q-badge.checked) {
  transform: scale(1.08);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.85), 0 4px 12px rgba(15, 23, 42, 0.28);
}
</style>
