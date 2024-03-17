<template>
  <q-page padding>
    <q-table title="Tabela" :rows="posts" :columns="columns" row-key="name" />
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  name: 'IndexPage',
  setup() {
    const posts = ref([]);
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'Título', sortable: true, align: 'left' },
      { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' }
    ];

    onMounted(() => {
      getPosts();
    });

    const getPosts = async () => {
      try {
        const { data } = await api.get('posts');
        posts.value = data;
        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      posts,
      columns
    };
  }
};
</script>
