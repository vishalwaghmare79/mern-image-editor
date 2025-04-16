import React, { useState } from 'react';
import { getCurrentUser, login } from '../../services/authService';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.data.token);

      const user = await getCurrentUser();
      setUser(user);

      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-black">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />

          <Button 
            type="submit"
            className="mt-4 bg-blue-700 hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-300 hover:text-blue-200 hover:underline focus:outline-none"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;