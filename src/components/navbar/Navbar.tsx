"use client";

import { useContext, useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import Logo from "../../../public/images/logo/logo-wbg.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getAllProducts from "../../../utils/FakeApi";
import searchContext from "../../context-api/searchContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  fetchUserCart,
  getTotalCartQuantity,
} from "@/store/features/cart/cartSlice";
import supabaseClient from "../../../utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { error } from "console";
import { toast } from "react-toastify";
import { getEmailUserCart, getUserCart } from "../../../utils/cart";
import Button from "../ui/Button";
import { setGeneral } from "@/store/features/auth/authSlice";

function Navbar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  //state to handle authenticated user cart
  const [userCart, setUserCart] = useState([]);
  const [cartDispatched, setCartDispatched] = useState(false);
  //state to handle logout button
  const [showLogout, setShowLogout] = useState(false);

  //google auth user ----------------------------------
  const dispatch = useDispatch();
  const user_id = useSelector((state: RootState) => state.user.user_id);
  const userName = useSelector((state: RootState) => state.user.user_name);
  const userAvatar = useSelector((state: RootState) => state.user.user_avatar);
  // console.log("User avatar:", userAvatar);
  //get all added products from cart
  const CartItem = useSelector(getTotalCartQuantity);
  // console.log("Cart Items:", CartItem);

  useEffect(() => {
    async function fetchUserCart() {
      if (
        userAvatar !=
          "https://kjqzojrvmhadxwftawlo.supabase.co/storage/v1/object/public/product_images/profile-user.png" &&
        user_id
      ) {
        try {
          const userCartData = await getUserCart(user_id);
          setUserCart(userCartData[0].user_cart);
        } catch (error) {
          console.error("Error fetching user cart:", error);
          toast.error("Failed to fetch user cart.");
        }
      }

      if (
        userAvatar ===
          "https://kjqzojrvmhadxwftawlo.supabase.co/storage/v1/object/public/product_images/profile-user.png" &&
        user_id
      ) {
        try {
          const userCartData = await getEmailUserCart(user_id);
          setUserCart(userCartData[0].user_cart);
        } catch (error) {
          console.error("Error fetching user cart:", error);
          toast.error("Failed to fetch user cart.");
        }
      }
    }

    if (user_id && CartItem === 0 && userCart.length === 0) {
      fetchUserCart();
    }
  }, [CartItem, user_id, dispatch, userAvatar, userCart]);

  // console.log("User Cart:", userCart);
  // console.log("User Id:", user_id);

  useEffect(() => {
    if (userCart != null && userCart.length > 0 && !cartDispatched) {
      userCart.forEach((item) => {
        const newItem = {
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          img: item.img,
          category: item.category,
          description: item.description,
        };
        dispatch(addItem(newItem));
        // console.log("newItem", newItem);
      });
      setCartDispatched(true); //to prevent dispatching multiple times
    }
  }, [userCart, dispatch]);

  //------------------

  useEffect(() => {
    if (user_id !== undefined && userName) {
      toast.success(`Welcome, ${userName}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [user_id]);
  //-------------------------------------------------

  //ContextApi hooks
  const { setFilteredProducts } = useContext(searchContext);
  const [ProductDesc, setProductDesc] = useState<any[]>([]);

  // Fetch products and set state
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductDesc(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (ProductDesc && ProductDesc.length > 0 && searchValue) {
      const filtered = ProductDesc.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [ProductDesc, searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchClicked &&
        !(event.target as HTMLElement).closest(".search-container")
      ) {
        setSearchClicked(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchClicked]);

  return (
    <nav className="flex items-center justify-between pb-[2rem]">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image className="w-[18rem]" src={Logo} alt="" />
      </div>

      {/* search bar for md and above*/}
      <div className="relative hidden md:block">
        <input
          className="z-10 h-[4.5rem] xl:w-[50rem] md:w-[30rem] rounded-l-[1rem] border-2 bor px-[1rem]"
          type="text"
          onChange={(e) => {
            setSearchValue(e.target.value);
            router.push("/search");
            if (!e.target.value) {
              router.push("/products");
            }
          }}
          value={searchValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setSearchValue("");
          }}
        />
        {!searchValue && !isFocused && (
          <div className="absolute top-[.7rem] left-[1.5rem] flex items-center gap-x-4 pointer-events-none opacity-50">
            <IoIosSearch className="text-[3.2rem] text-secondary" />
            <p className="text-[2rem] text-secondary">search...</p>
          </div>
        )}
        <button
          onClick={() => router.push("/search")}
          className="h-[4.5rem] md:w-[7rem] lg:w-[10rem] ml-[-2px] bg-secondary hover:bg-secondary-dark text-primary rounded-r-[1rem]"
        >
          Search
        </button>
      </div>

      {/* search bar for less than md */}
      {searchClicked && (
        <div className="absolute top-[1rem] right-[1rem] md:hidden">
          <div className="search-container">
            <input
              className="z-10 h-[4.8rem] max-w-[18rem] rounded-l-[1rem] border-2 border-secondary px-[1rem]"
              type="text"
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                setSearchValue(e.target.value);
                router.push("/search");
                if (!e.target.value) {
                  router.push("/products");
                }
              }}
              value={searchValue}
              onBlur={() => {
                setIsFocused(false);
              }}
            />
            {!searchValue && !isFocused && (
              <div className="absolute top-[.7rem] left-[1.5rem] flex items-center gap-x-4 pointer-events-none opacity-50">
                <IoIosSearch className="text-[3.2rem]secondary" />
                <p className="text-[2rem] text-secondary">search...</p>
              </div>
            )}
            <button
              onClick={() => router.push("/search")}
              className="h-[4.8rem] w-[7rem] ml-[-2px] bg-secondary hover:bg-secondary-dark hover:text-primary-light text-primary text-md rounded-r-[1rem]"
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-x-[1rem] sm:gap-x-[2rem] cursor-pointer text-secondary hover:text-secondary-dark">
        <button
          onClick={() => setSearchClicked(!searchClicked)}
          className="md:hidden flex flex-col items-center"
        >
          <IoIosSearch
            className="text-[3.2rem] text-secondary"
            style={{ strokeWidth: 0.9 }}
          />
          <p className="text-[1rem]">Search</p>
        </button>

        {!searchClicked && (
          <button
            onClick={() => router.push("/cart")}
            className="flex flex-col items-center relative"
          >
            <div className="absolute w-[2.2rem] h-[2.2rem] rounded-[50%] bg-accent bottom-4 left-2 flex items-center justify-center">
              <p className="text-primary-light font-medium">{CartItem}</p>
            </div>
            <HiOutlineShoppingBag
              className="text-[3.2rem]"
              style={{ strokeWidth: 0.9 }}
            />
            <p className="text-[1rem]">Shopping Bag</p>
          </button>
        )}

        <div>
          {userAvatar ? (
            <div className="relative">
              <button
                onClick={() => {
                  setShowLogout(!showLogout);
                }}
                className="flex flex-col items-center cursor-pointer text-secondary hover:text-secondary-dark"
              >
                <Image
                  className="w-[3.2rem] h-[3.2rem] rounded-[50%] border-2 border-secodary"
                  src={userAvatar}
                  width={50}
                  height={50}
                  alt="user avatar"
                />
                <p className="text-[1rem]">Profile</p>
              </button>

              <div className="absolute z-10 top-[0] right-[-8rem]">
                {showLogout && (
                  <Button
                    onClick={() => {
                      // Clear all cookies
                      document.cookie.split(";").forEach((cookie) => {
                        const eqPos = cookie.indexOf("=");
                        const name =
                          eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie =
                          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                      });

                      // Clear localStorage
                      localStorage.clear();

                      // Clear redux store
                      dispatch(setGeneral());
                      dispatch(clearCart());

                      //reload the page
                      window.location.reload();
                    }}
                    label="Logout"
                    type="reset"
                  />
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push("/signin");
              }}
              className="flex flex-col items-center cursor-pointer text-secondary hover:text-secondary-dark"
            >
              <CiUser className="text-[3.2rem] " />
              <p className="text-[1rem]">Profile</p>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
