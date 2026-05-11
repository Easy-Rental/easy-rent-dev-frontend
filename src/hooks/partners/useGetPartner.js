import { DUMMY_PARTNERS } from "./_dummy";

const useGetPartner = (uid) => {
  const partner = DUMMY_PARTNERS.find((p) => p.uid === uid) ?? DUMMY_PARTNERS[0];
  return { user: partner, loading: false, error: null, refetch: () => {} };
};

export default useGetPartner;
