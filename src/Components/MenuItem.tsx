import { NavLink } from "react-router-dom";


interface MenuItemProps {
  direction: string;
  text: string;
  end?: boolean; 
}

function MenuItem({ direction, text, end = false }: MenuItemProps) {
  return (
    <NavLink
      to={direction}
      end={end}
      className={({ isActive }) =>
        `p-2 rounded cursor-pointer transition-colors ${
          isActive
            ? "bg-green-100 text-green-700 font-bold" 
            : "text-gray-600 hover:bg-green-50 hover:text-green-600" 
        }`
      }
    >
      {text}
    </NavLink>
  );
}

export default MenuItem;