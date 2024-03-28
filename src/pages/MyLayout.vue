<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card dark bordered class="bg-grey-9 my-card col-lg-2 col-xs-2">
      <q-card-section>
        <div class="text-h6">Supermercado</div>
        <div class="text-subtitle2">by Lucas Campolim</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>

  <q-page padding>
    <q-btn @click="create()" label="Criar Lista" color="blue" />
  </q-page>
</template>
