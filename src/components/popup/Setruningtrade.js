import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './Setruningtrade.css'
function Setruningtrade({ show, setShow, setShowRegister }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className='bg-title'>
              <Modal.Title className='title'>
                Set Running Trade
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message && message}
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                > 
                  <Form.Label>Stock Type</Form.Label>
                   <div className='d-lg-flex justify-content-between'>
                        <div>
                            <input type="checkbox" id="regular" name="regular" />
                            <label for="regular" className='ml-2'>Regular</label>
                        </div>
                        <div>
                            <input type="checkbox" id="right" name="right"/>
                            <label for="right" className='ml-2'>Right</label>
                        </div>
                        <div>
                            <input type="checkbox" id="warrant" name="warrant" />
                            <label for="warrant" className='ml-2'>Warrant</label>
                        </div>
                        <div>
                            <input type="checkbox" id="mutualfund" name="mutualfund"/>
                            <label for="mutualfund" className='ml-2'>MutualFunf(ETF)</label>
                        </div>
                  </div>
                  <hr/>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Constituent</Form.Label>
                  <div className="d-lg-flex justify-content-between">  
                    <div className='mr-2'>
                        <input type="radio" id="composite" name="constituent" value="composite"/>
                        <label for="composite" className='ml-2'>Composite</label>
                    </div>
                    <div className='mr-2'>
                        <input type="radio" id="lq45" name="constituent" value="lq45"/>
                        <label for="lq45" className='ml-2'>LQ45</label>
                    </div>
                    <div className='mr-2'>
                        <input type="radio" id="IDX30" name="constituent" value="IDX30"/>
                        <label for="IDX30" className='ml-2'>IDX30</label>
                    </div>
                    <div className='mr-2'>
                        <input type="radio" id="Kompas100" name="constituent" value="Kompas100"/>
                        <label for="Kompas100" className='ml-2'>Kompas100</label>
                    </div>
                    </div>
                    <div className='d-lg-flex justify-content-start'>
                    <div className='mr-4'>
                        <input type="radio" id="ISSI" name="constituent" value="ISSI"/>
                        <label for="ISSI" className='ml-2'>ISSI</label>
                    </div>
                    <div className=''>
                        <input type="radio" id="Watchlist" name="constituent" value="Watchlist"/>
                        <label for="Watchlist" className='ml-2'>Watchlist</label>
                    </div>
                </div>
                <hr/>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                > 
                  <Form.Label>Condition</Form.Label>
                   <div className='d-lg-flex justify-content-between '>
                        
                          <div className='mb-2 mr-5 d-flex ' >
                              <input type="checkbox" id="" name="" />
                              <input  className='ml-2 mt-1 mr-3 input-condition'  /> 
                              &lsaquo; = Last
                          </div>
                          <div >
                          &lsaquo; = 
                          <input  className='ml-2 mb-2 input-condition'/> 
                          </div>  
                        
                  </div>
                  <div className='d-lg-flex justify-content-between'>
                        
                        <div className='mb-2 '>
                          <input type="checkbox" id="" name="" />
                          <input  className='ml-2 mr-2 input-condition'/> &lsaquo; = Change(%)
                        </div>
                        <div>
                        &lsaquo; = 
                        <input  className='ml-2 input-condition'/> 
                        </div>  
                      
                </div>
                  <hr/>
                </Form.Group>
                <div className='text-right'>
                  <button className="btn  btn-sm  text-dark w-25  btn-oke"  type="submit">
                    Ok
                  </button>
                </div>

              </Form>
            </Modal.Body>
          </Modal>
    
    </>
  );
}
export default Setruningtrade;
