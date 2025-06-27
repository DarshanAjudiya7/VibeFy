import { Link, useLocation } from "react-router-dom";
import { FaMusic, FaClock, FaChartBar, FaHeart, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const { pathname } = useLocation();

  const iconClass = (path) =>
    `hover:text-white transition ${
      pathname === path ? "text-white" : "text-green-400"
    }`;

  return (
    <div className="flex md:flex-col justify-around md:justify-start items-center md:items-start gap-6 p-4 text-xl bg-black h-full md:h-screen w-full md:w-16 fixed md:static bottom-0">
      <Link to="/" title="Home">
        <FaMusic className={iconClass("/")} />
      </Link>
      <Link to="/recent" title="Recent">
        <FaClock className={iconClass("/recent")} />
      </Link>
      <Link to="/stats" title="Stats">
        <FaChartBar className={iconClass("/stats")} />
      </Link>
      <Link to="/liked" title="Liked Songs">
        <FaHeart className={iconClass("/liked")} />
      </Link>
      <Link to="/settings" title="Settings">
        <FaCog className={iconClass("/settings")} />
      </Link>
    </div>
  );
};

export default Sidebar;
