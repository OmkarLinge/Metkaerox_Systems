export const COMPANY_ADDRESS =
  "Flymore Drone, Ground floor, Bhumkar Chowk, Krushna Tower, Bhumkar Nagar, Ambegaon Budruk, Pune, Maharashtra 411046";

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  COMPANY_ADDRESS
)}&output=embed`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMPANY_ADDRESS
)}`;
