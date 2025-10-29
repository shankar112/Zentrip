// Mock data source for trips/packages
const TRIPS = [
  {id:'bali-escape', name:'Bali Calm Escape', location:'Bali, Indonesia', price:899, rating:4.8, duration:'5N/6D', tags:['beach','wellness'],
   hero:'https://picsum.photos/seed/bali-escape/1200/800',
   blurb:'Sun-kissed shores, gentle breezes, and quiet temples.'},
  {id:'kyoto-retreat', name:'Kyoto Zen Retreat', location:'Kyoto, Japan', price:1190, rating:4.9, duration:'4N/5D', tags:['city','wellness'],
   hero:'https://picsum.photos/seed/kyoto-retreat/1200/800',
   blurb:'Winding lanes, teahouses, and serene gardens.'},
  {id:'alps-chalet', name:'Alps Chalet Escape', location:'Swiss Alps', price:1299, rating:4.7, duration:'6N/7D', tags:['mountain'],
   hero:'https://picsum.photos/seed/alps-chalet/1200/800',
   blurb:'Crisp air, alpine meadows, and starlit nights.'},
  {id:'amalfi-breeze', name:'Amalfi Coast Breeze', location:'Amalfi, Italy', price:1380, rating:4.6, duration:'4N/5D', tags:['beach','city'],
   hero:'https://picsum.photos/seed/amalfi-breeze/1200/800',
   blurb:'Cliffside towns, citrus groves, and sea-sprayed sunsets.'},
  {id:'iceland-aurora', name:'Iceland Aurora Hunt', location:'Iceland', price:1499, rating:4.8, duration:'5N/6D', tags:['mountain'],
   hero:'https://picsum.photos/seed/iceland-aurora/1200/800',
   blurb:'Glaciers, geysers, and shimmering northern lights.'},
  {id:'ubud-wellness', name:'Ubud Wellness Week', location:'Ubud, Indonesia', price:990, rating:4.7, duration:'6N/7D', tags:['wellness','beach'],
   hero:'https://picsum.photos/seed/ubud-wellness/1200/800',
   blurb:'Yoga, spa rituals, and wholesome cuisine.'},
  {id:'santorini-bliss', name:'Santorini Bliss', location:'Santorini, Greece', price:1250, rating:4.6, duration:'3N/4D', tags:['beach','city'],
   hero:'https://picsum.photos/seed/santorini-bliss/1200/800',
   blurb:'Whitewashed domes, blue seas, and slow mornings.'}
];

const listTrips = () => TRIPS;
const getTrip = (id) => TRIPS.find(t => t.id === id);

export { listTrips, getTrip };
