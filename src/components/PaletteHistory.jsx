import React from "react";
import PaletteItem from "./PaletteItem";

function PaletteHistory(props) {
  const { history, deleteItem, showSavedPalette } = props;
  return (
    <div className="history">
      <h3 className="history__title">Saved Palettes</h3>
      <div className="history__container">
        {history.map((item) => {
          return (
            <div key={item.name} className="history__items">
              <div className="history__items-div">
                <p className="history__items-name">{item.name}</p>
                <img
                  className="history__items-trash"
                  src="./images/trash.png"
                  alt="trash icon"
                  onClick={() => deleteItem(item.name)}
                />
              </div>
              <div
                className="history__items-palette"
                onClick={() => showSavedPalette(item.palette)}
              >
                {item.palette.map((element) => {
                  return (
                    <PaletteItem
                      key={element.option}
                      className="history__items-paletteItem"
                      style={{
                        background: element.active
                          ? element.color
                          : "repeating-linear-gradient(135deg,#404040 4px,#404040 8px,#b0b0b0 8px,#b0b0b0 12px)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaletteHistory;
