'use client';

import { Suspense } from 'react';

const ResultClient = ({
  models,
  make,
  year,
  error
}: {
  models: any[];
  make: string;
  year: string;
  error: string;
}) => {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold">
          Vehicle Models for {make} - {year}
        </h1>
        <ul className="mt-4">
          {models.map((model) => (
            <li key={model.Model_ID} className="text-lg">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
};

export default ResultClient;
