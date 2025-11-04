import { FaLeaf, FaMoneyBillWave } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const options = [
  {
    icon: <MdLocalShipping />,
    title: "Fast Delivery",
    description: "Same-day delivery",
    bgColor: "bg-blue-100",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Products",
    description: "Fresh products daily",
    bgColor: "bg-green-100",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Great Prices",
    description: "Affordable pricing",
    bgColor: "bg-yellow-100",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Shopping",
    description: "Safe and secure",
    bgColor: "bg-red-100",
  },
];

export { options };
