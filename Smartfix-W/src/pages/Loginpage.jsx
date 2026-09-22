import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Connects to backend API and checks user in the database
      await login(email, password);
      navigate("/admin/blogs");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setEmail("admin@smartfixautomation.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020d1a]" id="login">
      {/* Top navigation */}
      <div className="p-4 sm:p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={16} /> Back to SmartFix
        </Link>
      </div>

      {/* Main Login Area */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img
                src={Logo}
                alt="SmartFix Automation"
                className="h-auto w-40 object-contain sm:w-48 md:w-56"
              />
            </Link>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/40 sm:rounded-3xl sm:p-8">
            {/* Heading */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                <ShieldCheck size={24} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back
              </h1>

              <p className="mx-auto mt-1.5 max-w-xs text-xs sm:text-sm text-slate-500">
                Sign in to continue to your account.
              </p>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Access is restricted to authorized users only.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs sm:text-sm text-red-700">
                <AlertCircle size={18} className="shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Checking credentials...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Access Notice */}
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-center text-xs leading-5 text-slate-500">
                If you are not an authorized user, please contact your administrator for access.
              </p>
            </div>

            {/* Quick Default Admin Credentials Helper */}
            <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-900">Default Admin Account:</span>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="font-bold text-blue-700 underline hover:text-blue-900"
                >
                  Auto-fill
                </button>
              </div>
              <p className="mt-1 text-[0.7rem] text-blue-600">
                Email: admin@smartfixautomation.com | Password: admin123
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-slate-500">
          © 2026 SmartFix Automation. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Loginpage;
