import "./Root.Styles.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";

const Root = () => {
  return (
    <main className="app">
      <Navbar />
      <section className="outlet__layout">
        <Outlet />
      </section>
    </main>
  );
};

export default Root;
