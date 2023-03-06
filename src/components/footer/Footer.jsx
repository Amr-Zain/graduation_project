import React from 'react';
import './footer.css';


import { FaHome } from "react-icons/fa";
import { HiOutlineMail} from "react-icons/hi";
import { BsTelephoneFill} from "react-icons/bs";



import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <section className='text-center text-lg-start  footer pt-3 mt-4'>
        <section className=''>
          <Container className='text-center text-md-start mt-4'>
            <Row className='mt-0'>
              <Col md='3' lg='4' xl='3' className='mx-auto mb-2'>
                <div className="image-left">

                  <img src='/images/logo-white.png' width={170} />

                </div>
                <p>
                  {/* Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. */}
                </p>
              </Col>

              <Col md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Search By</h6>
                <p>
                  <a href='#!' className='text-reset'>

                    Doctor

                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Nurse

                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Blood Bank

                  </a>
                </p>
             
              </Col>

              <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Appointments
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Settings
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Abouts
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Helps
                  </a>
                </p>
              </Col>

              <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-3'>Contact</h6>
                <p>
                  <FaHome color='secondary' icon='home' className='me-2' />
                  New York, NY 10012, US
                </p>
                <p>
                  <HiOutlineMail color='secondary' icon='envelope' className='me-3' />
                  info@example.com
                </p>
                <p>
                  <BsTelephoneFill color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                </p>
               
              </Col>
            </Row>
          </Container>
        </section>
      </section>


    </>
  );
}

export default Footer;
