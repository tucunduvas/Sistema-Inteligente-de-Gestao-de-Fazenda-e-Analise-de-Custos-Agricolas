
import { FiGlobe } from "react-icons/fi";
import { LuSprout } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-1.5 rounded-lg">
            <LuSprout color="white" />
          </div>
          <span className="text-2xl font-bold ttracking-tight text-green-500">
            SIGFaz
          </span>
        </div>

        <div className="flex items-center  gap-8 text-gray-600 font-medium">
          <a href="/">Home</a>
          <a href="/sobre-nos">Sobre nós</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors">
          <div className="flex items-center gap-2">
            <FiGlobe className="w-5 h-5" />
            <span className="font-medium">Português</span>
            <GoChevronDown />
          </div>
        </button>
        <Link to="/login"  className="text-green-600 font-semibold hover:opacity-80">
          Login
        </Link>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm">
          Começar agora
        </button>
      </div>
    </nav>
    </>
  );
};
