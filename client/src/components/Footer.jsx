/* eslint-disable no-unused-vars */

import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Left: All Rights Reserved */}
        <p className="text-center lg:text-left">© All Rights Reserved 2024</p>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-4">
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>

          <a href="" className="hover:text-primary-100">
            <FaInstagram />
          </a>

          <a href="" className="hover:text-primary-100">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
