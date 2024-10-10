'use client';

import { useState, useEffect } from 'react';
import { VehicleModel } from '@/app/types';
import { Suspense } from 'react';
import Link from 'next/link';

const ResultClient = ({
  models,
  make,
  year,
  error
}: {
  models: VehicleModel[];
  make: string;
  year: string;
  error: string;
}) => {
  const [search, setSearch] = useState('');
  const [uniqueModels, setUniqueModels] = useState<VehicleModel[]>([]);

  useEffect(() => {
    const filteredUniqueModels = Array.from(
      new Set(models.map((model) => model.Model_Name))
    ).map(
      (modelName) => models.find((model) => model.Model_Name === modelName)!
    );

    setUniqueModels(filteredUniqueModels);
  }, [models]);

  const filteredModels = uniqueModels.filter((model) =>
    model.Model_Name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen py-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Vehicle Models for {make} - {year}
          </h1>
          <p className="text-gray-600">Total models: {filteredModels.length}</p>

          <input
            type="text"
            placeholder="Search Models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 p-2 border rounded-lg w-full"
          />

          <ul className="mt-4">
            {filteredModels.length === 0 ? (
              <p>
                No models found for {make} - {year}
              </p>
            ) : (
              filteredModels.map((model) => (
                <li key={model.Model_ID} className="text-lg border-b py-2">
                  {model.Model_Name}
                </li>
              ))
            )}
          </ul>

          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mx-auto block">
              Back to filter
            </button>
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default ResultClient;
