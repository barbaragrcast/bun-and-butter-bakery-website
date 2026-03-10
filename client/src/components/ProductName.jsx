import React, { useRef, useEffect, useState } from "react";

const ProductName = ({ name }) => {
  const nameRef = useRef(null);
  const [fontSize, setFontSize] = useState(14); // default font size

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    let currentSize = 14;
    el.style.fontSize = currentSize + "px";

    // Shrink until the text fits in one line
    while (el.scrollHeight > el.clientHeight && currentSize > 10) {
      currentSize -= 1;
      el.style.fontSize = currentSize + "px";
    }
  }, [name]);

  return (
    <h2
      ref={nameRef}
      style={{
        width: "80%",
        textAlign: "center",
        margin: "0",
        padding: "0",
        lineHeight: "1.2em",
      }}
    >
      {name}
    </h2>
  );
};

export default ProductName;