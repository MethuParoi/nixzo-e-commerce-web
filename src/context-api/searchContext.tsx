"use client";

import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext<any>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  return (
    <SearchContext.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
