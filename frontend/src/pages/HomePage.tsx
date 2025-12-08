import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <Shield className="h-20 w-20 text-blue-600" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900">
            JWT Authentication System
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure authentication with Access Tokens and Refresh Tokens.
            Built with React, NestJS, and MongoDB.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};