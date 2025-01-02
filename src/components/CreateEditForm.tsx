import { FC } from "react";
import CustomAlert from "./CustomAlert";

interface CreateEditFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  error: string | null;
  activated: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formType: "create" | "edit"; 
}

const CreateEditForm: FC<CreateEditFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  image,
  imageUrl,
  setImageUrl,
  price,
  setPrice,
  error,
  activated,
  handleSubmit,
  handleImageChange,
  formType, 
}) => {
  return (
    <>
      <CustomAlert
        text={formType === "create" ? "Product Created" : "Product Updated"}
        activated={activated}
      />
      <div className="w-full h-[80vh] flex justify-center items-center flex-col">
        <div className="w-1/3 h-[670px] bg-gray-500 flex justify-center items-center flex-col p-6">
          <div className="flex justify-between items-center flex-col">
            <h2 className="text-white">
              {formType === "create" ? "Add a New Product" : "Edit Product"}
            </h2>
            <p className="text-red-800 text-xl h-7">{error && error}</p>
          </div>
          <form className="flex w-full flex-col" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title *
              </label>
              <input
                type="text"
                value={title}
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description *
              </label>
              <textarea
                id="description"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>

          
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image (Upload or URL) *
              </label>
              <input
                type="file"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleImageChange}
              />
              {image && (
                <img
                  src={image}
                  alt="Selected preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Or Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                id="imageUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price $ *
              </label>
              <input
                type="number"
                value={price}
                id="price"
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 mt-4"
              type="submit"
            >
              {formType === "create" ? "Add Product" : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEditForm;
