import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../UserService';

const inputClasses = 'w-full border-2 border-pink-100 bg-white px-4 py-3 text-sm text-zinc-900 outline-none rounded-xl transition placeholder-zinc-400 focus:border-pink-400';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });

      const role = data.user.role;
      const firstName = data.user.firstName;

      // Viewers cannot log in to the dashboard
      if (role === 'viewer') {
        setError('Viewer accounts do not have dashboard access.');
        setLoading(false);
        return;
      }

      // Save to localStorage for admin and editor only
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role);         // ✅ was 'type', now 'role'
      localStorage.setItem('firstName', firstName); // ✅ was data.firstName, now data.user.firstName

      navigate('/dashboard', { state: { firstName, role } });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
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
            Sign In
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Welcome back! Sign in to manage and update your portfolio content.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Email
              </label>
              <input
                type="email"
                placeholder="angela@email.com"
                className={inputClasses}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={inputClasses}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-400 mt-1 text-right cursor-pointer hover:text-pink-400 transition">
                Forgot your password?
              </p>
            </div>

            <Button variant="primary" className="w-full mt-2" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-pink-100" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">or</span>
              <div className="h-px flex-1 bg-pink-100" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="secondary" className="w-full">Sign In with Google</Button>
              <Button type="button" variant="secondary" className="w-full">Sign In with Apple</Button>
            </div>
          </form>

          <div className="mt-6 border-t-2 border-pink-100 pt-6 text-sm text-gray-500 text-center">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-semibold text-pink-400 hover:text-pink-600 transition">
              Register here
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SignInPage;