import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function MainLayout() {
  return (
    <div className={" mx-auto flex h-full"}>
      <Sidebar />
      <div className={"p-4 w-full h-full"}>
        <Outlet />
      </div>
    </div>
  );
}
