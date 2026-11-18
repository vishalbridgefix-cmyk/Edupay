import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    console.log("Login Data:", loginData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-[#f7f7fb]">
      <div className="mx-auto flex h-full w-full max-w-[1600px] justify-center bg-white">
        <section className="flex w-full items-center justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-4">
          <div className="w-full max-w-xl">
            <h2 className="text-2xl font-bold text-[#19182f] sm:text-3xl">
              Welcome to EduPay
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in or create your account to continue.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-8">
              <div>
                <h3 className="text-xl font-bold text-[#19182f]">
                  Good to see you again
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Use your EduPay account details to sign in.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-7 space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`auth-input ${
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`auth-input pr-20 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 text-xs font-bold text-violet-600 hover:text-violet-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="h-4 w-4 rounded border-gray-300 accent-violet-600"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="font-semibold text-violet-600 hover:text-violet-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-violet-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
                >
                  Sign in →
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-500">
                New to EduPay?
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="ml-2 font-bold text-violet-600 hover:text-violet-800"
                >
                  Create an account
                </button>
              </p>

              <div className="my-7 border-t border-gray-200" />

              <div>
                <h4 className="text-xs font-bold text-[#19182f]">
                  Role-based access
                </h4>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Your dashboard and permissions depend on your account role.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-violet-50 px-4 py-4 text-xs font-semibold text-violet-600">
                    Learner · Instructor
                  </div>

                  <div className="rounded-xl bg-gray-50 px-4 py-4 text-xs font-semibold text-gray-500">
                    Admin · Authorized only
                  </div>
                </div>

                <p className="mt-3 text-[10px] leading-4 text-gray-400">
                  By continuing, you agree to our Terms and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
