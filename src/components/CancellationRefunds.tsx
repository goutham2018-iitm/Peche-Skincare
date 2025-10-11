import PolicyLayout from './PolicyLayout';
import { RefreshCw } from 'lucide-react';

const CancellationRefunds = () => {
  return (
    <PolicyLayout title="Cancellation & Refund Policy" icon={RefreshCw}>
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-6">Last updated on Oct 7th 2025</p>
        
        <p className="mb-6">PECHE EMPIRE believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
        
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>Cancellations will be considered only if the request is made within the applicable timeframe of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
          <li>PECHE EMPIRE does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
          <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the applicable timeframe of receipt of the products.</li>
          <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the applicable timeframe of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
          <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
          <li>In case of any Refunds approved by the PECHE EMPIRE, it'll take the standard processing time for the refund to be processed to the end customer.</li>
        </ul>
        
        <p className="text-sm text-gray-500 italic">Disclaimer: The above content is created at PECHE EMPIRE's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.</p>
      </div>
    </PolicyLayout>
  );
};

export default CancellationRefunds;