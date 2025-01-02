import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProducts,
  updateVisibleProductsCount,
} from "../features/product/productSlice";
import { ProductFilterSearch } from "../components/ProductFilterSearch";
import Card from "../components/Card";

interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  liked: boolean;
  favorit: boolean;
}

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, visibleProductsCount } = useAppSelector(
    (state) => state.product
  );

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const savedVisibleCount = localStorage.getItem("visibleProductsCount");
    if (savedVisibleCount) {
      dispatch(updateVisibleProductsCount(parseInt(savedVisibleCount, 10)));
    } else {
      dispatch(updateVisibleProductsCount(10));
    }
  }, [dispatch]);

  const handleFilterChange = useCallback((filtered: IProduct[]) => {
    setFilteredProducts(filtered);
  }, []);

  const handleShowMore = () => {
    dispatch(updateVisibleProductsCount(visibleProductsCount + 5));
  };

  if (loading)
    return (
      <div className="w-full flex justify-center items-center h-[93vh]">
        <p>Loading...</p>
      </div>
    );

  if (error && products.length === 0) return <p>Error: {error}</p>;

  return (
    <>
      <ProductFilterSearch
        products={products}
        show={true}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ml-5 gap-9">
        {filteredProducts.length === 0 ? (
          <p className="flex text-xl justify-center items-center">
            <span>No products found</span>
          </p>
        ) : (filteredProducts.slice(0, visibleProductsCount).map((product) => (
          <Card key={product.id} product={product} />
        )))}
      </div>
      {visibleProductsCount < filteredProducts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Show More
          </button>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Products;
