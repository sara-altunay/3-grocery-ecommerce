import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-green-900 text-white p-5 text-center ">
      Grocery Market © {new Date().getFullYear()} All rights reserved.
    </footer>
  );
};

export default Footer;
