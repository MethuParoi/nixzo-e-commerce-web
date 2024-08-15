"use client";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

interface Option {
  label: string;
  value: string;
}

interface SortProductsProps {
  label: string;
  Options: Option[];
}

const SortProducts: React.FC<SortProductsProps> = ({ Options, label }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [expandList, setExpandList] = useState<boolean>(false);

  console.log(selectedOptions);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((option) => option !== value)
        : [...prevSelected, value]
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

//"use client";
// import { useState } from "react";
// import { IoIosArrowDropdown } from "react-icons/io";

// const FilterDropdown: React.FC = ({ Options, label }) => {
//   const [selectedPrice, setSelectedPrice] = useState<string>("");
//   const [expandList, setExpandList] = useState<boolean>(false);

//   const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedPrice(event.target.value);
//   };

//   return (
//     <div className="p-4 ">
//       {" "}
//       <div className="mb-4">
//         {" "}
//         <div className="flex items-center justify-between">
//           {" "}
//           <h2 className="text-[1.6rem] font-medium">{label}</h2>{" "}
//           <button
//             onClick={() => setExpandList(!expandList)}
//             className="text-[3rem]"
//           >
//             {" "}
//             <IoIosArrowDropdown />{" "}
//           </button>{" "}
//         </div>{" "}
//         <ul className="mt-2 space-y-2 ">
//           {" "}
//           {expandList &&
//             Options.map((option) => (
//               <li className="text-[1.6rem]" key={option.value}>
//                 {" "}
//                 <label className="flex items-center">
//                   {" "}
//                   <input
//                     type="radio"
//                     name="price"
//                     value={option.value}
//                     checked={selectedPrice === option.value}
//                     onChange={handlePriceChange}
//                     className="form-radio text-blue-500 "
//                   />{" "}
//                   <span className="ml-2 text-gray-700 text-[1.8rem] font-medium">
//                     {" "}
//                     {option.label}{" "}
//                   </span>{" "}
//                 </label>{" "}
//               </li>
//             ))}{" "}
//         </ul>{" "}
//       </div>{" "}
//     </div>
//   );
// };

// export default FilterDropdown;
