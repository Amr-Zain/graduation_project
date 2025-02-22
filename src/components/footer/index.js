import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaUserMd, 
  FaUserNurse, 
  FaCalendarAlt, 
  FaCog, 
  FaInfoCircle, 
  FaQuestionCircle 
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

import { HiOutlineMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import { Col, Container, Row } from 'react-bootstrap';
import { 
  PATIENT, 
  APPOINTMENTS, 
  SEARCH,
  DOCTOR,
  NURSE
} from '../../constants/routes';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 mt-5">
      <Container>
        <Row className="g-4">
          {/* Brand Column */}
          <Col md={6} lg={4} className="mb-4">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <Link to="/">
                <img 
                  src='/images/logo-white.png' 
                  alt="Company Logo"
                  className="img-fluid mb-3"
                  style={{ maxWidth: '170px' }}
                />
              </Link>
              <p className="text-center text-lg-start text-muted">
                Your trusted partner in healthcare solutions
              </p>
            </div>
          </Col>

          {/* Quick Links Columns */}
          <Col md={6} lg={4} className="mb-4">
            <Row>
              <Col xs={6}>
                <h5 className="mb-3 text-primary">Search</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to={`/${PATIENT}/${SEARCH}?searchFor=${DOCTOR}`} className="text-white text-decoration-none hover-text-primary">
                      <FaUserMd className="me-2" />
                      Doctor
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link tto={`/${PATIENT}/${SEARCH}?searchFor=${NURSE}`} className="text-white text-decoration-none hover-text-primary">
                      <FaUserNurse className="me-2" />
                      Nurse
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to={`/${PATIENT}/${SEARCH}?searchFor=donation_request`} className="text-white text-decoration-none hover-text-primary">
                      <MdBloodtype className="me-2" />
                      Blood Request
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to={`/${PATIENT}/${SEARCH}?searchFor=donator`} className="text-white text-decoration-none hover-text-primary">
                      <MdBloodtype className="me-2" />
                      Blood Donator
                    </Link>
                  </li>
                </ul>
              </Col>

              <Col xs={6}>
                <h5 className="mb-3 text-primary">Useful Links</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to={`/${PATIENT}/${APPOINTMENTS}`} className="text-white text-decoration-none hover-text-primary">
                      <FaCalendarAlt className="me-2" />
                      Appointments
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/settings" className="text-white text-decoration-none hover-text-primary">
                      <FaCog className="me-2" />
                      Settings
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-white text-decoration-none hover-text-primary">
                      <FaInfoCircle className="me-2" />
                      About
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/help" className="text-white text-decoration-none hover-text-primary">
                      <FaQuestionCircle className="me-2" />
                      Help
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Contact Column */}
          <Col md={12} lg={4} className="mb-4">
            <h5 className="mb-3 text-primary">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <FaHome className="text-primary me-3" size={20} />
                <span>Cairo, EG</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <HiOutlineMail className="text-primary me-3" size={20} />
                <a href="mailto:info@example.com" className="text-white text-decoration-none">
                  info@example.com
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <BsTelephoneFill className="text-primary me-3" size={20} />
                <a href="tel:+0123456788" className="text-white text-decoration-none">
                  +01 234 567 88
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Copyright Section */}
        <div className="text-center py-3 border-top border-secondary mt-4">
          <small className="text-muted">
            © {new Date().getFullYear()} Healthcare App. All rights reserved.
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;