import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home/Home";
import Details from "./pages/Details";
import SearchResults from "./components/SearchResults/SearchResults";
import MediaList from "./components/MediaList/MediaList";
import Profile from "./components/Profile/Profile";
import UserSettings from "./components/UserSettings/UserSettings";
import Favorite from "./components/Favorite/Favorite";

function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="details/:type/:id" element={<Details />} />
                    <Route path="search/:tipo" element={<SearchResults />} />
                    <Route path="media/:tipo" element={<MediaList />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="userSetting" element={<UserSettings />} />
                    <Route path="favorites" element={<Favorite />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouters;
