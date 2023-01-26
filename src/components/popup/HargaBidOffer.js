import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './HargaBidOffer.css'
import {hargaBidOffer} from "../dummy/hargabidofffer"    

function HargaBidOffer({ show, setShow, setShowRegister }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className='bg-title'>
              <Modal.Title className='title'>
                Stock Order List Specific
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className=''> 
                <table className='w-100'>

                    <thead className='text-title-bidoffer title-stock'>
                        <tr>
                          <td>Stock</td>
                          <td>Name</td>
                          <td>Change</td>
                          <td>Last</td>
                          <td>Open</td>
                          <td>High</td>
                          <td>Low</td>
                          <td>Prev</td>
                        </tr>
                    </thead>
                    <tbody className='text-detail '>
                      <tr>
                        <td>{hargaBidOffer.stock}</td>
                        <td>{hargaBidOffer.name}</td>
                        <td>+{hargaBidOffer.change}</td>
                        <td>{hargaBidOffer.last}</td>
                        <td>{hargaBidOffer.open}</td>
                        <td>{hargaBidOffer.high}</td>
                        <td>{hargaBidOffer.low}</td>
                        <td>{hargaBidOffer.prev}</td>
                      </tr>
                    </tbody>
                </table>
                <table className='w-100'>

                    <thead className='text-title-bidoffer title-stock'>
                      
                          <tr>
                            <td>No</td>
                            <td>Order Time</td>
                            <td>Order No</td>
                            <td>Price</td>
                            <td>Volume</td>
                            <td>Traded</td>
                            <td>Remain</td>
                          </tr>
                       
                    </thead>
                    <tbody className='text-detail' >
                      {hargaBidOffer.orderTime.map((item, index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{item.ordertime}</td>
                        <td>{item.orderno}</td>
                        <td>{item.price}</td>
                        <td>{item.volume}</td>
                        <td>{item.traded}</td>
                        <td>{item.remain}</td>
                      </tr>
                      ))}

                    </tbody>
                </table>
              </div>              
            </Modal.Body>
          </Modal>
    
    </>
  );
}
export default HargaBidOffer;
