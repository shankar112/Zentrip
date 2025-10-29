// Mock data source for trips/packages
const TRIPS = [
  {id:'bali-escape', name:'Bali Calm Escape', location:'Bali, Indonesia', price:899, rating:4.8, duration:'5N/6D', tags:['beach','wellness'],
   hero:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
   blurb:'Sun-kissed shores, gentle breezes, and quiet temples.'},
  {id:'kyoto-retreat', name:'Kyoto Zen Retreat', location:'Kyoto, Japan', price:1190, rating:4.9, duration:'4N/5D', tags:['city','wellness'],
   hero:'https://images.unsplash.com/photo-1545569341-9eb8b30979d0?q=80&w=1600&auto=format&fit=crop',
   blurb:'Winding lanes, teahouses, and serene gardens.'},
  {id:'alps-chalet', name:'Alps Chalet Escape', location:'Swiss Alps', price:1299, rating:4.7, duration:'6N/7D', tags:['mountain'],
   hero:'https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1600&auto=format&fit=crop',
   blurb:'Crisp air, alpine meadows, and starlit nights.'},
  {id:'amalfi-breeze', name:'Amalfi Coast Breeze', location:'Amalfi, Italy', price:1380, rating:4.6, duration:'4N/5D', tags:['beach','city'],
   hero:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
   blurb:'Cliffside towns, citrus groves, and sea-sprayed sunsets.'},
  {id:'iceland-aurora', name:'Iceland Aurora Hunt', location:'Iceland', price:1499, rating:4.8, duration:'5N/6D', tags:['mountain'],
   hero:'https://images.unsplash.com/photo-1500043357865-c6b8827edfef?q=80&w=1600&auto=format&fit=crop',
   blurb:'Glaciers, geysers, and shimmering northern lights.'},
  {id:'ubud-wellness', name:'Ubud Wellness Week', location:'Ubud, Indonesia', price:990, rating:4.7, duration:'6N/7D', tags:['wellness','beach'],
   hero:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
   blurb:'Yoga, spa rituals, and wholesome cuisine.'},
  {id:'santorini-bliss', name:'Santorini Bliss', location:'Santorini, Greece', price:1250, rating:4.6, duration:'3N/4D', tags:['beach','city'],
   hero:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
   blurb:'Whitewashed domes, blue seas, and slow mornings.'}
];

const listTrips = () => TRIPS;
const getTrip = (id) => TRIPS.find(t => t.id === id);

export { listTrips, getTrip };

