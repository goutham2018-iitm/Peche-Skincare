import PolicyLayout from './PolicyLayout';
import { Truck } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <PolicyLayout title="Shipping & Delivery Policy" icon={Truck}>
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-6">Last updated on Oct 7th 2025</p>
        
        <p className="mb-4">For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.</p>
        
        <p className="mb-4">Orders are shipped within the applicable timeframe or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.</p>
        
        <p className="mb-4">PECHE EMPIRE is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within the applicable timeframe from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.</p>
        
        <p className="mb-4">Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.</p>
        
        <p className="mb-6">For any issues in utilizing our services you may contact our helpdesk on <a href="tel:+601136693641" className="text-primary hover:underline">+601136693641</a> or <a href="mailto:peche.purpose@gmail.com" className="text-primary hover:underline">peche.purpose@gmail.com</a></p>

        <p className="text-sm text-gray-500 italic">Disclaimer: The above content is created at PECHE EMPIRE's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.</p>
      </div>
    </PolicyLayout>
  );
};

export default ShippingPolicy;