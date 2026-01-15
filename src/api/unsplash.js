import axios from "axios";

const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
    "Accept-Version": "v1",
  },
});

export const fetchPhotos = ({ query, page }) => {
  if (!query) return Promise.resolve({ data: { results: [] } });

  return unsplash.get("/search/photos", {
    params: {
      query,
      page,
      per_page: 30,
    },
  });
};

export const fetchSuggestions = (query) => {
  if (!query) return Promise.resolve({ data: { results: [] } });

  return unsplash.get("/search/collections", {
    params: {
      query,
      per_page: 5,
    },
  });
};
