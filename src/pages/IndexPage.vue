<template>
  <q-page padding>
    <q-table title="Lista de Compras" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Lista de Compras</span>
        <q-space />
        <q-btn color="blue" label="Adicionar" :to="{ name: 'formPost' }" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)" />
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
    const { getAll, deleteById } = postsService();
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'name', field: 'name', label: 'Nome do Item', sortable: true, align: 'left' },
      { name: 'quantity', field: 'quantity', label: 'Quantidade', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ];

    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      getPosts();
    });

    const getPosts = async () => {
      try {
        const data = await getAll();
        posts.value = data;
        // console.log(data);
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
          // window.location.reload();
        });
        await getPosts();
      } catch (error) {
        $q.notify({ message: 'Erro ao remover!', icon: 'times', color: 'negative' });
      }
    };

    const handleEditPost = (id) => {
      router.push({ name: 'formPost', params: { id } });
    };

    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost
    };
  }
};
</script>
