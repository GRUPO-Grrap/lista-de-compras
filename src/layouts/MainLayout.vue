<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Menu </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Stakeholders </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

const linksList = [
  {
    title: 'Gerente de Projeto',
    caption: 'github.com/tharlisdavid',
    icon: 'school',
    link: 'https://github.com/tharlisdavid'
  },
  {
    title: 'OPS',
    caption: 'github.com/gabrielgt5',
    icon: 'school',
    link: 'https://github.com/gabrielgt5'
  },
  {
    title: 'Dev Sênior',
    caption: 'github.com/eonarga',
    icon: 'school',
    link: 'https://github.com/eonarga'
  },
  {
    title: 'Dev Pleno',
    caption: 'github.com/lucascampolimm',
    icon: 'school',
    link: 'https://github.com/lucascampolimm'
  },
  {
    title: 'Dev Júnior',
    caption: 'github.com/raphaelkauan',
    icon: 'school',
    link: 'https://github.com/raphaelkauan'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
