import { fetchVehicleMakes } from './services/vehicleService';
import HomeClient from './components/client/HomeClient';

export default async function HomePage() {
  try {
    const makes = await fetchVehicleMakes();
    return <HomeClient makes={makes} error="" />;
  } catch {
    return <HomeClient makes={[]} error="Failed to fetch vehicle makes" />;
  }
}
