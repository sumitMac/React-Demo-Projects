import { Link } from "react-router-dom";

export function Header() {
  return (
    <section data-test="header" className="header-section">
      <nav data-test='navbar' className="navbar">
        <section className="left-navbar">
          <Link to="/">
            <h1 style={{ color: "white" }} className="nav-heading">
              Fashion World
            </h1>
          </Link>
        </section>

        <section className="right-navbar">
          <Link data-test='about' to="/about">
            <img className="contact-img" src="about.svg" alt="about-icon" />
          </Link>
          <Link to="/cart" data-test='cart'>
            <img className="cart-img" src="cart.svg" alt="cart-icon" />
          </Link>
        </section>
      </nav>
    </section>
  );
}
