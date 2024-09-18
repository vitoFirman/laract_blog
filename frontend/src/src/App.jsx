import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import { Flowbite, useThemeMode } from "flowbite-react";
import { useEffect } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UpdatePassword from "./Pages/Dashboard/UpdatePassword";
import UploadPhoto from "./Pages/Dashboard/UploadPhoto";

function App() {
  const { mode } = useThemeMode();

  // Update the localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem('flowbite-theme-mode', mode);
  }, [mode]);

  return (
    <>
      <Flowbite>
        <div className={mode === 'dark' ? 'bg-gray-900' : 'bg-slate-300'}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/dashboard/update-password" element={<UpdatePassword/>}/>
              <Route path="/dashboard/upload-photo" element={<UploadPhoto/>}/>
            </Routes>
          </Router>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
