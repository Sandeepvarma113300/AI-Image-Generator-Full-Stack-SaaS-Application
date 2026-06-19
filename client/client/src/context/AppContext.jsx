import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showlogin, setshowlogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = useCallback(async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/credits', {}, {
        headers: { token }
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image',
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          // Navigate to buy credits handled by caller
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCredit(false);
  };

  // Fetch user credits whenever token changes (login/logout).
  // This is an intentional external-data-sync pattern.
  useEffect(() => {
    if (token) {
      loadCreditsData(); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [token, loadCreditsData]);

  const value = {
    user, setUser,
    showlogin, setshowlogin,
    backendUrl,
    token, setToken,
    credit, setCredit,
    loadCreditsData,
    generateImage,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

