import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addLocalProduct } from "../features/product/productSlice";
import CreateEditForm from "../components/CreateEditForm";

interface IProductInput {
  title: string;
  description: string;
  image: string;
  price: number;
}

const CreateProduct = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [activated, setActivated] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || (!image && !imageUrl) || price <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const finalImage = image || imageUrl;
    const newProduct: IProductInput = {
      title,
      description,
      image: finalImage,
      price,
    };

    dispatch(addLocalProduct(newProduct));
    setActivated(true);
    setTimeout(() => setActivated(false), 1500);

    setTitle("");
    setDescription("");
    setImage("");
    setImageUrl("");
    setPrice(0);
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <CreateEditForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      image={image}
      setImage={setImage}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      price={price}
      setPrice={setPrice}
      error={error}
      activated={activated}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      formType="create"
    />
  );
};

export default CreateProduct;
