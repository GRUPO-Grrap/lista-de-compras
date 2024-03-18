import useApi from 'src/consumables/useApi';

export default function postsService() {
  const { getAll, getById, create, updateById, deleteById } = useApi('posts');

  return {
    getAll,
    getById,
    create,
    updateById,
    deleteById
  };
}
