import { useState } from "react";
import { Production } from "./Production";
import img1 from "./images/img1.jpeg";
import img2 from "./images/img2.jpeg";
import img3 from "./images/img3.jpeg";
import img4 from "./images/img4.jpeg";
import img5 from "./images/img5.jpeg";
import img6 from "./images/img6.jpeg";
import img7 from "./images/img7.jpeg";
import img8 from "./images/img8.jpeg";
import img9 from "./images/img9.jpeg";
import img10 from "./images/img10.jpeg";
import img11 from "./images/img11.jpeg";
import { GrNext, GrPrevious } from "react-icons/gr";

const imagesList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

export function Container() {
  const [searchInput, setSearchInput] = useState("");
  const [currentImageIndex, setImageIndex] = useState(0);
  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
  };
  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesList.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="main-container">
      <section className="images-container-main">
        <button className="image-prev-btn" onClick={handlePrevImage}>
          <GrPrevious />
        </button>
        <img src={imagesList[currentImageIndex]} alt="" />

        <button className="image-next-btn" onClick={handleNextImage}>
          <GrNext />
        </button>
      </section>

      <section className="product-search">
        <input
          placeholder="Search here"
          className="search-input"
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <img src="search.svg" alt="search-icon" />
        </button>
      </section>
      <Production />
    </section>
  );
}
