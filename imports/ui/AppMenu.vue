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
    <t>app.name</t>
    <QSpace />


    <QAvatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </QAvatar>
  </QToolbar>
</template>
<script>
import {QToolbar,QBtn,QAvatar,QSpace} from 'quasar'
// @ts-ignore
import { User, Role, I18n } from "meteor/akyma:bk"

 export default {
   name: "App",
   data() {
     return { }
   },
 }
</script>