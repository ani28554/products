import { useEffect, useState, useCallback } from "react";
import { IoClose } from "react-icons/io5";

interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  liked: boolean;
  favorit: boolean;
}

interface ProductFilterSearchProps {
  products: IProduct[];
  onFilterChange: (filteredProducts: IProduct[]) => void;
  show: boolean;
}

export function ProductFilterSearch({
  products,
  onFilterChange,
  show,
}: ProductFilterSearchProps) {
  const [filter, setFilter] = useState({
    search: "",
    categories: [] as string[],
    mode: "OR",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debounceDelay = 500;
  const [debouncedSearch, setDebouncedSearch] = useState(filter.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filter.search);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [filter.search]);

  const filteredProducts = useCallback(() => {
    return products.filter((product) => {
      const matchesCategory =
        filter.categories.length === 0 ||
        (filter.mode === "OR" &&
          filter.categories.some((category) => {
            if (category === "Liked") return product.liked;
            if (category === "Favorite") return product.favorit;
            return true;
          })) ||
        (filter.mode === "AND" &&
          filter.categories.every((category) => {
            if (category === "Liked" && !product.liked) return false;
            if (category === "Favorite" && !product.favorit) return false;
            return true;
          }));

      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, filter, debouncedSearch]);

  useEffect(() => {
    onFilterChange(filteredProducts());
  }, [filteredProducts, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilter((prev) => {
      if (category === "All") {
        return { ...prev, categories: [] };
      } else {
        const categories = prev.categories.includes(category)
          ? prev.categories.filter((item) => item !== category)      
          : [...prev.categories, category]; 
        return {
          ...prev,
          categories: category === "All" ? [] : categories, 
        };
      }
    });
  };

  const handleModeToggle = () => {
    setFilter((prev) => ({
      ...prev,
      mode: prev.mode === "OR" ? "AND" : "OR",
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-16 bg-slate-500 flex justify-center items-center">
      <form className="max-w-lg flex justify-center items-center mx-auto">
        {show && (
          <div className="flex relative">
            <button
              id="dropdown-button"
              type="button"
              className="flex-shrink-0 justify-between w-44 rounded-lg rounded-r-none z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              onClick={toggleDropdown}
            >
              {filter.categories.length > 0
                ? filter.categories.join(", ")
                : "All"}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isDropdownOpen && ( 
              <div
                id="dropdown"
                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {["All", "Liked", "Favorite"].map((category) => (
                    <li key={category}>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleCategoryToggle(category)} 
                      >
                        {category !== "All" && (
                          <input
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
                            checked={filter.categories.includes(category)}
                            readOnly
                          />
                        )}

                        {category}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="px-4 py-2">
                  <button
                    type="button"
                    onClick={handleModeToggle}
                    className="w-full py-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
                  >
                    Switch to {filter.mode === "OR" ? "AND" : "OR"} mode
                  </button>
                </div>

                <button
                  type="button"
                  className="absolute top-2 text-slate-300 border-none right-2 p-2"
                  onClick={toggleDropdown} 
                >
                  <IoClose size={22} />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="relative flex justify-center items-center w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search for products..."
            value={filter.search}
            onChange={handleSearchChange}
          />
        </div>
      </form>
    </div>
  );
}
