
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Diva Moda</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A premium women's fashion boutique, crafting elegant and timeless pieces for the modern woman.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2015, Diva Moda began as a small boutique in the heart of the city with a vision to provide women with high-quality, stylish clothing that empowers them to express their unique personality.
                </p>
                <p className="text-gray-600 mb-4">
                  Our founder, Maria Silva, started this journey with a passion for fashion and a dream to create a brand that celebrates femininity in all its forms. With an eye for exquisite fabrics and timeless designs, Maria curated collections that quickly gained popularity.
                </p>
                <p className="text-gray-600">
                  Today, Diva Moda has grown into a beloved brand known for its commitment to quality, attention to detail, and designs that blend contemporary trends with classic elegance. We continue to be guided by our founding principles: quality craftsmanship, ethical practices, and making women feel beautiful.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/assets/placeholder.svg"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                At Diva Moda, we believe that fashion is more than just clothing—it's a form of self-expression. Our mission is to create thoughtfully designed pieces that make women feel confident, beautiful, and authentic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Quality</h3>
                  <p className="text-gray-600">
                    We use only the finest fabrics and materials, ensuring each piece is made to last.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                  <p className="text-gray-600">
                    We're committed to ethical manufacturing and reducing our environmental impact.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
                  <p className="text-gray-600">
                    We design for women of all shapes, sizes, and backgrounds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Behind Diva Moda is a team of passionate individuals dedicated to bringing you the best in women's fashion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div>
                <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-4">
                  <img
                    src="/assets/placeholder.svg"
                    alt="Maria Silva - Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Maria Silva</h3>
                <p className="text-primary">Founder & Creative Director</p>
              </div>
              
              {/* Team Member 2 */}
              <div>
                <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-4">
                  <img
                    src="/assets/placeholder.svg"
                    alt="Sofia Rodriguez - Head Designer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Sofia Rodriguez</h3>
                <p className="text-primary">Head Designer</p>
              </div>
              
              {/* Team Member 3 */}
              <div>
                <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-4">
                  <img
                    src="/assets/placeholder.svg"
                    alt="Carla Mendez - Production Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Carla Mendez</h3>
                <p className="text-primary">Production Manager</p>
              </div>
              
              {/* Team Member 4 */}
              <div>
                <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-4">
                  <img
                    src="/assets/placeholder.svg"
                    alt="Lucas Ferreira - Marketing Director"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Lucas Ferreira</h3>
                <p className="text-primary">Marketing Director</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Experience Diva Moda</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Discover our latest collection and experience the quality and style that defines Diva Moda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
