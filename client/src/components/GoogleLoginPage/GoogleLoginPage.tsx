import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const GoogleLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get("username");
    const accessToken = params.get("accessToken");
    const avatarUrl = params.get("avatarUrl");
    if (username && accessToken && avatarUrl) {
      setUser({
        username,
        avatarUrl: avatarUrl,
        accessToken,
      });
    }
    navigate("/", { replace: true });
  }, []);

  return <></>;
};

export default GoogleLoginPage;
