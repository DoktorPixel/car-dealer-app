export const fetchVehicleMakes = async () => {
  const response = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes');
  }
  const data = await response.json();
  return data.Results;
};

export const fetchVehicleModels = async (makeId: string, year: string) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle models');
  }
  const data = await response.json();
  return data.Results;
};
