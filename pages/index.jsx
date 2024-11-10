import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import ProductCard from "../components/ProductCard";
import { useGetAllProducts } from "../services/queries";
import Pagination from "../components/Pagination";
import styles from "./index.module.css"


function ProductsPage() {
  const [page, setPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const changeHandler = (e) => {
      setSearchTerm(e.target.value);
    };
    

  const { data, error, isPending } = useGetAllProducts(page);

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>Something went wrong!</p>;
   const filteredProducts = data?.data?.filter((product) =>
     product.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <label htmlFor="#name">جستجو کالا : </label>
        <input
          id="name"
          type="text"
          placeholder="جستجوی کالا"
          value={searchTerm}
          onChange={changeHandler}
        />
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          افزودن محصول
        </button>
      </div>

      <div className={styles.containerList}>
        <ul className={styles.contacts}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          <Pagination
            page={page}
            setPage={setPage}
            products={filteredProducts}
          />

          {/* <button onClick={() => setPage(2)}>go to page #2</button> */}
        </ul>
        {modalOpen && (
          <AddProductForm data={data} closeModal={() => setModalOpen(false)} />
        )}
        {/* <AddProductForm /> */}
      </div>
    </div>
  );
}

export default ProductsPage;
