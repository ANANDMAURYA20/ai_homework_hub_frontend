import { useState, useEffect } from 'react';

export default function ApiTest() {
  const [status, setStatus] = useState('Testing...');
  const [details, setDetails] = useState({});

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    try {
      // Test health endpoint
      const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
      const healthData = await healthResponse.json();
      
      // Test hello endpoint
      const helloResponse = await fetch(`${API_BASE_URL}/api/hello`);
      const helloData = await helloResponse.json();
      
      // Test classes endpoint
      const classesResponse = await fetch(`${API_BASE_URL}/api/public/classes`);
      const classesData = await classesResponse.json();
      
      setStatus('✅ Connection Successful!');
      setDetails({
        baseUrl: API_BASE_URL,
        health: healthData,
        hello: helloData,
        classes: classesData
      });
    } catch (error) {
      setStatus('❌ Connection Failed');
      setDetails({
        baseUrl: API_BASE_URL,
        error: error.message
      });
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold text-lg mb-2">API Connection Test</h3>
      <p className="mb-2">{status}</p>
      <pre className="text-xs bg-white p-2 rounded overflow-auto">
        {JSON.stringify(details, null, 2)}
      </pre>
      <button 
        onClick={testConnection}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Test Again
      </button>
    </div>
  );
}