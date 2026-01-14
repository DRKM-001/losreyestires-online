import type { Metadata } from 'next';
import Link from 'next/link';
import { Book, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Tire & Wheel Encyclopedia - Expert Knowledge Center',
  description: 'Your complete guide to tire and wheel components, terminology, and maintenance. Learn about tire construction, wheel anatomy, common issues, and expert repair advice from Los Reyes Tires.',
  keywords: 'tire encyclopedia, wheel terminology, tire anatomy, wheel components, tire maintenance guide, tire glossary, wheel glossary, automotive tires',
};

interface EncyclopediaTerm {
  name: string;
  slug: string;
  description: string;
}

interface EncyclopediaCategory {
  title: string;
  description: string;
  terms: EncyclopediaTerm[];
}

const encyclopediaData: EncyclopediaCategory[] = [
  {
    title: 'Tire Construction & Anatomy',
    description: 'Understanding the components that make up modern tires',
    terms: [
      { name: 'Bead', slug: 'bead', description: 'The inner edge of the tire that sits on the wheel rim, made of high-strength steel wire' },
      { name: 'Sidewall', slug: 'sidewall', description: 'The side portion of the tire between the tread and bead, displaying size and rating information' },
      { name: 'Tread', slug: 'tread', description: 'The outer rubber surface that contacts the road, designed with patterns for traction' },
      { name: 'Tread Depth', slug: 'tread-depth', description: 'The vertical measurement from the top of the tread to the bottom of the tire\'s deepest grooves' },
      { name: 'Shoulder', slug: 'shoulder', description: 'The outer edges of the tread that connect to the sidewall' },
      { name: 'Grooves', slug: 'grooves', description: 'Deep channels in the tread that help evacuate water and improve traction' },
      { name: 'Sipes', slug: 'sipes', description: 'Small slits in the tread blocks that improve traction, especially in wet or icy conditions' },
      { name: 'Belt', slug: 'belt', description: 'Steel or fabric layers under the tread that provide strength and stability' },
      { name: 'Carcass', slug: 'carcass', description: 'The tire\'s structural body made of fabric cord layers called plies' },
      { name: 'Inner Liner', slug: 'inner-liner', description: 'Airtight rubber layer that prevents air from escaping the tire' },
      { name: 'Tread Block', slug: 'tread-block', description: 'Individual rubber segments in the tread pattern separated by grooves' },
      { name: 'Tread Wear Indicator', slug: 'tread-wear-indicator', description: 'Raised bars in the grooves that indicate when tires need replacement (2/32" remaining)' },
    ],
  },
  {
    title: 'Tire Types & Categories',
    description: 'Different tire designs for various driving conditions and vehicles',
    terms: [
      { name: 'All-Season Tire', slug: 'all-season', description: 'Versatile tires designed for year-round use in moderate climates with balanced performance' },
      { name: 'Summer Tire', slug: 'summer', description: 'Performance tires optimized for warm weather with superior dry and wet traction' },
      { name: 'Winter Tire', slug: 'winter', description: 'Specialized tires with soft rubber compounds and deep treads for snow and ice' },
      { name: 'All-Terrain Tire (A/T)', slug: 'all-terrain', description: 'Truck/SUV tires designed for both on-road and off-road driving with aggressive tread' },
      { name: 'Mud-Terrain Tire (M/T)', slug: 'mud-terrain', description: 'Heavy-duty off-road tires with large tread blocks for extreme terrain and mud' },
      { name: 'Performance Tire', slug: 'performance', description: 'High-speed rated tires for sports cars with enhanced handling and cornering' },
      { name: 'Touring Tire', slug: 'touring', description: 'Passenger tires focused on comfort, quiet ride, and long tread life' },
      { name: 'Run-Flat Tire', slug: 'run-flat', description: 'Tires with reinforced sidewalls that can be driven on when deflated for limited distance' },
      { name: 'Low Profile Tire', slug: 'low-profile', description: 'Tires with short sidewalls and wide treads for improved handling and appearance' },
      { name: 'Highway Tire', slug: 'highway', description: 'Truck/SUV tires designed primarily for paved road use with focus on comfort' },
    ],
  },
  {
    title: 'Tire Specifications & Ratings',
    description: 'Understanding tire size, speed ratings, and performance indicators',
    terms: [
      { name: 'Tire Size', slug: 'tire-size', description: 'Alphanumeric code indicating width, aspect ratio, construction type, and diameter (e.g., 265/70R17)' },
      { name: 'Aspect Ratio', slug: 'aspect-ratio', description: 'The ratio of tire height to width, expressed as a percentage in the size designation' },
      { name: 'Load Index', slug: 'load-index', description: 'Numerical code indicating the maximum weight a tire can safely carry' },
      { name: 'Speed Rating', slug: 'speed-rating', description: 'Letter code indicating the maximum speed a tire can safely maintain (e.g., H=130mph, V=149mph)' },
      { name: 'UTQG Rating', slug: 'utqg', description: 'Uniform Tire Quality Grade rating for treadwear, traction, and temperature resistance' },
      { name: 'Treadwear Rating', slug: 'treadwear', description: 'UTQG number indicating expected tire life (higher numbers = longer lasting)' },
      { name: 'DOT Number', slug: 'dot-number', description: 'Department of Transportation code including manufacturing date and plant location' },
      { name: 'Ply Rating', slug: 'ply-rating', description: 'Indicates tire strength and load capacity, especially important for truck tires' },
      { name: 'Max Inflation Pressure', slug: 'max-inflation', description: 'Maximum air pressure (PSI) a tire can safely hold, marked on sidewall' },
      { name: 'Load Range', slug: 'load-range', description: 'Letter designation (C, D, E, etc.) indicating tire\'s load-carrying capacity' },
    ],
  },
  {
    title: 'Wheel Components',
    description: 'Parts and features of automotive wheels and rims',
    terms: [
      { name: 'Wheel Rim', slug: 'wheel-rim', description: 'The outer edge of the wheel where the tire bead seats' },
      { name: 'Wheel Diameter', slug: 'wheel-diameter', description: 'The size of the wheel measured from bead seat to bead seat (e.g., 17", 20")' },
      { name: 'Wheel Width', slug: 'wheel-width', description: 'The distance between the inner and outer bead seats' },
      { name: 'Offset', slug: 'offset', description: 'Distance from the wheel\'s mounting surface to its centerline (positive, negative, or zero)' },
      { name: 'Backspacing', slug: 'backspacing', description: 'Distance from the mounting surface to the inner edge of the wheel' },
      { name: 'Bolt Pattern (PCD)', slug: 'bolt-pattern', description: 'Number of lug holes and diameter of the circle they form (e.g., 5x114.3)' },
      { name: 'Center Bore', slug: 'center-bore', description: 'The diameter of the center hole that fits over the vehicle\'s hub' },
      { name: 'Hub-Centric', slug: 'hub-centric', description: 'Wheels designed to fit snugly on the vehicle hub for proper centering' },
      { name: 'Lug-Centric', slug: 'lug-centric', description: 'Wheels centered by lug nuts rather than the hub' },
      { name: 'Valve Stem', slug: 'valve-stem', description: 'The inflation valve where air is added or released from the tire' },
      { name: 'Bead Lock', slug: 'bead-lock', description: 'Off-road wheel feature that mechanically clamps the tire bead to prevent separation' },
    ],
  },
  {
    title: 'Wheel Finishes & Materials',
    description: 'Types of wheel coatings, materials, and appearance options',
    terms: [
      { name: 'Alloy Wheel', slug: 'alloy-wheel', description: 'Wheels made from aluminum or magnesium alloys, lighter and stronger than steel' },
      { name: 'Steel Wheel', slug: 'steel-wheel', description: 'Traditional wheels made from stamped steel, durable and economical' },
      { name: 'Forged Wheel', slug: 'forged-wheel', description: 'Wheels made by forging aluminum under high pressure for maximum strength and light weight' },
      { name: 'Cast Wheel', slug: 'cast-wheel', description: 'Wheels made by pouring molten aluminum into molds, most common manufacturing method' },
      { name: 'Chrome Plating', slug: 'chrome', description: 'Shiny metallic finish applied through electroplating for mirror-like appearance' },
      { name: 'Powder Coating', slug: 'powder-coating', description: 'Durable finish applied as dry powder then baked on, available in many colors' },
      { name: 'Painted Finish', slug: 'painted', description: 'Liquid paint finish, often with clear coat protection' },
      { name: 'Machined Finish', slug: 'machined', description: 'Finish created by cutting the wheel face with a lathe for bright metal appearance' },
      { name: 'Matte Black', slug: 'matte-black', description: 'Non-reflective black finish popular for aggressive, modern look' },
      { name: 'Polished Finish', slug: 'polished', description: 'Mirror-like aluminum finish achieved through mechanical polishing' },
      { name: 'Hyper Silver', slug: 'hyper-silver', description: 'Dark silver metallic finish with hints of charcoal' },
    ],
  },
  {
    title: 'Tire Maintenance & Service',
    description: 'Essential tire care procedures and services',
    terms: [
      { name: 'Tire Rotation', slug: 'rotation', description: 'Moving tires to different positions on vehicle to ensure even wear' },
      { name: 'Wheel Balancing', slug: 'balancing', description: 'Adding weights to wheels to eliminate vibration caused by uneven weight distribution' },
      { name: 'Wheel Alignment', slug: 'alignment', description: 'Adjusting suspension angles to ensure proper tire contact with road' },
      { name: 'Tire Pressure', slug: 'tire-pressure', description: 'Amount of air in tire measured in PSI, critical for safety and performance' },
      { name: 'TPMS', slug: 'tpms', description: 'Tire Pressure Monitoring System that alerts driver to low tire pressure' },
      { name: 'TPMS Sensor', slug: 'tpms-sensor', description: 'Electronic sensor inside tire that monitors air pressure and temperature' },
      { name: 'Tire Mounting', slug: 'mounting', description: 'Installing a tire onto a wheel using specialized equipment' },
      { name: 'Tire Dismounting', slug: 'dismounting', description: 'Removing a tire from a wheel' },
      { name: 'Bead Seating', slug: 'bead-seating', description: 'Process of inflating tire to properly seat the bead against the rim' },
      { name: 'Tire Patch', slug: 'tire-patch', description: 'Internal repair of punctured tire using plug and patch combination' },
      { name: 'Tire Plug', slug: 'tire-plug', description: 'Temporary external repair of small puncture in tire tread' },
      { name: 'Nitrogen Fill', slug: 'nitrogen-fill', description: 'Inflating tires with nitrogen gas instead of air for improved pressure retention' },
    ],
  },
  {
    title: 'Tire Problems & Wear Patterns',
    description: 'Common tire issues, symptoms, and their causes',
    terms: [
      { name: 'Cupping', slug: 'cupping', description: 'Scalloped wear pattern caused by worn suspension, imbalance, or misalignment' },
      { name: 'Feathering', slug: 'feathering', description: 'Wear where tread ribs are smooth on one side and sharp on the other, indicates alignment issues' },
      { name: 'Center Wear', slug: 'center-wear', description: 'Excessive wear in center of tread caused by over-inflation' },
      { name: 'Edge Wear', slug: 'edge-wear', description: 'Excessive wear on outer edges caused by under-inflation or aggressive cornering' },
      { name: 'Camber Wear', slug: 'camber-wear', description: 'One-sided wear caused by improper camber alignment angle' },
      { name: 'Toe Wear', slug: 'toe-wear', description: 'Rapid wear on inner or outer edges caused by incorrect toe alignment' },
      { name: 'Flat Spot', slug: 'flat-spot', description: 'Worn flat area on tire caused by hard braking or skidding' },
      { name: 'Bubbles/Bulges', slug: 'bubbles', description: 'Bulge in sidewall caused by impact damage to internal structure' },
      { name: 'Dry Rot', slug: 'dry-rot', description: 'Cracking in rubber caused by age, UV exposure, and lack of use' },
      { name: 'Puncture', slug: 'puncture', description: 'Hole in tire caused by nail, screw, or sharp object' },
      { name: 'Blowout', slug: 'blowout', description: 'Sudden loss of air pressure due to tire failure, often catastrophic' },
      { name: 'Slow Leak', slug: 'slow-leak', description: 'Gradual air loss requiring frequent inflation, often from small puncture or valve issue' },
    ],
  },
  {
    title: 'Performance & Specialty',
    description: 'Advanced tire and wheel concepts for performance applications',
    terms: [
      { name: 'Staggered Fitment', slug: 'staggered', description: 'Using wider wheels/tires on rear axle than front for improved traction' },
      { name: 'Plus Sizing', slug: 'plus-sizing', description: 'Installing larger diameter wheels with lower profile tires while maintaining overall diameter' },
      { name: 'Tire Compound', slug: 'compound', description: 'Rubber formula affecting grip, wear, and temperature performance' },
      { name: 'Tread Pattern', slug: 'tread-pattern', description: 'Design of grooves and blocks optimized for specific conditions (symmetric, asymmetric, directional)' },
      { name: 'Directional Tread', slug: 'directional', description: 'Tread pattern designed to rotate in one direction only for optimal water evacuation' },
      { name: 'Asymmetric Tread', slug: 'asymmetric', description: 'Different tread patterns on inside and outside for varied performance characteristics' },
      { name: 'Hydroplaning', slug: 'hydroplaning', description: 'Loss of traction when water separates tire from road surface' },
      { name: 'Contact Patch', slug: 'contact-patch', description: 'The area of tire actually touching the road at any given moment' },
      { name: 'Sidewall Height', slug: 'sidewall-height', description: 'Vertical height of tire sidewall, affects ride comfort and handling' },
      { name: 'Wheel Spacer', slug: 'wheel-spacer', description: 'Device installed between wheel and hub to push wheel outward for wider stance' },
      { name: 'Tire Shaving', slug: 'tire-shaving', description: 'Machining tread to reduce depth for racing or AWD applications' },
    ],
  },
];

