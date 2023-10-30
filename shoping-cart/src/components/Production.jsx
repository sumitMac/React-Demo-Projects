import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

export function Production() {
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    } catch (error) {
      throw new Error("something Wrong", error);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  if (isPending) {
    return (
      <section className="loading">
        <img
          src="https://media0.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif?cid=ecf05e472st0k3v8z4waynrp54o5sm4bk4o4ua2yxmdls7xn&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="loading-img"
        />
      </section>
    );
  }
  if (error) return "An error has occurred: " + error.message;

  const itemPerPage = 12;
  const itemOfLastIndex = currentPage * itemPerPage;
  const itemOfFristIndex = itemOfLastIndex - itemPerPage;
  const currentItem = data?.slice(itemOfFristIndex, itemOfLastIndex) || [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = async (item) => {
    const Data = (await JSON.parse(localStorage.getItem("cart"))) || [];
    localStorage.setItem("cart", JSON.stringify([...Data, item]));
    Swal.fire("Saved!", "", "success");
  };

  return (
    <>
      <section className="product-container">
        {currentItem.map((item) => (
          <section className="cart-data" key={item.id}>
            <img className="item-image" src={item.image} alt={item.title} />
            <h4 className="item-heading">{item.title}</h4>
            <h1>{`${item.price} ₹`}</h1>
            <h2>{item.rating.rate}</h2>
            <button className="add-btn" onClick={() => addToCart(item)}>
              Add to Cart
              <FaCartPlus />
            </button>
          </section>
        ))}
      </section>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemPerPage) }).map(
          (_, index) => (
            <li
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
            >
              <button className="li-btn" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
}
