import React from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setGeneral } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";

function AdminNavbar() {
  //use redux
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  //userouter
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-[2rem]">
        <h1>Admin</h1>
        <button>overview</button>
        <button>products</button>
      </div>

      <div>
        <Button
          onClick={() => {
            dispatch(setGeneral());
            router.push("/");
          }}
          label="logout"
          type="reset"
        />
      </div>
    </div>
  );
}

export default AdminNavbar;
