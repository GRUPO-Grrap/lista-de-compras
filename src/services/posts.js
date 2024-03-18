import useApi from 'src/consumables/useApi';

export default function postsService() {
  const { getAll, create, updateById, deleteById } = useApi('posts');

  return {
    getAll,
    create,
    updateById,
    deleteById
  };
}
