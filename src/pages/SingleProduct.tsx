import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
import { FadeLoader } from "react-spinners";
import LazyImage from "../components/LazyImage";
import ProductInfo from "../components/ProductInfo";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  function backHandle() {
    navigate(-1);
  }

  if (loading)
    return (
      <div className="w-full flex justify-center items-center h-[93vh]">
        <FadeLoader />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  const product = products.find((product) => product.id === parseInt(id || ""));

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="flex h-[800px] flex-col p-10 box-border w-full ">
      <div>
        <button onClick={backHandle}>
          <IoArrowBackCircleOutline size={50} />
        </button>
      </div>
      <div className="flex justify-around items-start h-[800px] p-5 w-full">
        <div className="singleProduct__img">
          <LazyImage
            src={product.image}
            className="singleProduct__img"
            alt={product.title}
            placeholderSrc={""}
            width={""}
            height={""}
          />
        </div>
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
