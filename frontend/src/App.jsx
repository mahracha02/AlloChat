// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Importation des composants nécessaires
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AlloChat from './components/AlloChat/AlloChat';  
import NavBarHorizontal from './components/Layout/NavBarHorizontal';
import NavbarVertical from './components/Layout/NavBarVertical';
import ChatWindow from './components/Chat/ChatWindow';
import GroupChat from './components/Group/GroupChat';
import GroupSettings from './components/Group/GroupSettings';
import GroupList from './components/Group/GroupList';
import UserProfile from './components/User/UserProfile';
import Notifications from './components/Notifications/Notifications';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route pour page principale AlloChat) */}
          <Route path="/AlloChat" element={<AlloChat />} />

          {/* Routes pour l'authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route pour la menulaterale */}
          <Route path="/vertical-navbar" element={<NavbarVertical />} />
          <Route path="/horizontal-navbar" element={<NavBarHorizontal />} />

          {/* Routes pour les chats */}
          <Route path="/chat" element={<ChatWindow />} />
          

          {/* Route pour les paramètres du groupe */}
          <Route path="/group-settings" element={<GroupSettings />} />
          <Route path="/group-chat" element={<GroupChat />} />
          <Route path="/group-List" element={<GroupList />} />

          {/* Route pour le profil utilisateur */}
          <Route path="/user-profile" element={<UserProfile />} />

          {/* Route pour les notifications */}
          <Route path="/notifications" element={<Notifications />} />

          {/* Route par défaut (peut rediriger vers la page de connexion ou d'accueil) */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
