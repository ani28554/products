import React, { useCallback, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectFavorites } from "../store/selectors";
import Card from "../components/Card";
import { ProductFilterSearch } from "../components/ProductFilterSearch";
interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  liked: boolean;
  favorit: boolean;
}
const Favorites: React.FC = () => {
  const favorites = useAppSelector(selectFavorites);
  const { visibleProductsCount } = useAppSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const handleFilterChange = useCallback((filtered: IProduct[]) => {
    setFilteredProducts(filtered);
  }, []);
  return (
    <>
      <ProductFilterSearch
        products={favorites}
        show={false}
        onFilterChange={handleFilterChange}
      />
      <h1 className="text-3xl mt-4 flex justify-center text-gray-700">
        Favorites
      </h1>
      <div className="grid ml-5 gap-9 grid-cols-5">
        {filteredProducts.length === 0 ? (
          <p className="flex text-xl justify-center items-center">
            <span>No favorite products found</span>
          </p>
        ) : (
          filteredProducts
            .slice(0, visibleProductsCount)
            .map((product) => <Card key={product.id} product={product} />)
        )}
      </div>
    </>
  );
};

export default Favorites;
