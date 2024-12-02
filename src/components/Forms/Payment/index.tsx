import paymentData from "./data";

const PaymentForm: React.FC = () => {
  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      {paymentData.map((field) => (
        <div className="space-y-5" key={field.name}>
          <div>
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-gray-800"
            >
              {field.label}
            </label>
            {field.type === "dropdown" ? (
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
                required={field.required}
              >
                {field?.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
                required={field.required}
              />
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Address
      </button>
    </form>
  );
};

export default PaymentForm