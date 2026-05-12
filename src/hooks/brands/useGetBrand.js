import { DUMMY_BRANDS } from "./_dummy";

const useGetBrand = (uid) => {
  const brand = DUMMY_BRANDS.find((b) => b.uid === uid) ?? DUMMY_BRANDS[0];
  return { brand, loading: false, error: null, refetch: () => {} };
};

export default useGetBrand;
