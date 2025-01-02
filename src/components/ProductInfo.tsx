import { Link } from "react-router"; 

interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  liked: boolean;
  favorit: boolean;
}

interface ProductInfoProps {
  product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="w-3/5 mt-9">
      <div className="flex flex-col items-start justify-between gap-12">
        <h2 className="text-4xl transition-all duration-200 text-blue-900 cursor-pointer hover:text-blue-950">
          {product.title}
        </h2>
        <p className="text-2xl w-4/5 transition-all duration-200 text-blue-300 cursor-pointer hover:text-blue-400">
          {product.description}
        </p>
        <p className="text-xl text-blue-500 transition-all duration-200 hover:text-blue-600">
          Price:{" "}
          <span className="text-blue-700 cursor-pointer transition-all duration-200 hover:text-blue-800">
            ${product.price}
          </span>
        </p>
        <div className="mt-2">
          <Link to="/products">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Back to Products List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
