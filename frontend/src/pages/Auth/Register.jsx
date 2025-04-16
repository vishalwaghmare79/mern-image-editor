import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await register(formData);
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-black">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />

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
            placeholder="Create a strong password"
          />

          <Button 
            type="submit"
            className="mt-4 bg-blue-700 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/')}
            className="text-blue-300 hover:text-blue-200 hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;