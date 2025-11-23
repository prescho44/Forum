import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import { AppContext } from "./components/store/app.context";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./view/Home/Home";
import Login from "./components/Login/Login";
import MainLayout from "./components/MainLayout/MainLayout";
import NotFound from "./view/NotFound/NotFound";
import PostView from "./components/PostView/PostView";
import ProfileView from "./components/ProfileLayout/ProfileView/ProfileView";
import Register from "./components/Register/Register";
import SearchResults from "./components/Search/SearchResults";
import UploadView from "./components/Upload/Upload";
import CarNews from "./components/CarNews/CarNews";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user, loading, error] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({
      ...appState,
      user,
    });
  }

  useEffect(() => {
    if (!user) return;

    getUserData(appState.user.uid)
      .then((data) => {
        const userData = data[Object.keys(data)[0]];
        setAppState({
          ...appState,
          userData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppContext.Provider value={{ ...appState, setAppState }}>
          <Routes>
            {/* Routes with main layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path={`/post/:id`} element={<PostView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<UploadView />} />
              <Route path="/users" element={<Admin />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/car-news" element={<CarNews />} />
            </Route>
            {/* Profile section with its own layout */}
            <Route element={<ProfileView />}>
              <Route path="/your-profile" element={<ProfileView />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
