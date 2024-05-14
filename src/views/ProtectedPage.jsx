import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("account/test/");
        setRes(response.data.response);
      } catch {
        alert("Must Log in First");
        setRes("Anonymous User");
        navigate("/login");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{res}</p>
    </div>
  );
}

export default ProtectedPage;