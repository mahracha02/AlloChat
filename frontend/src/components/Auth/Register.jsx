import React, { useState, useEffect } from "react";
import AlloChat from "../../assets/photos/AlloChat.png";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isSubmitting) return;

    fetch("api/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setMessage("Inscription réussie ! Redirection...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsSubmitting(false));
  }, [isSubmitting, formData]); // Déclenché uniquement lorsque isSubmitting change

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true); // Déclenche l'inscription
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={AlloChat} alt="AlloChat Logo" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Créer un compte AlloChat
        </h2>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Choisissez un mot de passe"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
