import { ShieldCheck, FileText, RefreshCw, Truck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolicyLayout = ({ title, icon: Icon, children }) => {
    
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-secondary-foreground">{title}</h1>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;