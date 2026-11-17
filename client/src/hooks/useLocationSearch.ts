"use client";

import { useRef, useState } from "react";

export interface LocationSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    country?: string;
    city?: string;
    town?: string;
    village?: string;
    road?: string;
  };
}

export function useLocationSearch(featuretype = "city") {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const typeParam = featuretype ? `&featuretype=${featuretype}` : "";
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            value,
          )}&format=json&addressdetails=1&limit=5${typeParam}`,
          {
            headers: {
              "Accept-Language": "en",
            },
          },
        );
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const clear = () => {
    setQuery("");
    setSuggestions([]);
    setIsLoading(false);
  };

  return {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    isLoading,
    handleSearch,
    clear,
  };
}
