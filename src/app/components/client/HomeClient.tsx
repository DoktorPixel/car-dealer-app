'use client';
import { useState } from 'react';
import Link from 'next/link';
import { VehicleMake } from '@/app/types';

const HomeClient = ({
  makes,
  error
}: {
  makes: VehicleMake[];
  error: string;
}) => {
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const currentYear = new Date().getFullYear();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 max-w-md mx-auto">
      <h1 className="text-4xl font-bold uppercase text-center">
        Car Dealer App
      </h1>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Select a vehicle make and year to proceed
      </p>

      <div className="mt-6 w-full">
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-700"
        >
          Select Vehicle Make:
        </label>
        <select
          id="make"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 bg-white rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
        >
          <option value="">Choose a make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 w-full">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Select Model Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 bg-white rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
        >
          <option value="">Choose a year</option>
          {[...Array(currentYear - 2015 + 1)].map((_, i) => (
            <option key={i} value={currentYear - i}>
              {currentYear - i}
            </option>
          ))}
        </select>
      </div>

      <Link
        onClick={() => {
          setSelectedMake('');
          setSelectedYear('');
        }}
        href={`/result/${selectedMake}/${selectedYear}`}
        className={`mt-6 inline-block px-6 py-3 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition shadow-md ${
          !selectedMake || !selectedYear ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default HomeClient;
