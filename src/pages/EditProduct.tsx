import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router";
import { editProductLocally } from "../features/product/productSlice";
import CreateEditForm from "../components/CreateEditForm";

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    state.product.products.find((product) => product.id === Number(id))
  );

  const [title, setTitle] = useState<string>(product?.title || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [image, setImage] = useState<string>(product?.image || "");
  const [imageUrl, setImageUrl] = useState<string>(product?.image || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [error, setError] = useState<string | null>(null);
  const [activated, setActivated] = useState<boolean>(false);

  useEffect(() => {
    if (!product) {
      navigate("/products");  
    }
  }, [product, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || (!image && !imageUrl) || price <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const finalImage = image || imageUrl;
    const updatedProduct = {
      id: product?.id, 
      updates: {
        title,
        description,
        image: finalImage,
        price,
      },
    };

    dispatch(editProductLocally(updatedProduct));
    setActivated(true);
    setTimeout(() => {
      setActivated(false);
      navigate(-1);
    }, 600);

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
    <>
      
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
          formType="edit"
        />
    
    </>
  );
};

export default EditProduct;