export default function EncyclopediaPage() {
  const totalTerms = encyclopediaData.reduce((sum, category) => sum + category.terms.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Book className="h-10 w-10 text-red-500" />
              <h1 className="text-4xl md:text-5xl font-bold">Tire & Wheel Encyclopedia</h1>
            </div>
            <p className="text-xl text-zinc-300 mb-8">
              Your complete guide to understanding tires and wheels. Get expert knowledge about components, 
              maintenance, and common issues from the professionals at Los Reyes Tires.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-500">{encyclopediaData.length}</span>
                <span>Categories</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-500" />
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-500">{totalTerms}</span>
                <span>Terms Defined</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search tire and wheel terms..."
              className="pl-12 h-14 text-lg border-zinc-300 focus:border-red-600 focus:ring-red-600"
            />
          </div>
        </div>
      </section>

      {/* Encyclopedia Categories */}
      <section className="container py-12">
        <div className="space-y-16">
          {encyclopediaData.map((category) => (
            <div key={category.title} className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">{category.title}</h2>
                <p className="text-zinc-600 text-lg">{category.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.terms.map((term) => (
                  <div
                    key={term.slug}
                    className="p-5 bg-white border border-zinc-200 rounded-lg"
                  >
                    <h3 className="font-bold text-zinc-900 mb-2">
                      {term.name}
                    </h3>
                    <p className="text-sm text-zinc-600">{term.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions About Your Tires or Wheels?</h2>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
            Our expert team at Los Reyes Tires is here to help. Family owned since 2005, serving San Diego with pride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-zinc-100 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:619-440-6098"
              className="inline-flex items-center justify-center gap-2 bg-red-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-900 transition-colors"
            >
              Call 619-440-6098
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
