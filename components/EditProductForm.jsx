import React from 'react'
import { useState,useEffect } from 'react';
import { useEditProduct } from '../services/mutations';
import styles from "./EditProductForm.module.css";
function EditProductForm({data,closeModal}) {
     const [name, setName] = useState("");
     const [price, setPrice] = useState("");
     const [quantity, setQuantity] = useState("");
      useEffect(() => {
        if (data) {
            console.log(data)
          setName(data.name);
          setPrice(data.price);
          setQuantity(data.quantity);
          
        }
      }, [data]);
     const { mutate } = useEditProduct();
     const editHandler = (e) => {
  e.preventDefault();
  
  const dataToUpdate = {
    name,
    price,
    quantity,
  };

  mutate(
    { id: data.id, data: dataToUpdate }, // ارسال ID و داده‌ها
    {
      onSuccess: (data) => {
        console.log(data);
        closeModal();
      },
      onError: (error) => {
        console.error("Error updating product:", error);
      },
    }
  );
};



    //  const editHandler = (e) => {
    //    e.preventDefault(); // جلوگیری از بارگذاری مجدد صفحه
    //    const dataToUpdate = {
    //      id: data.id, // فرض بر این است که data دارای id باشد
    //      name,
    //      price,
    //      quantity,
    //    };

    //    mutate(
    //      { data: dataToUpdate },
    //      {
    //        onSuccess: (data) => {
    //          console.log(data);
    //          closeModal(); // بستن مودال در صورت موفقیت
    //        },
    //        onError: (error) => {
    //          console.log(error);
    //        },
    //      }
    //    );
    //  };


    //  const editHandler = (id) => {
    //    const data = {
    //      ids: [id],
    //    };

    //    console.log(data);

    //    mutate(
    //      { data },
    //      {
    //        onSuccess: (data) => {
    //          console.log(data);
    //        },
    //        onError: (error) => {
    //          console.log(error);
    //        },
    //      }
    //    );
    //  };
   
    
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <h1 className={styles.title}>ویرایش اطلاعات</h1>
        <form className={styles.registrationform} onSubmit={editHandler}>
          <input
            type="text"
            name="name"
            placeholder="نام کالا"
            className={styles.inputfield}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            name="price"
            placeholder="قیمت  "
            className={styles.inputfield}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            name="quantity"
            placeholder="تعداد "
            className={styles.inputfield}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="buttons">
            <button type="submit" className={styles.submitbutton1}>
              ویرایش
            </button>
            <button
              type="submit"
              className={styles.submitbutton2}
              onClick={closeModal}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm