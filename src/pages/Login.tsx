import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button, Input, Card, CardContent } from '../components/ui';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const success = login(email);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try admin@company.com');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded flex items-center justify-center font-bold text-xl text-white">P</div>
          <span className="font-bold text-3xl text-slate-800 tracking-tight">ProMonitor</span>
        </div>
        <h2 className="mt-6 text-center text-sm font-bold tracking-widest uppercase text-slate-400">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="px-10 py-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded text-sm border border-red-100 font-bold">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email address
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@company.com"
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Any password works"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full h-11 text-sm tracking-wider uppercase">
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
