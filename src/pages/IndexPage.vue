<template>
  <q-page padding>
    <q-table title="Lista de Compras" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Lista de Compras</span>
        <q-space />
        <q-btn
          color="blue"
          label="Adicionar"
          @click="
            limparFormulario();
            exibirDialogo = true;
          "
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="abrirCardEdicao(props.row)" />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeletePost(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Diálogo para Adicionar/Editar Item -->
    <q-dialog v-model="exibirDialogo" persistent>
      <q-card class="card-pop-up">
        <q-card-section>
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
        <q-card-section class="q-mb-md">
          <q-btn color="primary" label="Salvar" @click="onSubmit" />
          <q-btn color="negative" label="Cancelar" @click="exibirDialogo = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import postsService from 'src/services/posts';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  name: 'IndexPage',
  setup() {
    const posts = ref([]);
    const { getAll, deleteById, updateById, create } = postsService();
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'name', field: 'name', label: 'Nome do Item', sortable: true, align: 'left' },
      { name: 'quantity', field: 'quantity', label: 'Quantidade', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ];

    const $q = useQuasar();
    // eslint-disable-next-line no-unused-vars
    const router = useRouter();
    const exibirDialogo = ref(false); // Variável para controlar a exibição do diálogo
    const form = ref({
      name: '',
      quantity: '',
      observations: ''
    });

    onMounted(() => {
      getPosts();
    });

    const getPosts = async () => {
      try {
        const data = await getAll();
        posts.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Confirmação',
          message: 'Deseja deletar esse item?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await deleteById(id);
          $q.notify({ message: 'Item removido com sucesso', icon: 'check', color: 'positive' });
          getPosts();
        });
      } catch (error) {
        $q.notify({ message: 'Erro ao remover!', icon: 'times', color: 'negative' });
      }
    };

    const abrirCardEdicao = (item) => {
      exibirDialogo.value = true;
      form.value = { ...item }; // Preenche o formulário com os detalhes do item selecionado
    };

    const limparFormulario = () => {
      form.value = { name: '', quantity: '', observations: '' }; // Limpa o formulário
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
        } else {
          await create(form.value);
          $q.notify({ message: 'Item adicionado com sucesso', icon: 'check', color: 'positive' });
        }
        exibirDialogo.value = false;
        limparFormulario();
        getPosts();
      } catch (error) {
        console.error(error);
        $q.notify({ message: 'Erro ao adicionar/atualizar!', icon: 'times', color: 'negative' });
      }
    };

    return {
      posts,
      columns,
      handleDeletePost,
      abrirCardEdicao,
      exibirDialogo,
      form,
      limparFormulario,
      onSubmit
    };
  }
};
</script>

<style scoped>
.card-pop-up {
  width: 500px;
  max-height: 600px;
}

.card-pop-up .q-card-section {
  padding: 20px;
}
</style>
