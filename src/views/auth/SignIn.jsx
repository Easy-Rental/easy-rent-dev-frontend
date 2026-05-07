import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField, PasswordField } from "components/form";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors]     = useState({});
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev)   => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email)                            newErrors.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email    = "Enter a valid email";
    if (!formData.password)                         newErrors.password = "Password is required";
    else if (formData.password.length < 8)          newErrors.password = "Password must be at least 8 characters";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigate("/admin/default");
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Sign in</h1>
        <p className="mt-1.5 text-sm text-gray-400">
          Welcome back — enter your details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email address"
          field="email"
          type="email"
          required={false}
          placeholder="you@example.com"
          formData={formData}
          errors={errors}
          updateFormData={updateFormData}
        />

        <PasswordField
          label="Password"
          field="password"
          required={false}
          placeholder="Min. 8 characters"
          formData={formData}
          errors={errors}
          updateFormData={updateFormData}
        />

        <div className="mb-6 flex items-center justify-between">
          <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-gray-500">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-brand-500 h-4 w-4 rounded"
            />
            Remember me
          </label>
          <a href="#" className="text-sm font-medium text-brand-500 hover:text-brand-400">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 active:bg-brand-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Signing in...
            </>
          ) : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link to="/auth/sign-up" className="font-semibold text-brand-500 hover:text-brand-400">
          Sign up
        </Link>
      </p>
    </div>
  );
}
