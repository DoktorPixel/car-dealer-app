import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Suspense } from 'react';

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

const ResultClient = () => {
  const router = useRouter();
  const { makeId, year } = router.query;
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (makeId && year) {
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
          );
          const data = await response.json();
          setModels(data.Results);
        } catch (error) {
          setError('Failed to fetch models');
        }
      };
      fetchModels();
    }
  }, [makeId, year]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Vehicle Models for {year}</h1>
      <Suspense fallback={<p>Loading models...</p>}>
        <ul className="mt-4">
          {models.map((model) => (
            <li key={model.Model_ID} className="text-lg">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default ResultClient;
