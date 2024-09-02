import axios from 'axios';

function useNormalRequest() {

  async function hitRequest(url, method = 'GET', body = null,handleNavigation) {
    console.log(url)
    try {
      let response;
      if (method === "GET") {
        console.log("In Get")
        response = await axios.get(url);
        if (response.data && response.data.message) {
          console.log(response.data.message);
          alert(response.data.message);
          if (handleNavigation) {
            handleNavigation();
          }
        }


      } else {
        console.log("In Post")
        response = await axios.post(url, body);
        console.log(response.data)
        // Check if the response data contains the message
        if (response.data && response.data.message) {
          console.log(response.data.message);
          alert(response.data.message);
          if (handleNavigation) {
            handleNavigation();
          }
        }
      }
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, e.g., display a message to the user
    }
  }
  return { hitRequest };
}
export default useNormalRequest;