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
    <div className="flex items-center justify-between pb-4 border-b-[.3rem] border-b-gray-500">
      <div className="flex items-center gap-x-[2rem]">
        <Button
          onClick={() => {
            router.push("/admin/dashboard");
          }}
          label="Overview"
          type="button"
        />
        <Button
          onClick={() => {
            router.push("/admin/manage-products");
          }}
          label="Manage Products"
          type="button"
        />
      </div>

      <div>
        <h1 className="text-secondary-dark text-[2rem] mr-[8rem] font-semibold">
          Admin Dashboard
        </h1>
      </div>

      <div>
        <Button
          onClick={() => {
            dispatch(setGeneral());
            router.push("/");
          }}
          label="Logout"
          type="reset"
        />
      </div>
    </div>
  );
}

export default AdminNavbar;
