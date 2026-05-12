import { DUMMY_MODELS } from "./_dummy";

const useGetModel = (uid) => {
  const model = DUMMY_MODELS.find((m) => m.uid === uid) ?? DUMMY_MODELS[0];
  return { model, loading: false, error: null, refetch: () => {} };
};

export default useGetModel;
