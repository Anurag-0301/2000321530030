import React, { useEffect, useState } from "react";
import { fetchDataFromURLs } from "./Api";

function App() {
  const [response, setResponse] = useState(null);

  const testServerAPIs = [
    "http://20.244.56.144/numbers/primes",
    "http://20.244.56.144/numbers/fibo",
    "http://20.244.56.144/numbers/odd",
    "http://20.244.56.144/numbers/rand",
  ];

  useEffect(() => {
    fetchDataFromURLs(testServerAPIs).then((data) => setResponse(data));
  }, []);

  return (
    <div>
      <h1>Response from Test Server APIs</h1>
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
