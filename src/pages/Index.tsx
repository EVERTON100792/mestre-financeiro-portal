
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedCalculators from '@/components/FeaturedCalculators';
import PremiumSpreadsheets from '@/components/PremiumSpreadsheets';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedCalculators />
      <PremiumSpreadsheets />
      <Footer />
    </div>
  );
};

export default Index;
