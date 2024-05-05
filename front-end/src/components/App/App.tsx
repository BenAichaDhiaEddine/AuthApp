import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../MainApp/MainPage";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import SuccessPage from "../SuccessPage/SuccessPage";
import { AuthProvider } from "../../contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/SuccessPage" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
