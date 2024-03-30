<template>
  <div>
    <q-btn icon="edit" color="info" dense size="sm" @click="editClick" v-if="editVisible" />
    <q-btn icon="delete" color="negative" dense size="sm" @click="deleteClick" />
  </div>
</template>

<script>
export default {
  props: {
    editVisible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    editClick() {
      this.$emit('edit-click');
    },
    deleteClick() {
      this.$emit('delete-click');
    }
  }
};
</script>
