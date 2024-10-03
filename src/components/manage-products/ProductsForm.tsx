// // import Input from "../../ui/Input";
// // import Form from "../../ui/Form";
// // import FormRow from "../../ui/FormRow";
// // import Button from "../../ui/Button";
// // import FileInput from "../../ui/FileInput";
// // import Textarea from "../../ui/Textarea";
// import { useForm } from "react-hook-form";
// // import { useCreateCabin } from "./useCreateCabin";
// // import { useEditCabin } from "./useEditCabin";
// import { useState } from "react";
// import Button from "../../ui/Button";

// function ProductsForm({ cabinToEdit = {}, onClose }) {
//   //useCreateCabin and useEditCabin, importing custom hooks
// //   const { isCreating, createCabinForm } = useCreateCabin();
// //   const { editCabinForm, isEditingData } = useEditCabin();
// //temp---------------
// const { isCreating, createCabinForm } = useState(true);
//   const { editCabinForm, isEditingData } = useState(false);
// //------------------
//   const isWorking = isCreating || isEditingData;

//   const { id: editId, ...editValue } = cabinToEdit;
//   const isEditing = Boolean(editId);

//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: isEditing ? editValue : {},
//   });
//   const { errors } = formState;

//   //Onclick handler for the submit button
//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];

//     if (isEditing)
//       editCabinForm(
//         { newCabinData: { ...data, image }, id: editId },
//         {
//           onSuccess: (data) => {
//             onClose();
//             reset();
//           },
//         }
//       );
//     else
//       createCabinForm(
//         { ...data, image: image },
//         {
//           onSuccess: (data) => {
//             onClose();
//             reset();
//           },
//         }
//       );
//   }

//   function onError(errors) {
//     console.error(errors);
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit, onError)}
//       type={onClose ? "modal" : "regular"}
//     >
//       <div className="mb-[3.5rem] relative">
//         {/* error={errors?.name?.message} */}
//         <p className="text-gray-600 font-medium">Cabin name*</p>
//         <input
//           className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
//           type="text"
//           id="name"
//           disabled={isWorking}
//           {...register("name", { required: "Cabin name is required" })}
//         />
//         {errors.name && (
//           <p className="text-red-500 absolute">{errors.name.message}</p>
//         )}
//       </div>
//       <div className="mb-[3.5rem] relative">
//         <p className="text-gray-600 font-medium">Maximum capacity*</p>

//         <input
//           className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
//           type="number"
//           id="maxCapacity"
//           disabled={isWorking}
//           {...register("maxCapacity", {
//             required: "Maximum capacity is required",
//             min: { value: 1, message: "capcity should be atleast 1" },
//           })}
//         />
//         {errors.maxCapacity && (
//           <p className="text-red-500 absolute">{errors.maxCapacity.message}</p>
//         )}
//       </div>
//       <div className="mb-[3.5rem] relative">
//         <p className="text-gray-600 font-medium">Regular price*</p>

//         <input
//           className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
//           type="number"
//           id="regularPrice"
//           disabled={isWorking}
//           {...register("regularPrice", {
//             required: "Regular price is required",
//           })}
//         />
//         {errors.regularPrice && (
//           <p className="text-red-500 absolute">{errors.regularPrice.message}</p>
//         )}
//       </div>
//       <div className="mb-[3.5rem] relative">
//         <p className="text-gray-600 font-medium">Discount</p>
//         <input
//           className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
//           type="number"
//           id="discount"
//           disabled={isWorking}
//           defaultValue={0}
//           {...register("discount", {
//             required: "Discounted amount is required",
//             validate: (value) => {
//               if (Number(value) > Number(getValues().regularPrice)) {
//                 return "Discounted amount should be less than regular price";
//               }
//               if (Number(value) < 0) {
//                 return "Discounted amount should be greater than 0";
//               }
//               return true;
//             },
//             // validate: (value) =>
//             //   Number(value) <= Number(getValues().regularPrice) ||
//             //   "Discounted amount should be less than regular price",
//             //   Number(value) >= 0 || "Discounted amount should be greater than 0",
//           })}
//         />
//         {errors.discount && (
//           <p className="text-red-500 absolute">{errors.discount.message}</p>
//         )}
//       </div>
//       <div className="mb-[3.5rem] relative">
//         <p className="text-gray-600 font-medium">Description for website</p>

//         <textarea
//           className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
//           type="text"
//           id="description"
//           defaultValue=""
//           disabled={isWorking}
//           {...register("description", { required: "Description is required" })}
//         />
//         {errors.description && (
//           <p className="text-red-500 absolute">{errors.description.message}</p>
//         )}
//       </div>

//       <div className="mb-[3.5rem] relative">
//         <p className="text-gray-600 font-medium">Cabin photo</p>

//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: isEditing ? false : "cabin photo is required",
//           })}
//         />
//         {errors.image && (
//           <p className="text-red-500 absolute">{errors.image.message}</p>
//         )}
//       </div>
//       <div>
//         {/* type is an HTML attribute! */}
//         <Button label={"Cancel"} onClick={onClose} type="reset" />

//         <Button
//           label={isEditing ? "Edit cabin" : "Add a new cabin"}
//           disabled={isWorking}
//         />
//       </div>
//     </form>
//   );
// }

// export default ProductsForm;

function ProductsForm() {
  return (
    <div>
      <h1>ProductsForm</h1>
    </div>
  );
}
export default ProductsForm;
