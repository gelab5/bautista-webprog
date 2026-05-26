import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { registerUser } from '../../UserService';

const inputClasses = 'w-full border-2 border-pink-100 bg-white px-4 py-3 text-sm text-zinc-900 outline-none rounded-xl transition placeholder-zinc-400 focus:border-pink-400';
const selectClasses = 'w-full border-2 border-pink-100 bg-white px-4 py-3 text-sm text-zinc-900 outline-none rounded-xl transition focus:border-pink-400';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerUser({
        firstName, lastName, email, password,
        username, age, gender, contactNumber, address,
        role: 'viewer',
      });
      setSuccess('Account created successfully! Redirecting to sign in...');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-md">

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            Owner Access
          </p>
          <h1 className="text-4xl font-black leading-tight text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Register to gain access and manage your portfolio — add projects, update content, and more.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                {success}
              </p>
            )}

            {/* First Name & Last Name */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">First Name</label>
                <input type="text" placeholder="Angela" className={inputClasses}
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Last Name</label>
                <input type="text" placeholder="Bautista" className={inputClasses}
                  value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Email</label>
              <input type="email" placeholder="angela@email.com" className={inputClasses}
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Username</label>
              <input type="text" placeholder="angelabautista" className={inputClasses}
                value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Password</label>
              <input type="password" placeholder="••••••••" className={inputClasses}
                value={password} onChange={(e) => setPassword(e.target.value)} required />
              <p className="text-xs text-gray-400 mt-1">Use a secure password with letters, numbers, and symbols.</p>
            </div>

            {/* Age & Gender */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Age</label>
                <input type="number" placeholder="21" className={inputClasses}
                  value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Gender</label>
                <select className={selectClasses} value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Contact Number</label>
              <input type="text" placeholder="09123456789" className={inputClasses}
                value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Address</label>
              <input type="text" placeholder="123 Main St, Manila" className={inputClasses}
                value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <Button variant="primary" className="w-full mt-2" type="submit">
              Create Account
            </Button>
          </form>

          <div className="mt-6 border-t-2 border-pink-100 pt-6 text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-pink-400 hover:text-pink-600 transition">
              Sign In
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SignUpPage;