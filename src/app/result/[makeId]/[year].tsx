import {
  fetchVehicleMakes,
  fetchVehicleModels
} from '@/app/services/vehicleService';
import ResultClient from '@/app/components/client/ResultClient';

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

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
    const models = await fetchVehicleModels(makeId, year);
    return {
      props: {
        models
      }
    };
  } catch (error) {
    console.error('Error fetching models:', error);
    return {
      props: {
        models: [],
        error: 'Failed to fetch vehicle models'
      }
    };
  }
};

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

export default function ResultPage({
  models,
  error
}: {
  models: VehicleModel[];
  error: string;
}) {
  console.log('Received models:', models);
  return <ResultClient models={models} error={error} />;
}
