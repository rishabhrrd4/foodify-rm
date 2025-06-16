import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Define TypeScript interface for restaurant
type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  image: string;
  featured?: boolean;
  discount?: string;
  proOnly?: boolean;
  veg?: boolean;
};

// Mock restaurant data (replace with API call in production)
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "30-40 min",
    minOrder: 199,
    image: "/api/placeholder/800/400",
    featured: true,
    discount: "50% OFF up to ₹100",
    veg: true,
  },
  {
    id: "2",
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.2,
    deliveryTime: "25-35 min",
    minOrder: 149,
    image: "/api/placeholder/800/400",
    discount: "FREE DELIVERY",
  },
  {
    id: "3",
    name: "Burger Boulevard",
    cuisine: "American",
    rating: 4.0,
    deliveryTime: "20-30 min",
    minOrder: 99,
    image: "/api/placeholder/800/400",
    proOnly: true,
  },
  {
    id: "4",
    name: "Sushi Station",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "35-45 min",
    minOrder: 249,
    image: "/api/placeholder/800/400",
    featured: true,
    discount: "20% OFF up to ₹120",
  },
  {
    id: "5",
    name: "Taco Town",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "25-35 min",
    minOrder: 149,
    image: "/api/placeholder/800/400",
    discount: "Buy 1 Get 1 Free",
  },
  {
    id: "6",
    name: "Noodle House",
    cuisine: "Chinese",
    rating: 4.1,
    deliveryTime: "30-40 min",
    minOrder: 199,
    image: "/api/placeholder/800/400",
    veg: true,
  },
];

// Mock API fetch function
const fetchRestaurants = async (): Promise<Restaurant[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockRestaurants;
};

// Restaurant card component - Zomato style
const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="block rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {restaurant.featured && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            Trending
          </div>
        )}
        {restaurant.discount && (
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-white text-sm font-medium">
              {restaurant.discount}
            </p>
          </div>
        )}
        {restaurant.proOnly && (
          <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            PRO
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-800 truncate">
            {restaurant.name}
          </h3>
          <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded">
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <svg
              className="w-3 h-3 ml-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center mt-1">
          <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
          {restaurant.veg && (
            <div className="ml-2 border border-green-600 p-0.5">
              <div className="bg-green-600 w-2 h-2 rounded-full"></div>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between items-center border-t border-gray-100 pt-2">
          <div className="flex items-center text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{restaurant.deliveryTime}</span>
          </div>
          <div className="text-sm text-gray-500">
            ₹{restaurant.minOrder} min
          </div>
        </div>
      </div>
    </Link>
  );
};

// Category chips for filtering - Zomato style
const CATEGORIES = [
  "All",
  "Indian",
  "Italian",
  "American",
  "Japanese",
  "Mexican",
  "Chinese",
];

const DashboardHomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch restaurants with React Query v5 (object syntax)
  const {
    data: restaurants = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter restaurants based on search and category
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || restaurant.cuisine === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            Discover the best food & drinks
          </h2>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white z-1 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <svg
              className="w-6 h-6 text-red-500 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {/* Order Types */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">Delivery</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">Dining Out</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">Pro</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">Night Life</h3>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-3 pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
                  selectedCategory === category
                    ? "bg-red-50 text-red-500 border-red-200"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Restaurants with online food delivery
          </h2>
          <div className="flex items-center text-gray-600 text-sm">
            <button className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              Sort
            </button>
          </div>
        </div>

        {/* Restaurant Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>Error loading restaurants. Please try again later.</p>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p>No restaurants found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHomePage;
