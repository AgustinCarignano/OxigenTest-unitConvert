import React from "react";
import { CompactPicker } from "react-color";
import PaletteItem from "./PaletteItem";

function PaletteView(props) {
  const {
    color,
    handleColorChange,
    handleSelect,
    palette,
    savedPalette,
    handleInputChange,
    name,
  } = props;

  return (
    <div className="panel">
      <div className="panel__palette">
        {palette.map((element) => {
          return (
            <PaletteItem
              key={element.option}
              className="panel__palette-select"
              id={element.option}
              style={{
                background: element.active
                  ? element.color
                  : "repeating-linear-gradient(135deg,#404040 5px,#404040 10px,#b0b0b0 10px,#b0b0b0 15px)",
                transform: element.selected ? "scale(1.3)" : "scale(1)",
              }}
              onClick={handleSelect}
            >
              {!element.active && "+"}
            </PaletteItem>
          );
        })}
      </div>
      <div className="panel__picker">
        <CompactPicker color={color} onChange={handleColorChange} />
      </div>
      <form className="panel__input" onSubmit={(e) => savedPalette(e, palette)}>
        <label className="panel__input-label" htmlFor="name">
          Name
        </label>
        <div className="panel__input-div">
          <input
            type="text"
            id="name"
            className="panel__input-name"
            onChange={handleInputChange}
            value={name}
            required
          />
          <input className="panel__input-btn" type="submit" value="+" />
        </div>
      </form>
    </div>
  );
}

export default PaletteView;
