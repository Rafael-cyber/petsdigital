import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        nav("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="card center">Carregando...</div>;

  return children;
}
