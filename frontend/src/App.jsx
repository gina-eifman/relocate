import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Main from './pages/Main/Main';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SearchResults from './pages/SearchResults/SearchResults';
import Country from './pages/Country/Country';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { useCountries } from './hooks/useCountries';
import { useFavourites } from './hooks/useFavourites';
import { useCollections } from './hooks/useCollections';
import { useProfile } from './hooks/useProfile';
import { useCountry } from './hooks/useCountry';

function App() {
    const { isLoggedIn, isLoadingAuth, handleLogin, handleRegister, errMessageAuth } = useAuth();
    const { countries, isLoadingCountries } = useCountries();
    const { errMessageFavourites, isLoadingFavourites } = useFavourites();
    const { errMessageCollections, isLoadingCollections } = useCollections();
    const { errMessagePersonal, isLoadingProfile } = useProfile();
    const { isLoadingCountry } = useCountry();
    const isLoading = isLoadingAuth || isLoadingCountries || isLoadingFavourites || isLoadingCollections || isLoadingProfile;

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main isLoading={isLoading} countries={countries} />} />
                <Route path="sign-in" element={<Login onSubmit={handleLogin} errMessage={errMessageAuth} isLoading={isLoadingAuth} />} />
                <Route path="sign-up" element={<Register onSubmit={handleRegister} errMessage={errMessageAuth} isLoading={isLoadingAuth} />} />
                <Route path="search" element={<SearchResults isLoggedIn={isLoggedIn} countries={countries} isLoading={isLoadingCountries} errMessage={errMessageFavourites} />} />
                <Route path="country/:id" element={<Country isLoading={isLoadingCountry} errMessageCollections={errMessageCollections} errMessageFavourites={errMessageFavourites} />} />
                <Route path="profile" element={<ProtectedRoute element={Profile} countries={countries} isLoggedIn={isLoggedIn} isLoading={isLoadingProfile} errMessagePersonal={errMessagePersonal} errMessageFavourites={errMessageFavourites} errMessageCollections={errMessageCollections} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;