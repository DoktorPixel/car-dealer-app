'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

const HomeClient = () => {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchMakes = async () => {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const data = await response.json();
      setMakes(data.Results);
    };
    fetchMakes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold uppercase">Car dealer app</h1>

      <div className="mt-6">
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
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Choose a make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
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
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        href={`/result/${selectedMake}/${selectedYear}`}
        className={`mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded ${
          !selectedMake || !selectedYear ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default HomeClient;
