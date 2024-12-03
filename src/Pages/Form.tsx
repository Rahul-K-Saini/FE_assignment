import { useSearchParams } from "react-router-dom";
import Form from "../components/Form";
import dataMap from "../components/Form/data";

const FormPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedForm = searchParams.get("form") || "user";
  const data = dataMap.get(selectedForm);

  return (
    <main className="bg-gray-100 min-h-screen pt-8">
      <div className="flex mb-4 items-center justify-center">
        <select
          className="p-2 border rounded-md bg-white shadow-sm"
          onChange={(e) => setSearchParams({ form: e.target.value })}
          value={selectedForm}
        >
          <option className="py-1" value="user">
            User
          </option>
          <option className="py-1" value="address">
            Address
          </option>
          <option className="py-1" value="payment">
            Payment
          </option>
        </select>
      </div>{" "}
      <Form data={data} formName={selectedForm} />
    </main>
  );
};

export default FormPage;
