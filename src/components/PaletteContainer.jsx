import React, { useState } from "react";
import { defaultPalette } from "./utils.js";
import "./styles.css";
import PaletteView from "./PaletteView";
import PaletteHistory from "./PaletteHistory";

function PaletteContainer() {
  const [color, setColor] = useState("#000000"); //color seleccionado en el picker. Negro por defecto
  const [palette, setPalette] = useState(structuredClone(defaultPalette)); //Valores de la paleta que controlan color y estilos.
  const [name, setName] = useState(""); //Nombre ingresado en el input, para control del formulario
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("paletteHistory")) || []
  ); //historial de paletas. Se recupera de la memoria local o se setea por defecto como array vacío.

  //Función para activar uno de las casillas de la paleta. Permite mostrar el color por defualt y aumentar o disminuir de tamaño
  function handleSelect(optionId) {
    const newPalette = structuredClone(palette);
    const option = newPalette.find(
      (item) => item.option === parseInt(optionId)
    );
    const optionIsSelected = option.selected;
    newPalette.forEach((item) => (item.selected = false));
    option.selected = !optionIsSelected;
    option.active = true;
    setPalette(newPalette);
  }

  //Función para setear un nuevo color desde el picker, siempre que una casilla de la paletta este activa.
  function handleColorChange(color) {
    setColor(color.hex);
    const newPalette = structuredClone(palette);
    const option = newPalette.find((element) => element.selected === true);
    option.color = color.hex;
    setPalette(newPalette);
  }

  //Setea la variable input a medida que se va ingresando el nombre. Para control de formulario.
  function handleInputChange(e) {
    setName(e.target.value);
  }

  //Se guarda la paletta de colores armada en un array y se muetra en la parte inferior.
  function savedPalette(e, objPalette) {
    e.preventDefault();
    const newHistory = structuredClone(history);
    const nameAlreadyExist = newHistory.some((item) => item.name === name);
    if (nameAlreadyExist) return alert("Ya existe un registro con ese nombre");
    const newPalette = structuredClone(objPalette);
    newPalette.forEach((item) => (item.selected = false));
    newHistory.push({ name: name, palette: newPalette });
    setName("");
    setColor("#000000");
    saveHistory(newHistory);
    setPalette(structuredClone(defaultPalette));
    setHistory(newHistory);
  }

  //Elimina la paleta correspondiente del historial
  function deleteItem(name) {
    const newHistory = structuredClone(history);
    const index = newHistory.findIndex((item) => item.name === name);
    newHistory.splice(index, 1);
    saveHistory(newHistory);
    setHistory(newHistory);
  }

  //Muestra los colores de la paleta seleccionada en la parte superior.
  function showSavedPalette(savedPalette) {
    setPalette(structuredClone(savedPalette));
  }

  //Guarda el array del historial en la memoria local
  function saveHistory(list) {
    localStorage.setItem("paletteHistory", JSON.stringify(list));
  }

  return (
    <div>
      <PaletteView
        color={color}
        palette={palette}
        name={name}
        handleColorChange={handleColorChange}
        handleSelect={handleSelect}
        savedPalette={savedPalette}
        handleInputChange={handleInputChange}
      />
      {history.length !== 0 && (
        <PaletteHistory
          history={history}
          deleteItem={deleteItem}
          showSavedPalette={showSavedPalette}
        />
      )}
    </div>
  );
}

export default PaletteContainer;
