import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import myReducer from '~/reducers/UserReducer';
import LessonDetail from './components/LessonDetail/LessonDetail';
import cookies from 'react-cookies';
import Header from './layouts/Header';
import Home from './components/Home/Home';
import Lesson from './components/Lesson';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './layouts/Footer';
//import './App.scss'
export const UserContext = React.createContext();

const App = () => {
    const [user, dispatch] = useReducer(myReducer, cookies.load('current_user'));

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, dispatch]}>
               
                    <Header />
    
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses/:courseId/lessons" element={<Lesson />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/lessons/:lessonId" element={<LessonDetail />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
    
                    <Footer  />
               
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default App;
