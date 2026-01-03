// TODO: Replace with API call to ERP backend for real-time vehicle fitment data
// This is sample data for the tire finder functionality

export interface VehicleFitment {
  year: number;
  make: string;
  model: string;
  trim?: string;
  tireSizes: string[]; // Primary tire size options for this vehicle
  rimSizes: string[]; // Wheel diameter options
}

// Sample vehicle fitment data - Popular vehicles in San Diego area
export const vehicleFitments: VehicleFitment[] = [
  // Toyota
  { year: 2024, make: 'Toyota', model: 'Camry', tireSizes: ['225/65R17', '235/45R18'], rimSizes: ['17', '18'] },
  { year: 2024, make: 'Toyota', model: 'Corolla', tireSizes: ['205/55R16', '225/40R18'], rimSizes: ['16', '18'] },
  { year: 2024, make: 'Toyota', model: 'RAV4', tireSizes: ['225/65R17', '225/60R18'], rimSizes: ['17', '18'] },
  { year: 2024, make: 'Toyota', model: 'Tacoma', tireSizes: ['LT265/70R17', 'LT265/65R18'], rimSizes: ['17', '18'] },
  { year: 2024, make: 'Toyota', model: 'Tundra', tireSizes: ['LT275/65R18', 'LT275/55R20'], rimSizes: ['18', '20'] },
  { year: 2024, make: 'Toyota', model: '4Runner', tireSizes: ['265/70R17', '265/65R18'], rimSizes: ['17', '18'] },
  
  { year: 2023, make: 'Toyota', model: 'Camry', tireSizes: ['225/65R17', '235/45R18'], rimSizes: ['17', '18'] },
  { year: 2023, make: 'Toyota', model: 'Corolla', tireSizes: ['205/55R16', '225/40R18'], rimSizes: ['16', '18'] },
  { year: 2023, make: 'Toyota', model: 'RAV4', tireSizes: ['225/65R17', '225/60R18'], rimSizes: ['17', '18'] },
  { year: 2023, make: 'Toyota', model: 'Tacoma', tireSizes: ['LT265/70R17', 'LT265/65R18'], rimSizes: ['17', '18'] },
  
  // Ford
  { year: 2024, make: 'Ford', model: 'F-150', tireSizes: ['LT275/65R18', 'LT275/55R20'], rimSizes: ['18', '20'] },
  { year: 2024, make: 'Ford', model: 'Mustang', tireSizes: ['235/55R17', '255/40R19'], rimSizes: ['17', '19'] },
  { year: 2024, make: 'Ford', model: 'Explorer', tireSizes: ['255/55R20', '255/50R21'], rimSizes: ['20', '21'] },
  { year: 2024, make: 'Ford', model: 'Bronco', tireSizes: ['255/70R18', 'LT315/70R17'], rimSizes: ['17', '18'] },
  
  { year: 2023, make: 'Ford', model: 'F-150', tireSizes: ['LT275/65R18', 'LT275/55R20'], rimSizes: ['18', '20'] },
  { year: 2023, make: 'Ford', model: 'Explorer', tireSizes: ['255/55R20', '255/50R21'], rimSizes: ['20', '21'] },
  
  // Honda
  { year: 2024, make: 'Honda', model: 'Civic', tireSizes: ['215/55R16', '235/40R18'], rimSizes: ['16', '18'] },
  { year: 2024, make: 'Honda', model: 'Accord', tireSizes: ['225/50R17', '235/40R19'], rimSizes: ['17', '19'] },
  { year: 2024, make: 'Honda', model: 'CR-V', tireSizes: ['235/60R18', '235/55R19'], rimSizes: ['18', '19'] },
  { year: 2024, make: 'Honda', model: 'Pilot', tireSizes: ['245/60R18', '255/50R20'], rimSizes: ['18', '20'] },
  
  { year: 2023, make: 'Honda', model: 'Civic', tireSizes: ['215/55R16', '235/40R18'], rimSizes: ['16', '18'] },
  { year: 2023, make: 'Honda', model: 'Accord', tireSizes: ['225/50R17', '235/40R19'], rimSizes: ['17', '19'] },
  { year: 2023, make: 'Honda', model: 'CR-V', tireSizes: ['235/60R18', '235/55R19'], rimSizes: ['18', '19'] },
  
  // Chevrolet
  { year: 2024, make: 'Chevrolet', model: 'Silverado', tireSizes: ['LT275/65R18', 'LT275/60R20'], rimSizes: ['18', '20'] },
  { year: 2024, make: 'Chevrolet', model: 'Tahoe', tireSizes: ['275/60R20', '275/50R22'], rimSizes: ['20', '22'] },
  { year: 2024, make: 'Chevrolet', model: 'Malibu', tireSizes: ['225/55R17', '245/40R19'], rimSizes: ['17', '19'] },
  { year: 2024, make: 'Chevrolet', model: 'Colorado', tireSizes: ['LT265/65R17', 'LT265/60R18'], rimSizes: ['17', '18'] },
  
  { year: 2023, make: 'Chevrolet', model: 'Silverado', tireSizes: ['LT275/65R18', 'LT275/60R20'], rimSizes: ['18', '20'] },
  { year: 2023, make: 'Chevrolet', model: 'Tahoe', tireSizes: ['275/60R20', '275/50R22'], rimSizes: ['20', '22'] },
  
  // Nissan
  { year: 2024, make: 'Nissan', model: 'Altima', tireSizes: ['215/60R16', '235/40R19'], rimSizes: ['16', '19'] },
  { year: 2024, make: 'Nissan', model: 'Rogue', tireSizes: ['225/65R17', '225/55R19'], rimSizes: ['17', '19'] },
  { year: 2024, make: 'Nissan', model: 'Frontier', tireSizes: ['LT265/70R17', 'LT265/65R18'], rimSizes: ['17', '18'] },
  { year: 2024, make: 'Nissan', model: 'Pathfinder', tireSizes: ['255/60R18', '255/55R20'], rimSizes: ['18', '20'] },
  
  { year: 2023, make: 'Nissan', model: 'Altima', tireSizes: ['215/60R16', '235/40R19'], rimSizes: ['16', '19'] },
  { year: 2023, make: 'Nissan', model: 'Rogue', tireSizes: ['225/65R17', '225/55R19'], rimSizes: ['17', '19'] },
  
  // Jeep (popular in San Diego/off-road)
  { year: 2024, make: 'Jeep', model: 'Wrangler', tireSizes: ['255/70R18', 'LT285/70R17'], rimSizes: ['17', '18'] },
  { year: 2024, make: 'Jeep', model: 'Grand Cherokee', tireSizes: ['265/60R18', '265/50R20'], rimSizes: ['18', '20'] },
  { year: 2024, make: 'Jeep', model: 'Gladiator', tireSizes: ['LT285/70R17', 'LT275/65R18'], rimSizes: ['17', '18'] },
  
  { year: 2023, make: 'Jeep', model: 'Wrangler', tireSizes: ['255/70R18', 'LT285/70R17'], rimSizes: ['17', '18'] },
  { year: 2023, make: 'Jeep', model: 'Grand Cherokee', tireSizes: ['265/60R18', '265/50R20'], rimSizes: ['18', '20'] },
  
  // Ram (popular trucks)
  { year: 2024, make: 'Ram', model: '1500', tireSizes: ['LT275/65R18', 'LT275/55R20'], rimSizes: ['18', '20'] },
  { year: 2024, make: 'Ram', model: '2500', tireSizes: ['LT285/70R17', 'LT275/65R20'], rimSizes: ['17', '20'] },
  
  { year: 2023, make: 'Ram', model: '1500', tireSizes: ['LT275/65R18', 'LT275/55R20'], rimSizes: ['18', '20'] },
  
  // 2022 models (add more coverage)
  { year: 2022, make: 'Toyota', model: 'Camry', tireSizes: ['225/65R17', '235/45R18'], rimSizes: ['17', '18'] },
  { year: 2022, make: 'Toyota', model: 'RAV4', tireSizes: ['225/65R17', '225/60R18'], rimSizes: ['17', '18'] },
  { year: 2022, make: 'Toyota', model: 'Tacoma', tireSizes: ['LT265/70R17', 'LT265/65R18'], rimSizes: ['17', '18'] },
  { year: 2022, make: 'Ford', model: 'F-150', tireSizes: ['LT275/65R18', 'LT275/55R20'], rimSizes: ['18', '20'] },
  { year: 2022, make: 'Honda', model: 'Civic', tireSizes: ['215/55R16', '235/40R18'], rimSizes: ['16', '18'] },
  { year: 2022, make: 'Honda', model: 'CR-V', tireSizes: ['235/60R18', '235/55R19'], rimSizes: ['18', '19'] },
  { year: 2022, make: 'Chevrolet', model: 'Silverado', tireSizes: ['LT275/65R18', 'LT275/60R20'], rimSizes: ['18', '20'] },
  { year: 2022, make: 'Nissan', model: 'Rogue', tireSizes: ['225/65R17', '225/55R19'], rimSizes: ['17', '19'] },
  { year: 2022, make: 'Jeep', model: 'Wrangler', tireSizes: ['255/70R18', 'LT285/70R17'], rimSizes: ['17', '18'] },
];

