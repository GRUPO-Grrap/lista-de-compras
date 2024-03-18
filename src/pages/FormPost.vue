<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
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
import { ref, onMounted } from 'vue';
import postsService from 'src/services/posts';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
export default {
  name: 'FormPost',
  setup() {
    const { create, getById, updateById } = postsService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const form = ref({
      name: '',
      quantity: '',
      observations: ''
    });

    onMounted(async () => {
      // console.log(route.params.id);
      if (route.params.id) {
        getPost(route.params.id);
        // console.log(response);
      }
    });

    const getPost = async (id) => {
      try {
        const response = await getById(id);
        form.value = response;
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await updateById(form.value);
          $q.notify({ message: 'Item atualizado com sucesso', icon: 'check', color: 'positive' });
          router.push({ name: 'home' });
        } else {
          await create(form.value);
          $q.notify({ message: 'Item adicionado com sucesso', icon: 'check', color: 'positive' });
          router.push({ name: 'home' });
        }
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
