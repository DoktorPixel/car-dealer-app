import {
  fetchVehicleModels,
  fetchVehicleMakes
} from '@/app/services/vehicleService';
import ResultClient from '@/app/components/client/ResultClient';
import { VehicleMake } from '@/app/types';

export const generateStaticParams = async () => {
  const makes: VehicleMake[] = await fetchVehicleMakes();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString()
    }))
  );

  return paths;
};

const ResultPage = async ({
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

    return <ResultClient models={models} make={make} year={year} error="" />;
  } catch {
    return (
      <ResultClient
        models={[]}
        make=""
        year={year}
        error="Failed to fetch data"
      />
    );
  }
};

export default ResultPage;
