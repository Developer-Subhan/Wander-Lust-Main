const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beach-Related",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259], // Malibu, CA
    },
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Hotel",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128], // NYC
    },
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Adventure",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911], // Aspen, CO
    },
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Resort",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7699], // Florence, Italy
    },
  },
  {
    title: "Seaside Restaurant Experience",
    description: "Dine by the ocean in this popular seaside restaurant. Fresh seafood and beautiful views included!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 500,
    location: "Santorini",
    country: "Greece",
    category: "Restaurant",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [25.4358, 36.3932], // Santorini, Greece
    },
  },
  {
    title: "Tropical Treehouse",
    description: "Stay high up in the trees in this eco-friendly treehouse. Great for adventurers seeking something unique.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1604004218771-05c55db4f9f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 800,
    location: "Bali",
    country: "Indonesia",
    category: "Adventure",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095], // Bali, Indonesia
    },
  },
  {
    title: "Desert Luxury Camp",
    description: "Spend nights under the stars in this luxurious desert glamping experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1677836157562-5e24481b6b69?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 1800,
    location: "Merzouga",
    country: "Morocco",
    category: "Resort",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [-3.9789, 31.1000], // Merzouga, Morocco
    },
  },
  {
    title: "Charming Countryside B&B",
    description: "Enjoy the peaceful countryside at this cozy bed and breakfast. Homemade meals and warm hospitality.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 700,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Other",
    owner: "68b1a8c2402a3a5a5e1e7641",
    geometry: {
      type: "Point",
      coordinates: [-1.8433, 51.8330], // Cotswolds, UK
    },
  },
];

module.exports = { data: sampleListings };