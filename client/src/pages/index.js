import Image from "next/image";
import Index from "./landingPage/index";

import NearLogo from "/public/near.svg";
import NextLogo from "/public/next.svg";
import styles from "@/styles/app.module.css";
import { Cards } from "@/components/cards";

export default function Home() {
  return (
    <div>
      <Index />
    </div>
  );
}
