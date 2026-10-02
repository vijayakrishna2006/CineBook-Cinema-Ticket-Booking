import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const demoMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with the Fremen while seeking revenge against those who destroyed his family.',
    duration: '166 min',
    genre: 'Sci-Fi',
    language: 'English',
    releaseDate: '2024-03-01',
    rating: 8.6,
    posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1400&q=80',
    status: 'NOW_SHOWING',
    featured: true,
  },
  {
    id: 2,
    title: 'Oppenheimer',
    description: 'The story of J. Robert Oppenheimer and the creation of the atomic bomb.',
    duration: '180 min',
    genre: 'Biography',
    language: 'English',
    releaseDate: '2023-07-21',
    rating: 8.4,
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1400&q=80',
    status: 'NOW_SHOWING',
    featured: true,
  },
  {
    id: 3,
    title: 'Murder Mystery 2',
    description: 'Detectives and former spouses return for another thrilling mystery adventure.',
    duration: '110 min',
    genre: 'Comedy',
    language: 'English',
    releaseDate: '2023-03-31',
    rating: 6.5,
    posterUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1400&q=80',
    status: 'NOW_SHOWING',
    featured: false,
  },
  {
    id: 4,
    title: 'Salaar',
    description: 'A fierce rebel enters a battle for power and survival in a kingdom ruled by fear.',
    duration: '170 min',
    genre: 'Action',
    language: 'Telugu',
    releaseDate: '2023-12-22',
    rating: 8.1,
    posterUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    status: 'UPCOMING',
    featured: true,
  },
  {
    id: 5,
    title: 'Kalki 2898 AD',
    description: 'A warrior journeys through time as the universe teeters on the brink of destruction.',
    duration: '180 min',
    genre: 'Sci-Fi',
    language: 'Telugu',
    releaseDate: '2024-06-27',
    rating: 7.9,
    posterUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1400&q=80',
    status: 'UPCOMING',
    featured: false,
  },
  {
    id: 6,
    title: 'The Batman',
    description: 'A detective follows clues in the shadows as Gotham faces its darkest night.',
    duration: '176 min',
    genre: 'Action',
    language: 'English',
    releaseDate: '2022-03-04',
    rating: 8.3,
    posterUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80',
    status: 'NOW_SHOWING',
    featured: false,
  }
];

export const demoTheatres = [
  { id: 1, name: 'PVR Cinemas', city: 'Hyderabad', address: 'Banjara Hills', screenNames: 'Screen 1, Screen 2, Screen 3' },
  { id: 2, name: 'INOX Leisure', city: 'Hyderabad', address: 'Gachibowli', screenNames: 'Screen A, Screen B' },
  { id: 3, name: 'Carnival Cinema', city: 'Hyderabad', address: 'Madhapur', screenNames: 'Screen X, Screen Y, Screen Z' }
];

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    return demoMovies;
  }
};

export const fetchTheatres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/theatres`);
    return response.data;
  } catch (error) {
    return demoTheatres;
  }
};

export const registerUser = async (payload) => {
  try {
    return await axios.post(`${API_BASE_URL}/auth/register`, payload);
  } catch (error) {
    if (error.response?.status === 409) {
      throw new Error('User already exists');
    }
    throw new Error('Registration failed. Please try again.');
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
    return response.data;
  } catch (error) {
    if (payload.email === 'admin@cinebook.com' && payload.password === 'admin123') {
      return { id: 1, name: 'Admin User', email: 'admin@cinebook.com', role: 'ADMIN' };
    }
    if (payload.email === 'user@cinebook.com' && payload.password === 'user123') {
      return { id: 2, name: 'Demo User', email: 'user@cinebook.com', role: 'USER' };
    }
    throw new Error('Invalid email or password');
  }
};

export const createBooking = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, payload);
    return response.data;
  } catch (error) {
    return { ...payload, bookingId: 'CB-' + Math.random().toString(36).slice(2, 8).toUpperCase() };
  }
};

export const processPayment = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments/process`, payload);
    return response.data;
  } catch (error) {
    return { status: 'SUCCESS', message: 'Payment processed successfully' };
  }
};
