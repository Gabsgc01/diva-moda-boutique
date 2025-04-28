
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 mb-6">
              Your order has been received and is being processed.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-lg font-medium mb-4">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Order Number:</p>
                  <p className="font-medium">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date:</p>
                  <p className="font-medium">{orderDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Method:</p>
                  <p className="font-medium">Credit Card</p>
                </div>
                <div>
                  <p className="text-gray-500">Shipping Method:</p>
                  <p className="font-medium">Standard Shipping</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to your email address with all the details 
              of your order. If you have any questions, please contact our customer support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/">Track Your Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
