import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/sell">
      <a className='mt-2'>Sell!</a>
    </Link>
    <Link href="/">
      <a>Home!</a>
    </Link>
  </div>
);

export default Nav;
