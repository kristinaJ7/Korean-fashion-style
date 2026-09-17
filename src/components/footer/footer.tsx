import { useNavigate } from "react-router-dom";
import FooterUI from "../ui/footer/footer";
import React from "react";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const onNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault(); // блокируем стандартный переход браузера
    console.log("Footer link clicked:", href);
    navigate(href);
  };

  return <FooterUI onNavLinkClick={onNavLinkClick} />;
};

export default Footer;
