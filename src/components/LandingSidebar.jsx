import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";

function LandingSidebar() {
  const location = useLocation();

  return (
    <aside className="landing-sidebar">
      <Link
        to="/"
        className={`ls-item ${location.pathname === "/" ? "active" : ""}`}
      >
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/about" className="ls-item">
        <FaInfoCircle />
        <span>About</span>
      </Link>

      <Link to="/contact" className="ls-item">
        <FaEnvelope />
        <span>Contact</span>
      </Link>
    </aside>
  );
}

export default LandingSidebar;
