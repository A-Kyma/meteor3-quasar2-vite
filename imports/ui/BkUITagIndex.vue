<template>
  <div class="q-pa-md bkui-page">
    <div class="text-h4 text-weight-bold q-mb-sm">BkUI tag diagnostics</div>
    <div class="text-body1 text-grey-7 q-mb-lg">
      Une page isolée par tag pour identifier exactement quel composant déclenche une erreur.
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="tag in tags" :key="tag" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card flat bordered class="tag-card" clickable @click="openTag(tag)">
          <q-card-section class="row items-center justify-between">
            <div class="text-body2 text-weight-medium ellipsis">{{ tag }}</div>
            <q-btn
              dense
              unelevated
              color="primary"
              icon="open_in_new"
              :to="{ name: 'bkui-tag-page', params: { tag } }"
              label="Open"
              @click.stop
            />
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
import { BKUI_TAGS } from './bkuiTags'

export default {
  name: 'BkUITagIndex',
  components: {
    QBtn,
    QCard,
    QCardSection,
  },
  computed: {
    tags() {
      return BKUI_TAGS
    },
  },
  methods: {
    /** @param {string} tag */
    openTag(tag) {
      this.$router.push({ name: 'bkui-tag-page', params: { tag } })
    },
  },
}
</script>

<style scoped>
.bkui-page {
  max-width: 1440px;
  margin: 0 auto;
}

.tag-card {
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.tag-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}
</style>
