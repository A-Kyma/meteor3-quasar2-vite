<template>
  <QToolbar class="bg-primary text-white">
    <QBtn
      flat
      round
      dense
      icon="menu"
      class="q-mr-sm"
    />
    <QBtn
      flat
      :to="{ name: 'home' }"
      label="Home"
    />
    <QBtn
      flat
      :to="{ name: 'bkui-form' }"
      label="BkUI Form"
    />
    <QBtn
      flat
      :to="{ name: 'bkui-table' }"
      label="BkUI Table"
    />
    <QBtn
      flat
      :to="{ name: 'bkui-components' }"
      label="BkUI Components"
    />
    <QBtn
      flat
      :to="{ name: 'bkui-tags' }"
      label="BkUI Tags"
    />
    <QSpace />

    <bk-language view="dropdown" class="q-mr-md" />
    <QAvatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </QAvatar>
  </QToolbar>
</template>
<script>
import {
  QAvatar,
  QBtn,
  QSpace,
  QToolbar,
} from 'quasar'

 export default {
   name: "App",
   components: {
     QAvatar,
     QBtn,
     QSpace,
     QToolbar,
   },
   data() {
     return { }
   },
 }
</script>