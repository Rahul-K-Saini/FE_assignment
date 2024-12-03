import React, { useState } from "react";
import { FormDataType } from "../../types/formdata";
import { userSchema } from "./zod-schema";
import { useNavigate } from "react-router-dom";
import { paymentSchema } from "./zod-schema";
import { addressSchema } from "./zod-schema";
import { db } from "../../lib/db";

const Form: React.FC<{ data: FormDataType[]; formName: string }> = ({
  data,
  formName,
}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateProgress = () => {
    const requiredFields = data.filter((field) => field.required);
    const filledFields = requiredFields.filter(
      (field) => formData[field.name] && formData[field.name].trim() !== ""
    );
    return (filledFields.length / requiredFields.length) * 100;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj);

    let validationResult;
    switch (formName.toLowerCase()) {
      case "user":
        validationResult = userSchema.safeParse(data);
        break;
      case "payment":
        validationResult = paymentSchema.safeParse(data);
        break;
      case "address":
        validationResult = addressSchema.safeParse(data);
        break;
      default:
        validationResult = userSchema.safeParse(data);
    }

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(formattedErrors);
    } else {
      try {
        switch (formName.toLowerCase()) {
          case "user":
            // @ts-expect-error - Type is validated by Zod schema
            await db.users.add(validationResult.data);
            break;
          case "payment":
            // @ts-expect-error - Type is validated by Zod schema
            await db.payments.add(validationResult.data);
            break;
          case "address":
            // @ts-expect-error - Type is validated by Zod schema
            await db.addresses.add(validationResult.data);
            break;
        }
        setSuccess(`${formName} data saved successfully!`);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate(
            "/table?item=" +
              formName +
              (formName.toLowerCase() === "address" ? "es" : "s")
          );
        }, 2000);
      } catch (error) {
        console.log(error);
        setErrors({ submit: "Failed to save data" });
      }
    }
  };
  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({});
    setErrors({});
    setSuccess("");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {formName.at(0)?.toUpperCase() + formName.slice(1)} Form
      </h2>

      <div className="mb-6 bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      {isSubmitted ? (
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              {success}
            </p>
            <small>Routing you to table...</small>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Another Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          {errors.submit && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
              {errors.submit}
            </div>
          )}

          {data.map((field: FormDataType) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.type === "dropdown" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  onChange={handleChange}
                  value={formData[field.name] || ""}
                  className="mt-1 block w-full rounded-md border-gray-400 shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {field?.options?.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  onChange={handleChange}
                  value={formData[field.name] || ""}
                  className="mt-1 block w-full rounded-md border-gray-400 shadow-sm outline-none"
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save {formName.charAt(0).toUpperCase() + formName.slice(1)}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
