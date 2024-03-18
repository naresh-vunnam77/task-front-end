import { useState } from 'react';
import axios from 'axios'
const BASE_URL = '/api/v1/auth';

const useAuth = (actionType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authenticate = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/${actionType}`, { email, password });

      const data = await response.data

      if (data.success && data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return data
      } else {
        setError(data.message || `Failed to ${actionType}`);
      }
    } catch (error) {
      setError(`Failed to ${actionType}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, authenticate };
};

export default useAuth;
