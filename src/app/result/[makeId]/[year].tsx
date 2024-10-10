import {
  fetchVehicleMakes,
  fetchVehicleModels
} from '@/app/services/vehicleService';
import ResultClient from '@/app/components/client/ResultClient';
import { VehicleMake, VehicleModel } from '@/app/types';

export const generateStaticParams = async () => {
  const makes: VehicleMake[] = await fetchVehicleMakes();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const paths = makes.flatMap((make: VehicleMake) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString()
    }))
  );

  console.log('Generated paths:', paths);

  return paths;
};

export const getStaticPaths = async () => {
  const paths = await generateStaticParams();
  console.log('Paths for static generation:', paths);
  return {
    paths: paths.map(({ makeId, year }) => ({
      params: { makeId, year }
    })),
    fallback: true
  };
};

export const getStaticProps = async ({
  params
}: {
  params: { makeId: string; year: string };
}) => {
  const { makeId, year } = params;

  console.log('Received parameters:', { makeId, year });
  try {
    const [models, makes] = await Promise.all([
      fetchVehicleModels(makeId, year),
      fetchVehicleMakes()
    ]);

    const make =
      makes.find((m: VehicleMake) => m.MakeId.toString() === makeId)
        ?.MakeName || '';

    return {
      props: {
        models,
        make,
        year
      }
    };
  } catch (error) {
    console.error('Error fetching models:', error);
    return {
      props: {
        models: [],
        make: '',
        year: '',
        error: 'Failed to fetch vehicle models'
      }
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
  console.log('Received models:', models);
  return <ResultClient models={models} make={make} year={year} error={error} />;
}
