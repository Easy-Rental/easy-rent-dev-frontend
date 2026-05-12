import { DUMMY_VEHICLES } from "./_dummy";

const useGetVehicle = (uid) => {
  const vehicle = DUMMY_VEHICLES.find((v) => v.uid === uid) ?? DUMMY_VEHICLES[0];
  return { vehicle, loading: false, error: null, refetch: () => {} };
};

export default useGetVehicle;
