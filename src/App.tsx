import { useState } from "react";
import  AddressForm  from "./components/Forms/Address";
import  PaymentForm  from "./components/Forms/Payment";
import  UserForm  from "./components/Forms/User";

function App() {
  const [selectedForm, setSelectedForm] = useState("user");
  const renderForm = () => {
    switch (selectedForm) {
      case "address":
        return <AddressForm />;
      case "user":
        return <UserForm />;
      case "payment":
        return <PaymentForm />;
      default:
        return <div>Wrong input please select valid form</div>;
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <select
        className="p-2 border rounded-md bg-white shadow-sm"
        onChange={(e) => setSelectedForm(e.target.value)}
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
      {renderForm()}
    </main>
  );
}

export default App;
