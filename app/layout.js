import { Forum } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Providers from '../providers';

const inter = Forum({ subsets: ['cyrillic'],weight: ["400"], });

export const metadata = {
  title: 'Martix',
  description: 'Матрица Эйзенхауэра',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className } >
        <div className='m-auto min-w-[300px] max-w-8xl p-4'>
        <Providers>
          <Navbar></Navbar>
          {children}
        </Providers>
        </div>
      </body>
    </html>
  );
}
