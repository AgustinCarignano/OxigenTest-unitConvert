import React from "react";

function PaletteItem(props) {
  const { className, id, style, onClick, children } = props;
  return (
    <div
      className={className}
      id={id}
      style={style}
      onClick={onClick && ((info) => onClick(info.target.id))}
    >
      {children}
    </div>
  );
}

export default PaletteItem;
