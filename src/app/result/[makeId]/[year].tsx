import {
  fetchVehicleModels,
  fetchVehicleMakes
} from '@/app/services/vehicleService';
import ResultClient from '@/app/components/client/ResultClient';
import { VehicleMake, VehicleModel } from '@/app/types';

export const getStaticPaths = async () => {
  const makes: VehicleMake[] = await fetchVehicleMakes();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      params: { makeId: make.MakeId.toString(), year: year.toString() }
    }))
  );

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({
  params
}: {
  params: { makeId: string; year: string };
}) => {
  const { makeId, year } = params;

  try {
    const [models, makes] = await Promise.all([
      fetchVehicleModels(makeId, year),
      fetchVehicleMakes()
    ]);
    const make =
      makes.find((m: VehicleMake) => m.MakeId.toString() === makeId)
        ?.MakeName || '';

    return {
      props: { models, make, year, error: '' }
    };
  } catch {
    return {
      props: { models: [], make: '', year }
    };
  }
};

export default function ResultPage({
  models,
  make,
  year,
  error
}: {
  models: VehicleModel[];
  make: string;
  year: string;
  error: string;
}) {
  return <ResultClient models={models} make={make} year={year} error={error} />;
}
