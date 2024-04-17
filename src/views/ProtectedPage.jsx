import { useContext } from "react";
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const { user } = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("account/test/");
        setRes(response.data.response);
        // console.log(user);
      } catch {
        setRes("Anonymous User");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h2>
      <p>{res}</p>
    </h2>
  );
}

export default ProtectedPage;