<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
      <q-input
        outlined
        v-model="form.name"
        label="Nome"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <q-input
        outlined
        v-model="form.quantity"
        label="Quantidade"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <div class="col-lg-12 col-xs-12">
        <q-editor v-model="form.observations" min-height="5rem" />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit" />
        <q-btn
          label="Cancelar"
          color="red"
          class="float-right"
          text-color="white"
          icon="cancel"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import postsService from 'src/services/posts';
export default {
  name: 'FormPost',
  setup() {
    const { create } = postsService();
    const form = ref({
      name: '',
      quantity: '',
      observations: ''
    });

    const onSubmit = async () => {
      try {
        await create(form.value);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      onSubmit
    };
  }
};
</script>
