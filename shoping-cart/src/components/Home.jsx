import { Container } from "./Container";
import { Footer } from "./Footer";
import axios from "axios";

export function Home() {
  return (
    <section className="home">
      <Container />
      <Footer />
    </section>
  );
}

export const dataLoader = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    throw new Error("something Wrong", error);
  }
};
