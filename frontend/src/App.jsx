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

function App() {
    const { isLoggedIn, isLoading: authLoading, handleLogin, handleRegister, errMessage } = useAuth();
    const { countries, isLoading: countriesLoading } = useCountries();
    const isLoading = authLoading || countriesLoading;

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Main isLoading={isLoading} countries={countries} />} />
                <Route path="sign-in" element={<Login onSubmit={handleLogin} errMessage={errMessage} isLoading={authLoading} />} />
                <Route path="sign-up" element={<Register onSubmit={handleRegister} errMessage={errMessage} isLoading={authLoading} />} />
                <Route path="search" element={<SearchResults isLoggedIn={isLoggedIn} countries={countries} isLoading={countriesLoading} />} />
                <Route path="country/:id" element={<Country />} />
                <Route path="profile" element={<ProtectedRoute element={Profile} countries={countries} isLoggedIn={isLoggedIn} />} />
            </Route>
        </Routes>
    );
}

export default App;