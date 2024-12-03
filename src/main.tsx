import { createRoot } from "react-dom/client";
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";
import "./index.css";
import Table from "./Pages/Table.tsx";
import App from "./App.tsx";
import FormPage from "./Pages/Form.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        index: true, 
        element: <FormPage /> 
      },
      { 
        path: "table", 
        element: <Table /> 
      }
    ]
  }
]);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
      <RouterProvider router={router} />
  );
}