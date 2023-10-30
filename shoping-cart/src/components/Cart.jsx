import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

export function Cart() {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = (await JSON.parse(localStorage.getItem("cart"))) || [];
      const cartWithQuantity = data.map((item) => ({ ...item, quantity: 1 }));
      setCart(cartWithQuantity);

      const totalPrice = calculatePrice(cartWithQuantity);
      setTotalValue(totalPrice);
    };
    getData();
  }, []);

  const calculatePrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = async (itemId) => {
    const updateCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updateCart));

    const newTotalValue = calculatePrice(updateCart);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          setCart(updateCart);
          setTotalValue(newTotalValue);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      const newTotalValue = calculatePrice(updatedCart);
      setTotalValue(newTotalValue);
    }
  };

  return (
    <section className="cart-body">
      <h2 className="cart-heading">
        {cart.length === 0 ? `Your Cart is Empty` : `Items in Your Cart`}
      </h2>
      <section className="cart-mainContainer">
        <section className="cart-item">
          <ul className="cart-container">
            {cart.length > 0
              ? cart.map((item) => {
                  return (
                    <section className="cart-list" key={item.id}>
                      <img
                        className="cart-image"
                        src={item.image}
                        alt={item.title}
                      />
                      <h4 className="cart-heading">{item.title}</h4>
                      <h1>{`${item.price * item.quantity} ₹`}</h1>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                        <MdDeleteOutline />
                      </button>
                    </section>
                  );
                })
              : null}
          </ul>
        </section>
        <section className="total-price">
          <section className="price-heading">
            <h1 className="price-head">
              Total Value In Your Cart: {`${totalValue} ₹`}
            </h1>
          </section>
        </section>
      </section>
    </section>
  );
}
