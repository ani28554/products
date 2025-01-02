import { MdDelete } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaHeart, FaBookmark } from "react-icons/fa";
import {
  IProduct,
  removeProductFromState,
  toggleFavoriteStatus,
  toggleLike,
} from "../features/product/productSlice";
import { useAppDispatch } from "../store/hooks";
import { useState } from "react";
import LazyImage from "./LazyImage";
import { Link, useNavigate } from "react-router";

interface CardProps {
  product: IProduct;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [deleteBtnActive, setDeleteBtnActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleLike(product.id));
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavoriteStatus(product.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleteBtnActive(true);

    dispatch(removeProductFromState(product.id));
    setDeleteBtnActive(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/products/edit/${product.id}`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
 
    if (e.target instanceof HTMLButtonElement) {
      e.preventDefault();
    }
  };

  const newTitle =
    product.title.length > 28
      ? `${product.title.slice(0, 27)}...`
      : product.title;

  return (
    <div className="w-[330px] h-[490px]">
      <Link
        to={`/products/${product.id}`}
        onClick={handleCardClick}
        className="w-full h-full mt-0 box-border" 
      >
        <div className="h-[490px] w-[330px] box-border">
          <div className="container bg-gray-200 h-[490px] flex items-center justify-between flex-col border-2 border-gray-400 w-[330px] box-border p-5 mt-12">
            <LazyImage
              className="productsImg"
              alt="ProductImg"
              src={product.image}
              placeholderSrc=""
              width=""
              height=""
            />
            <div className="flex justify-between mt-3 border border-slate-300 box-border p-1 flex-col items-start w-full">
              <div className="text-lg">{newTitle}</div>
              <div>Price: ${product.price}</div>
            </div>
            <div className="flex mt-4 hover:border-gray-500 box-border border-gray-200 border-t transition-all duration-300 w-full gap-12 justify-center p-2 items-center">
              <button
                className={`transition duration-200 ${
                  product.liked ? "text-red-700" : "text-gray-500"
                }`}
                onClick={handleLike}
              >
                <FaHeart size={32} />
              </button>
              <button
                className={`transition duration-200 ${
                  product.favorit ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={handleFavorite}
              >
                <FaBookmark size={32} />
              </button>

              <button
                className="transition duration-200 text-gray-500"
                onClick={handleEdit}
              >
                <HiMiniPencilSquare size={32} />
              </button>

              <button
                className={`transition duration-200 ${
                  deleteBtnActive ? "text-red-800" : "text-gray-500"
                }`}
                onClick={handleDelete}
              >
                <MdDelete size={32} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
