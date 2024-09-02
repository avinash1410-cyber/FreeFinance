import { useEffect, useRef } from 'react';
import useAxios from '../utils/useAxios';

function useApiRequest() {
  const api = useAxios();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      console.log("useApiRequest hook initialized");
      initializedRef.current = true;
    }
  }, []); // Empty dependency array ensures that this effect runs only once

  async function hitRequest(url, method = 'GET', body = null) {
    try {
      let response;

      if (method === "GET") {
        console.log("In Get")
        response = await api.get(url);
      } else {
        response = await api.post(url, body);
        console.log(response.data)
      }

      if (response.status === 200) {
        console.log(response.response)
        return response.data;
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  return { hitRequest};
}

export default useApiRequest;