<template>
  <div class="q-pa-md">
    <div class="text-h4 text-bold q-mb-md">Welcome to Meteor</div>
    <div
      rounded
      class="bg-secondary text-white rounded-borders q-pa-md"
    >
      <div>
        <QIcon
          name="fas fa-check"
          size="1em"
        /> Meteor 3 (Full stack JavaScript framework)
      </div>
      <div>
        <QIcon
          name="fas fa-check"
          size="1em"
        /> Vue 3 (JavaScript framework)
      </div>
      <div>
        <QIcon
          name="fas fa-check"
          size="1em"
        /> Vite (Build tool)
      </div>
      <div>
        <QIcon
          name="fas fa-check"
          size="1em"
        /> Quasar 2 (UI framework)
      </div>
      <div>
        <QIcon
          name="fas fa-check"
          size="1em"
        /> Fontawesome 6 (Icon library)
      </div>
    </div>
    <t>app.home</t>
    <Hello class="q-mt-md" />
    <Info />
    <bk-label :model='doc' field="text" for="view" locale="fr"/>
  </div>
</template>
<script>
// @ts-ignore
import Hello from './Hello.vue';
// @ts-ignore
import Info from './Info.vue';
import Doc from '../classes/Doc';

export default {
  name: 'Home', 
  components: { Hello, Info },
  computed: {
    doc() {
      const doc = new Doc();
      return doc;
    } 
  }
}   

</script>