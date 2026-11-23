import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/auth/FormInput";

import { UserPlus } from "lucide-react";

const roles = ["Learner", "Instructor", "Admin"];

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Learner");
  const [showPassword, setShowPassword] = useState(false);

  const profileImageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s()-]{10,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must contain at least 10 digits.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (role === "Admin") {
      newErrors.role =
        "Admin accounts can only be created through an authorized process.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      ...(name === "password" ? { confirmPassword: "" } : {}),
      ...(name === "confirmPassword" ? { confirmPassword: "" } : {}),
    }));
  };

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profileImage: "Please select a valid image.",
      }));

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profileImage: "Image size must be less than 5MB.",
      }));

      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    profileImageRef.current = file;

    setImagePreview(URL.createObjectURL(file));

    setErrors((prevErrors) => ({
      ...prevErrors,
      profileImage: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const registerData = {
      role,
      fullName: formData?.fullName.trim(),
      email: formData?.email.trim(),
      phone: formData?.phone.trim(),
      password: formData?.password,
      profileImage: profileImageRef.current,
    };

    console.log("Register Data:", registerData);

    // Connect your registration API here.
    // confirmPassword is used for validation and is not sent.
  }

  return (
    <main className="min-h-screen w-full bg-[#f7f7fb]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] justify-center bg-white">
        <section className="flex w-full justify-center px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="w-full max-w-2xl">
            <div className="mb-7">
              <h2 className="text-2xl font-bold tracking-tight text-[#19182f] sm:text-3xl">
                Welcome to EduPay
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Create your account and start your learning journey.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-9">
              <div className="mb-7">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <UserPlus />
                </div>

                <h3 className="text-xl font-bold text-[#19182f] sm:text-2xl">
                  Create your EduPay account
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Fill in your details to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Create account as
                  </label>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {roles.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => {
                          setRole(item);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            role: "",
                          }));
                        }}
                        className={`rounded-xl border px-2 py-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                          role === item
                            ? "border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-100"
                            : "border-gray-200 bg-white text-gray-500 hover:border-violet-300 hover:bg-violet-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {role === "Admin" && (
                    <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
                      Admin access should only be granted through an authorized
                      process.
                    </p>
                  )}

                  {errors.role && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.role}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100" />

                <div>
                  <h4 className="mb-4 text-sm font-bold text-[#19182f]">
                    Personal information
                  </h4>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput
                      label="Full name"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      className="sm:col-span-2"
                    />

                    <FormInput
                      label="Email address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />

                    <FormInput
                      label="Phone number"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profileImage"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Profile image
                    <span className="ml-2 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="flex flex-col gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-100 bg-violet-50 text-sm font-bold text-violet-600">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "IMG"
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full cursor-pointer text-xs text-gray-500 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-violet-100 file:px-4 file:py-2.5 file:text-xs file:font-semibold file:text-violet-700 hover:file:bg-violet-200"
                      />

                      <p className="mt-2 text-xs text-gray-400">
                        PNG, JPG or JPEG. Maximum file size 5MB.
                      </p>

                      {errors.profileImage && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {errors.profileImage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                <div>
                  <h4 className="mb-4 text-sm font-bold text-[#19182f]">
                    Security information
                  </h4>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-xs font-bold text-violet-600"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      }
                    />
                    <FormInput
                      label="Confirm password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-violet-600 px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
                >
                  Create account →
                </button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-6 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="ml-2 font-bold text-violet-600 hover:text-violet-800"
                  >
                    Sign in
                  </button>
                </p>
              </div>

              <p className="mt-5 text-center text-[10px] leading-5 text-gray-400">
                By creating an account, you agree to our Terms and Privacy
                Policy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
