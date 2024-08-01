import Image from "next/image";
import Link from "next/link";
// import iyama from "./000385.json";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/schedules/囲碁">囲碁</Link>
        </li>
        <li>
          <Link href="/schedules/将棋">将棋</Link>
        </li>
      </ul>
    </main>
  );
}
