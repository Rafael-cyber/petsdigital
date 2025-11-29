import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="card">
      <h1 className="orange">Bem-vindo ao PetsDigital</h1>
      <p className="small">Adote, denuncie e ajude pets na sua cidade.</p>

      <div className="grid">
        <div className="card">
          <h3>Me Adote</h3>
          <p className="small">Encontre pets para adoção.</p>
          <Link className="link" to="/me-adote">Ver</Link>
        </div>

        <div className="card">
          <h3>Denunciar Abandono</h3>
          <p className="small">Informe um caso de abandono.</p>
          <Link className="link" to="/denunciar">Denunciar</Link>
        </div>

        <div className="card">
          <h3>Doar (PIX)</h3>
          <p className="small">Apoie o projeto.</p>
          <Link className="link" to="/doar">Doar</Link>
        </div>
      </div>
    </div>
  );
}
