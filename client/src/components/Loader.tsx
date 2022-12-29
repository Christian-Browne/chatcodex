import { useState, useEffect } from 'react';

const Loader = () => {
  const [loaderVal, setLoaderVal] = useState('');

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderVal((prev) => (prev += '.'));

      if (loaderVal === '....') {
        setLoaderVal('');
      }
    }, 300);

    return () => {
      clearInterval(loaderInterval);
    };
  }, [loaderVal]);

  return <>{loaderVal}</>;
};

export default Loader;
