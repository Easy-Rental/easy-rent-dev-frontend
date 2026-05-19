import { DUMMY_MANAGERS } from "./_dummy";

const useGetManager = (uid) => {
  const manager = DUMMY_MANAGERS.find((m) => m.uid === uid) ?? DUMMY_MANAGERS[0];
  return { manager, loading: false, error: null, refetch: () => {} };
};

export default useGetManager;
