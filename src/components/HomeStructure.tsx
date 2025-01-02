import { Link } from "react-router";

export default function HomeStructure() {
    return (
      <div className="flex absolute top-0 w-full h-[100vh] justify-center gap-8 box-border p-24 items-start flex-col">
        <h1 className="text-7xl text-green-700">
          Welcome to the Product Store
        </h1>
        <p className="text-4xl flex text-green-500 flex-col gap-2">
          <span>Browse through a wide range of products</span>
          <span> and manage your favorites!</span>
        </p>
        <Link to="/products" className="text-5xl text-green-400">
          Go to{" "}
          <span className="text-blue-400 hover:text-blue-500">Products</span>
        </Link>
      </div>
    );
    
};
