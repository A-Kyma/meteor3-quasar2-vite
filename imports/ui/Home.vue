<template>
  <div class="q-pa-md bkui-home">
    <div class="text-h3 text-weight-bold q-mb-sm">BkUI playground</div>
    <div class="text-body1 text-grey-7 q-mb-lg">
      Application de test pour valider les composants exportés par BkUI dans le contexte Meteor 3 + Vue 3 + Quasar.
    </div>

    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6 q-mb-sm">Typed form page</div>
            <div class="text-body2 text-grey-7 q-mb-md">
              BkForm, BkFieldList, BkInput, relations, fichiers, classes imbriquées, vues read-only.
            </div>
            <q-btn color="primary" :to="{ name: 'bkui-form' }" label="Open form playground" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6 q-mb-sm">Local table page</div>
            <div class="text-body2 text-grey-7 q-mb-md">
              BkTable, BkPagination, inline BkViewClean rendering, row actions and Bk export wiring.
            </div>
            <q-btn color="primary" :to="{ name: 'bkui-table' }" label="Open table playground" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6 q-mb-sm">Standalone components</div>
            <div class="text-body2 text-grey-7 q-mb-md">
              Language switcher, modal, auth forms, dropdowns, datalist, actionable badges and admin routes.
            </div>
            <q-btn color="primary" :to="{ name: 'bkui-components' }" label="Open standalone gallery" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-sm">Current integration check</div>
        <div class="text-body2 q-mb-sm">
          <bk-label :model="doc" field="text" for="view" locale="fr" />
        </div>
        <Hello class="q-mt-md" />
        <Info />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import {
  QBtn,
  QCard,
  QCardSection,
} from 'quasar'
// @ts-ignore
import Hello from './Hello.vue';
// @ts-ignore
import Info from './Info.vue';
import Doc from '../classes/Doc';

export default {
  name: 'Home', 
  components: {
    Hello,
    Info,
    QBtn,
    QCard,
    QCardSection,
  },
  computed: {
    doc() {
      const doc = new Doc();
      return doc;
    } 
  }
}   

</script>