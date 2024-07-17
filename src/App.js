import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { IoCartOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { RiLoopLeftLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('2021-10-07T18:48');
  const [warehouse, setWarehouse] = useState('Asosiy ombor');
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users/getUsers')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Ma\'lumotlarni yuklashda xato:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleWarehouseChange = (value) => {
    setWarehouse(value);
  };

  const handleSearch = () => {
    axios.get(`http://localhost:5000/users/getUsers?fullname=${searchTerm}`)
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Qidirishda xato:', error);
      });
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.fullname && product.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === '' || product.category === category)
  );

  return (
    <div className="container">
      <div className="NavBox">
        <div className="NavYozuv">
          <p><CiCircleQuestion /></p>
          <h1>Aylanishlar</h1>
          <b><RiLoopLeftLine /></b>
        </div>
        <div className="NavBtnBox">
          <button className='Btn1'>Tovarlar bo'yicha</button>
          <button className='Btn2'>Omborlar bo'yicha</button>
        </div>
        <button className='Btn3'>Filtr</button>
      </div>
      <div className="Search_bar">
        <div className="Search_nav">
          <div className="Search_btn">
            <button className='Search_btn1' ><p>Qidiruv</p></button>
            <button className='Search_btn2'></button>
            <button className='QaytaTayyorlash_btn'></button>
            <button className='Search_btn4'>< CiSettings /></button>
          </div>
          <div className="Search_Inp">
            <input
              className='Search_Inp1'
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="Search_Sklat">
          <div className="Filter_bar">
            <div className="filter_item">
              <div className="filter_item1">
                <p>Tovarlar qismi</p>
              </div>
              <div className="filter_item2">
                <p>Ombor</p>
              </div>
            </div>
            <div className="Filter_box">
              <div className="filter_box1">
                <select className='Inp1' onChange={(e) => handleCategoryChange(e.target.value)}>
                  <option value="">Tanlang</option>
                  <option value="option1">Variant 1</option>
                  <option value="option2">Variant 2</option>
                  <option value="option3">Variant 3</option>
                </select>
              </div>
              <div className="filter_box2">
                <select className='Inp2' onChange={(e) => handleWarehouseChange(e.target.value)}>
                  <option value="">Tanlang</option>
                  <option value="option1">Variant 1</option>
                  <option value="option2">Variant 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Qoldiq</th>
            <th>Rezerv</th>
            <th>Mavjud</th>
            <th>Tan narxi</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item, index) => (
            <tr key={index} onClick={() => handleOpen(item)}>
              <td>{item.fullname}</td>
              <td>{item.qoldiq}</td>
              <td>{item.rezevr}</td>
              <td className='Icon'>{item.mavjud}<IoCartOutline /></td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel="Product Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <div className="modal-content">
            <h2>{selectedProduct.fullname}</h2>
            <p>Qoldiq: {selectedProduct.qoldiq}</p>
            <p>Rezerv: {selectedProduct.rezevr}</p>
            <p>Mavjud: {selectedProduct.mavjud}</p>
            <p>Tan narxi: {selectedProduct.price}</p>
            <button onClick={handleClose} className="close-button">Yopish</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
