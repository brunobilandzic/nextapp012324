import React, { useState } from "react";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import styles from "./layout.module.css";

import { navbarItems } from "../../constants";
import Link from "next/link";
import { FaAlignJustify } from "react-icons/fa6";

export default function Layout({ children }) {
  return (
    <div className="container">
      <NavbarComponent />
      {children}
    </div>
  );
}

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const getNavItems = () => {
    return navbarItems.map((navItem) => (
      <div className={`${styles.navItem}`} key={navItem.displayText}>
        <Link href={navItem.linkTo}>{navItem.displayText}</Link>
      </div>
    ));
  };

  return (
    <dev className={`${styles.navbar}`}>
      <div
        className={`${styles.navbarRow} d-flex w justify-content-between align-items-center`}>
        <div className={`${styles.brand}`} href="/">
          Next 12324
        </div>
        <div className={`${styles.navItemsDesktop} mr-auto`}>
          {getNavItems()}
        </div>
        <div className={`${styles.toggler}`} onClick={toggle}>
          <FaAlignJustify />
        </div>
      </div>
      <div className={`${styles.navItemsMobile} ${!isOpen && "removed"}`}>
        {getNavItems()}
      </div>
    </dev>
  );
}
