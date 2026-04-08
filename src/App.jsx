import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useAuth } from "./hooks/useAuth";
import Main from "./pages/Main/Main";
import { ALL_COUNTRIES } from "./utils/constants";
import SearchResults from "./pages/SearchResults/SearchResults";
import Country from "./pages/Country/Country";

function App() { 
  const { 
      isLoggedIn, 
      isLoading, 
      errMessage, 
      handleLogin, 
      handleRegister 
  } = useAuth(); 
  return(
        <Routes>
          <Route path="*" element={<NotFound />}  />
          <Route path="/" element={<Main />}  />
          <Route path="/sign-in" element={<Login onSubmit={handleLogin} errMessage={errMessage} isLoading={isLoading} />}  />
          <Route path="/sign-up" element={<Register onSubmit={handleRegister} errMessage={errMessage} isLoading={isLoading} />}  />
          <Route path="/search" element={<SearchResults countries={ALL_COUNTRIES} />} />
          <Route path="/country/:id" element={<Country />} />
        </Routes>
    )
}

export default App;