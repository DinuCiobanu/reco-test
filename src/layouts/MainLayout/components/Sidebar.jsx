import { NavLink } from "react-router";
import cn from "../../../utils/cn";

export default function Sidebar() {
  const menuItems = [
    { title: "Apps Discovery", path: "/apps-discovery" },
    { title: "Apps Inventory", path: "/apps-inventory" },
    { title: "Settings", path: "/settings" },
  ];
  return (
    <div className={"w-42 py-3.5 px-6.25 shrink-0 bg-serfice-200 h-full"}>
      <img src="/svg/logo.svg" />

      <div className={"mt-2.5 flex flex-col"}>
        {menuItems.map((item, idx) => (
          <NavLink
            to={item.path}
            key={item.title}
            className={({ isActive }) => {
              return cn(
                "uppercase text-xs pl-3 py-2 cursor-pointer",
                isActive && "border-l-2 border-brand pl-2.5",
              );
            }}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
