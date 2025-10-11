import PolicyLayout from './PolicyLayout';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <PolicyLayout title="Privacy Policy" icon={ShieldCheck}>
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-6">Last updated on Oct 7th 2025</p>

        <p className="mb-4">This privacy policy sets out how PECHE EMPIRE uses and protects any information that you give PECHE EMPIRE when you visit their website and/or agree to purchase from them.</p>

        <p className="mb-4">PECHE EMPIRE is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.</p>

        <p className="mb-6">PECHE EMPIRE may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you adhere to these changes.</p>

        <h3 className="text-xl font-semibold mb-3 text-primary">Information We Collect</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Name</li>
          <li>Contact information including email address</li>
          <li>Demographic information such as postcode, preferences and interests, if required</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3 text-primary">What We Do With The Information</h3>
        <p className="mb-3">We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Internal record keeping.</li>
          <li>We may use the information to improve our products and services.</li>
          <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
          <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail.</li>
          <li>We may use the information to customise the website according to your interests.</li>
        </ul>
        
        <p className="mb-6">We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.</p>
        
        <h3 className="text-xl font-semibold mb-3 text-primary">How We Use Cookies</h3>
        <p className="mb-4">A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site.</p>
        
        <p className="mb-4">We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs.</p>
        
        <p className="mb-6">Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
        
        <h3 className="text-xl font-semibold mb-3 text-primary">Controlling Your Personal Information</h3>
        <p className="mb-3">You may choose to restrict the collection or use of your personal information in the following ways:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
          <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us</li>
        </ul>
        
        <p className="mb-4">We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.</p>
        
        <p className="mb-6">If you believe that any information we are holding on you is incorrect or incomplete, please write to No.57, Jalan Wangsa Jaya 2, Taman Wangsa Jaya 53300 Kuala Lumpur or contact us as soon as possible. We will promptly correct any information found to be incorrect.</p>
        
        <p className="text-sm text-gray-500 italic">Disclaimer: The above content is created at PECHE EMPIRE's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.</p>
      </div>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;