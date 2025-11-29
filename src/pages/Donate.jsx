import React from "react";

export default function Donate(){
  // Troque a chave PIX por sua chave real
  const pix = "seu-pix@provedor.com";
  return (
    <div className="card center">
      <h2 className="orange">Doar (PIX)</h2>
      <p className="small">Apoie o projeto com PIX</p>
      <div style={{marginTop:12}}>
        <p style={{fontWeight:700}}>{pix}</p>
        <p className="small">Use o QR no seu app bancário ou copie a chave.</p>
      </div>
    </div>
  );
}
