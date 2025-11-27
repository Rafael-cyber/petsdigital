import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, PawPrint, ClipboardList } from "lucide-react";
import "../styles/menu.css";

export default function Menu() {
  const location = useLocation();

  const item = (to, icon, label) => {
    const active = location.pathname === to;

    return (
      <Link className={`menu-item ${active ? "active" : ""}`} to={to}>
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="menu">
      {item("/", <Home size={22} />, "Início")}
      {item("/criar-tag", <PlusCircle size={22} />, "Criar TAG")}
      {item("/meus-pets", <ClipboardList size={22} />, "Meus Pets")}
      {item("/me-adote", <PawPrint size={22} />, "Me Adote")}
      {item("/rastrear", <PawPrint size={22} />, "Rastrear")}
      {item("/meus-pets", <PawPrint size={22} />, "Meus Pets")}

    </nav>
  );
}
