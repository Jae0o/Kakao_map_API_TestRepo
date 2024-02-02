import { useNavigate } from "react-router-dom";
import "./Navbar.Styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <button className="nav_button" onClick={() => navigate("/")}>
        Main
      </button>

      <button className="nav_button" onClick={() => navigate("/Action")}>
        Action
      </button>

      <button className="nav_button" onClick={() => navigate("/Click")}>
        Click Event
      </button>
    </nav>
  );
};

export default Navbar;
