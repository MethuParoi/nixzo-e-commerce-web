// SortProducts.js
"use client";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOptions } from "../../store/features/sort-products/sortProductSlice";

interface Option {
  label: string;
  value: string;
}

interface SortProductsProps {
  label: string;
  Options: Option[];
}

const SortProducts: React.FC<SortProductsProps> = ({ Options, label }) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector(
    (state) => state.sortProduct.selectedOptions
  );
  const [expandList, setExpandList] = useState<boolean>(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(
      setSelectedOptions(
        selectedOptions.includes(value)
          ? selectedOptions.filter((option) => option !== value)
          : [...selectedOptions, value]
      )
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.6rem] font-medium">{label}</h2>
          <button
            onClick={() => setExpandList(!expandList)}
            className="text-[3rem]"
          >
            <IoIosArrowDropdown />
          </button>
        </div>
        <ul className="mt-2 space-y-2">
          {expandList &&
            Options.map((option) => (
              <li className="text-[1.6rem]" key={option.value}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name={label.toLowerCase()}
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={handleOptionChange}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-700 text-[1.8rem] font-medium">
                    {option.label}
                  </span>
                </label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SortProducts;

// "use client";
// import { useState } from "react";
// import { IoIosArrowDropdown } from "react-icons/io";

// interface Option {
//   label: string;
//   value: string;
// }

// interface SortProductsProps {
//   label: string;
//   Options: Option[];
//   selectedOptions: string[];
//   setSelectedOptions: (options: string[]) => void;
// }

// const SortProducts: React.FC<SortProductsProps> = ({ Options, label }) => {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const [expandList, setExpandList] = useState<boolean>(false);

//   console.log(selectedOptions);

//   const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSelectedOptions((prevSelected) =>
//       prevSelected.includes(value)
//         ? prevSelected.filter((option) => option !== value)
//         : [...prevSelected, value]
//     );
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-[1.6rem] font-medium">{label}</h2>
//           <button
//             onClick={() => setExpandList(!expandList)}
//             className="text-[3rem]"
//           >
//             <IoIosArrowDropdown />
//           </button>
//         </div>
//         <ul className="mt-2 space-y-2">
//           {expandList &&
//             Options.map((option) => (
//               <li className="text-[1.6rem]" key={option.value}>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name={label.toLowerCase()}
//                     value={option.value}
//                     checked={selectedOptions.includes(option.value)}
//                     onChange={handleOptionChange}
//                     className="form-checkbox text-blue-500"
//                   />
//                   <span className="ml-2 text-gray-700 text-[1.8rem] font-medium">
//                     {option.label}
//                   </span>
//                 </label>
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SortProducts;
