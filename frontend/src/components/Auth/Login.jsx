import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlloChat from "../../assets/photos/AlloChat.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Connexion réussie !");
        localStorage.setItem("token", data.token); // Save JWT Token

        navigate("/chat"); // Redirect to /chat page
      } else {
        setError(data.error || "Erreur lors de la connexion");
      }
    } catch (error) {
      setError("Problème de connexion avec le serveur" + error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
        <div className="flex justify-center mb-6">
          <img src={AlloChat} alt="AlloChat Logo" className="w-50 h-50" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Connectez-vous à AlloChat
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">username</label>
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Entrez votre pseudo"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Créez-en un
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
