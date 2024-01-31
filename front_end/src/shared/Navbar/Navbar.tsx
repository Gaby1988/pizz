import { Link, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <nav className="Navbar">
        <ul>
          <li>1</li>
          <li>2</li>
          <Link to="/inscription"><li>Inscription</li></Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
