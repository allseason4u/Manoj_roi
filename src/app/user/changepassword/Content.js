"use client";

import React, { useState } from "react";
import { apiCaller } from "@/utils/apiCaller";
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" }); // type: success | error
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.oldPassword.trim())
      newErrors.oldPassword = "Old password is required";
    if (!formData.newPassword.trim())
      newErrors.newPassword = "New password is required";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required";
    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage({ text: "", type: "" });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/");
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { success, data, error } = await apiCaller(
        "/secure/changepassword",
        formData
      );

      if (success && data.result === "y") {
        setMessage({ text: "Password changed successfully!", type: "success" });
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        handleLogout();
      } else {
        setMessage({
          text: data.message || "Failed to change password!",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "Something went wrong!", type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-200 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Change Password
        </h1>

        {["oldPassword", "newPassword", "confirmPassword"].map((field, idx) => (
          <div className="group relative" key={idx}>
            <label className="flex items-center gap-3 mb-2 text-gray-700 font-medium text-sm">
              <div className="p-2 bg-purple-200 rounded-lg">
                <Lock size={16} className="text-purple-500" />
              </div>
              {field === "oldPassword"
                ? "Old Password"
                : field === "newPassword"
                ? "New Password"
                : "Confirm Password"}
            </label>

            <input
              type={showPassword[field] ? "text" : "password"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${
                field === "oldPassword"
                  ? "old"
                  : field === "newPassword"
                  ? "new"
                  : "confirm"
              } password`}
              className={`w-full pr-12 px-4 py-3 rounded-xl bg-white border text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />

            <div
              className="absolute right-3 top-3/4 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => togglePasswordVisibility(field)}
            >
              {showPassword[field] ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>

            {errors[field] && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors[field]}
              </p>
            )}
          </div>
        ))}

        {message.text && (
          <div
            className={`flex items-center gap-2 font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {message.text}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 hover:from-purple-400 hover:via-blue-300 hover:to-purple-400 text-white font-bold rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Change Password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
