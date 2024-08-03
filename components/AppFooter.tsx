import Link from 'next/link';
import Image from 'next/image';

const AppFooter: React.FC = () => {
  return (
    <footer>
      <Link href="/">
        <Image src="/logo-break.png" width={60} height={60} alt='推しカレンダー' />
      </Link>
      <ul role='list'>
        <li><Link href="/">トップ</Link></li>
        <li><Link href="/schedules/将棋">将棋棋士一覧</Link></li>
        <li><Link href="/schedules/囲碁">囲碁棋士一覧</Link></li>
        <li>
          <Link href="https://github.com/olff23/oshi-calendar" target='_blank' rel='noreferrer noopener'>
            GitHub
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default AppFooter;
