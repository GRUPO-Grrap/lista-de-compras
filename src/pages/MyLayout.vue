<template>
  <q-page class="q-pa-md">
    <!-- Botão "Adicionar" para abrir o diálogo -->
    <q-btn color="primary" label="Adicionar" @click="exibirDialogo" />

    <!-- Diálogo -->
    <q-dialog v-model="exibirCard" persistent>
      <q-card class="card">
        <q-card-section class="q-pt-lg">
          <q-input filled v-model="form.name" label="Nome" dense />
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="form.quantity" label="Quantidade" type="number" dense />
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="form.observations"
            label="Observações"
            type="textarea"
            rows="5"
            dense
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" label="Salvar" @click="onSubmit" />
          <q-btn color="negative" label="Cancelar" @click="fecharDialogo" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    const exibirCard = ref(false); // Variável para controlar a exibição do diálogo
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

    const exibirDialogo = () => {
      // Exibir o diálogo quando o botão "Adicionar" é clicado
      exibirCard.value = true;
    };

    const fecharDialogo = () => {
      // Fechar o diálogo
      exibirCard.value = false;

      // Limpar os campos
      form.value.name = '';
      form.value.quantity = '';
      form.value.observations = '';
    };

    const onSubmit = async () => {
      try {
        if (!form.value.name || !form.value.quantity) {
          $q.notify({
            message: 'Por favor, preencha todos os campos',
            icon: 'warning',
            color: 'negative'
          });
          return;
        }

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
      exibirCard,
      form,
      exibirDialogo,
      fecharDialogo,
      onSubmit
    };
  }
};
</script>

<style scoped>
.card {
  width: 400px;
}

.q-input {
  max-width: 300px;
}
</style>
