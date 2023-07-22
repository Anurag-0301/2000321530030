import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NumberMergingComponent = ({ urls }) => {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = urls.map(url =>
          axios.get(url).then(response => response.data.numbers)
        );

        const validResponses = await Promise.allSettled(
          requests.map(promise =>
            Promise.race([
              promise,
              new Promise((resolve) => setTimeout(resolve, 500, [])),
            ])
          )
        );

        const validIntegers = validResponses
          .filter(response => response.status === 'fulfilled' && response.value.length > 0)
          .map(response => response.value)
          .flat();

        const mergedUniqueIntegers = Array.from(new Set(validIntegers)).sort(
          (a, b) => a - b
        );

        setMergedNumbers(mergedUniqueIntegers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [urls]);

  return (
    <div>
      <h2>Merged Unique Integers in Ascending Order:</h2>
      <ul>
        {mergedNumbers.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberMergingComponent;
