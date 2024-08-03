import Link from 'next/link';
import Image from 'next/image';

const AppHeader: React.FC = () => {
  return (
    <header>
      <h1>
        <Link href="/">
          <Image src="/logo-title-nobreak.png" width={320} height={60} priority alt='推しカレンダー' />
        </Link>
      </h1>
    </header>
  );
};

export default AppHeader;