// Helper functions for the tire finder
export function getAvailableYears(): number[] {
  const years = Array.from(new Set(vehicleFitments.map(v => v.year)));
  return years.sort((a, b) => b - a); // Descending order
}

export function getAvailableMakes(year?: number): string[] {
  let filtered = vehicleFitments;
  if (year) {
    filtered = filtered.filter(v => v.year === year);
  }
  const makes = Array.from(new Set(filtered.map(v => v.make)));
  return makes.sort();
}

export function getAvailableModels(year?: number, make?: string): string[] {
  let filtered = vehicleFitments;
  if (year) {
    filtered = filtered.filter(v => v.year === year);
  }
  if (make) {
    filtered = filtered.filter(v => v.make === make);
  }
  const models = Array.from(new Set(filtered.map(v => v.model)));
  return models.sort();
}

export function getTireSizesForVehicle(year: number, make: string, model: string): string[] {
  const vehicle = vehicleFitments.find(
    v => v.year === year && v.make === make && v.model === model
  );
  return vehicle?.tireSizes || [];
}

export function getRimSizesForVehicle(year: number, make: string, model: string): string[] {
  const vehicle = vehicleFitments.find(
    v => v.year === year && v.make === make && v.model === model
  );
  return vehicle?.rimSizes || [];
}
