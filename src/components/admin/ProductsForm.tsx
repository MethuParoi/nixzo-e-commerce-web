"use client";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import { createProduct } from "../../../utils/manageProducts";
import { IoCloseSharp } from "react-icons/io5";

function useCreateOrEditProduct() {
  const [isWorking, setIsWorking] = useState(false);

  const handleProductForm = async (productData, id, { onSuccess }) => {
    setIsWorking(true);
    try {
      const data = await createProduct(productData, id);
      onSuccess(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsWorking(false);
    }
  };

  return { isWorking, handleProductForm };
}

function ProductsForm({ productToEdit = {}, onClose, modalHandler }) {
  const { isWorking, handleProductForm } = useCreateOrEditProduct();

  const formRef = useRef(null);

  const { product_id: editId, ...editValue } = productToEdit;
  const isEditing = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editValue : {},
  });
  const { errors } = formState;

  // Onclick handler for the submit button
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    handleProductForm({ ...data, image }, isEditing ? editId : null, {
      onSuccess: (data) => {
        onClose();
        reset();
      },
    });
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <div className=" inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <div className="place-self-end">
        <button onClick={modalHandler}>
          <IoCloseSharp className="text-gray-300" size={"5rem"} />
        </button>
      </div>
      <div className="bg-gray-100 w-[80rem] h-[80rem] p-[2rem] shadow-xl rounded-[2rem] border-2 border-gray-200">
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onClose ? "modal" : "regular"}
        >
          <div className="mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Product title*</p>
            <input
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              type="text"
              id="productTitle"
              disabled={isWorking}
              {...register("productTitle", {
                required: "Product title is required",
              })}
            />
            {errors.productTitle && (
              <p className="text-red-500 absolute">
                {errors.productTitle.message}
              </p>
            )}
          </div>
          <div className="mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Product Category*</p>
            <input
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              type="text"
              id="productCategory"
              disabled={isWorking}
              {...register("productCategory", {
                required: "Product category is required",
              })}
            />
            {errors.productCategory && (
              <p className="text-red-500 absolute">
                {errors.productCategory.message}
              </p>
            )}
          </div>
          <div className="mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Product price*</p>
            <input
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              type="number"
              id="regularPrice"
              disabled={isWorking}
              {...register("regularPrice", {
                required: "Product price is required",
              })}
            />
            {errors.regularPrice && (
              <p className="text-red-500 absolute">
                {errors.regularPrice.message}
              </p>
            )}
          </div>
          <div className="mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">
              Product rating (optional)
            </p>
            <input
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              type="number"
              id="rating"
              disabled={isWorking}
              defaultValue={0}
              {...register("rating", {
                validate: (value) => {
                  if (Number(value) > 5) {
                    return "rating should be less than 5";
                  }
                  if (Number(value) < 0) {
                    return "rating should be greater than 0";
                  }
                  return true;
                },
              })}
            />
            {errors.rating && (
              <p className="text-red-500 absolute">{errors.rating.message}</p>
            )}
          </div>
          <div className="mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">
              Description of product(optional)
            </p>
            <textarea
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              id="description"
              defaultValue=""
              disabled={isWorking}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 absolute">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Product photo</p>
            <input
              className="text-[1.4rem] rounded-sm font-medium file:text-gray-100 file:mt-[.5rem] file:px-3 file:py-2 file:mr-3 file:rounded-lg file:border-none file:text-brand-50 file:bg-blue-400 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-brand-700"
              type="file"
              id="image"
              accept="image/*"
              {...register("image", {
                required: isEditing ? false : "Product photo is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500 absolute">{errors.image.message}</p>
            )}
          </div>
          <div>
            <input type="submit" className="hidden" />
          </div>
          <div className="flex items-center gap-x-6">
            <Button
              onClick={() => {
                if (formRef.current) {
                  handleSubmit(onSubmit)();
                }
              }}
              label={isEditing ? "Edit product" : "Add a new Product"}
              disabled={isWorking}
            />
            <Button label={"Cancel"} onClick={onClose} type="reset" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
