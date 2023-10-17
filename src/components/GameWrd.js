import React, { useEffect, useState } from "react";
import "../styles/index.css";

export default function GameWrd() {
  //Señal cuando se completa palabra
  const [bandera, setBandera] = useState(false);

  const palabras = [
    "cielo",
    "hojas",
    "silla",
    "radio",
    "plato",
    "llave",
    "meses",
    "cielo",
    "nubes",
    "fruta",
    "fuego",
    "grano",
    "dulce",
    "cable",
    "monte",
    "aroma",
    "nieve",
  ];
  const [siguiente, setSiguiente] = useState(0)

  const [id, setId] = useState(0);

  const [letra, setLetra] = useState("")
  //Guarda la palabra original revuelta
  const [palabra, setPalabra] = useState([]);
  //Guarda palabra original
  const [respuesta, setRespuesta] = useState([]);
  //Guarda los puntos
  const [contador, setContador] = useState(0);
  //Guarda los errores
  const [errores, setErrores] = useState(0);

  useEffect(() => {

    getPalabra();
    if (contador == 100) {
      alert("Gran ganador");
      setContador(0);
    }
  }, [bandera]);

  useEffect(() => {
    console.log(id, "effect");
    console.log(letra, "letra")
    console.log("============")
    document.getElementById(siguiente).focus()
  }, [id, letra]);


  function getPalabra() {
    const aleatorio = Math.floor(Math.random() * palabras.length);
    setRespuesta([...palabras[aleatorio]]);
    const acerjito = [...palabras[aleatorio]];
    setPalabra(acerjito.sort(() => Math.random() - 0.5));
  }

  const handleValores = (e) => {
    let id = e.target.id;
    id = e.target.id;
    setLetra(e.target.value)
    if (e.target.value == respuesta[id]) {
      setSiguiente((prev) => prev+1)
      setId(id);
      if (id == 4) {
        setSiguiente(0)
        setBandera(!bandera);
        setContador(contador + 10);
        handleDelete();
      }
    } else if(e.target.value !==""){
      setErrores(errores + 1);
      if (errores == 3) {
        setBandera(!bandera);
        handleDelete();
        setErrores(0);
        setContador(0);
      }
    }
  };

  function handleDelete() {
    palabra.map((_, index) => {
      const inputElement = document.getElementById(index)
      inputElement.value = ""
    })
  }

  return (
    <div className="content game">
      <div className="">
        <h2 className="subtitle">Ordena la palabra</h2>
        <h1 className="title"> {palabra} </h1>

        <div className="content word">
          <div id="form">
            <input
              className="input"
              type="text"
              onChange={handleValores}
              id="0"
              maxLength="1"
            />
            <input
              className="input"
              onChange={handleValores}
              id="1"
              maxLength="1"
            />
            <input
              className="input"
              onChange={handleValores}
              id="2"
              maxLength="1"
            />
            <input
              className="input"
              onChange={handleValores}
              id="3"
              maxLength="1"
            />
            <input
              className="input"
              onChange={handleValores}
              id="4"
              maxLength="1"
            />
          </div>
        </div>
      </div>

      <div class="v-line"></div>

      <div className="content info">
        <div className="puntajes">
          <h2 className="subtitle">Errores: {errores}</h2>
          <h2 className="subtitle">Puntaje: {contador}</h2>
        </div>
        <div className="botones">
          <i class="fa-solid fa-rotate-right icon" onClick={getPalabra}></i>
          <i class="fa-solid fa-eraser icon" onClick={handleDelete}></i>
        </div>
      </div>
    </div>
  );
}
