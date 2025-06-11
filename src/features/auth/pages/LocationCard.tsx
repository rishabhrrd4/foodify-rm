import { useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

const GetLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError("Unable to retrieve your location");
        console.error(err);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <button
        onClick={handleGetLocation}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Get My Location
      </button>

      {location && (
        <div className="mt-4 text-center bg-white p-4 rounded shadow">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
          <a
            href={`https://www.google.com/maps?q=${location.lat},${location.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 block"
          >
            View on Google Maps
          </a>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default GetLocation;
