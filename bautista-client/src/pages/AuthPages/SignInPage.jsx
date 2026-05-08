import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = 'w-full border-2 border-pink-100 bg-white px-4 py-3 text-sm text-zinc-900 outline-none rounded-xl transition placeholder-zinc-400 focus:border-pink-400';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/dashboard');
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

          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Email
              </label>
              <input type="email" placeholder="angela@email.com" className={inputClasses} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Password
              </label>
              <input type="password" placeholder="••••••••" className={inputClasses} />
              <p className="text-xs text-gray-400 mt-1 text-right cursor-pointer hover:text-pink-400 transition">
                Forgot your password?
              </p>
            </div>

            <Button variant="primary" className="w-full mt-2" type="submit">
              Sign In
            </Button>
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