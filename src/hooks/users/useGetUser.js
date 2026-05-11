import { DUMMY_USERS } from "./_dummy";

const useGetUser = (uid) => {
  const user = DUMMY_USERS.find((u) => u.uid === uid) ?? DUMMY_USERS[0];
  return { user, loading: false, error: null, refetch: () => {} };
};

export default useGetUser;
