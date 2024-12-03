import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { useSearchParams } from 'react-router-dom';

const DynamicTable: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTable = searchParams.get("item") || "user";
    const [data, setData] = useState<any[]>([]);

  const tableOptions = ['users', 'payments', 'addresses'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tableData:any;
        console.log(selectedTable)
        switch(selectedTable) {
          case 'users':
            tableData = await db.users.toArray();
            break;
          case 'payments':
            tableData = await db.payments.toArray();
            break;
          case 'addresses':
            tableData = await db.addresses.toArray();
            break;
          default:
            tableData = [];
        }
        setData(tableData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [selectedTable]);

  const renderTableHeaders = () => {
    if (data.length === 0) return null;
    return Object.keys(data[0]).map(header => (
      <th key={header} className="px-4 py-2 border">{header}</th>
    ));
  };

  const renderTableRows = () => {
    return data.map((row: any, index: number) => (
      <tr key={index} className="hover:bg-gray-100">
        {Object.values(row).map((value, cellIndex) => (
          <td key={cellIndex} className="px-4 py-2 border">{value as string}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="max-w-4xl min-h-screen mt-4 mx-auto p-8 bg-white ">
      <div className="mb-6">
        <label htmlFor="tableSelect" className="block text-sm font-medium text-gray-700 mb-1">
          Select Table
        </label>
        <select
          id="tableSelect"
          value={selectedTable}
          onChange={(e) => setSearchParams({ item: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {tableOptions.map(table => (
            <option key={table} value={table}>
              {table.charAt(0).toUpperCase() + table.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default function TablePage() {
  return (
    <main>
      <DynamicTable />
    </main>
  );
}