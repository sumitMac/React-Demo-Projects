import { Header } from "./components/Header";

import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
