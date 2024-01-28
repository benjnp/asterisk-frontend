import Footer from './Footer';
import Header from './Header';

const BoxSaleLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </section>
  );
};

export default BoxSaleLayout;
