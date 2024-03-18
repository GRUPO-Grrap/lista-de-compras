import { api } from 'src/boot/axios';

export default function useApi(url) {
  const getAll = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const create = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateById = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteById = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    getAll,
    create,
    updateById,
    deleteById
  };
}
