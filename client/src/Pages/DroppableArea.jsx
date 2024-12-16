import React, { useState } from "react";

const DroppableArea = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain"); // Retrieve the text from dragged item
    setDroppedItems((prevItems) => [...prevItems, { value: data }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  return (
    <div
      className="p-4 rounded-sm bg-white text-black text-xl font-semibold flex justify-center items-center mx-auto"
      style={{
        minHeight: "300px",
        textAlign: "center",
        position: "relative", // Using relative positioning for responsiveness
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {droppedItems.length > 0 ? (
        droppedItems.map((item, index) => (
          <div key={index} className="p-2 bg-blue-200 m-2 rounded">
            {item.value}
          </div>
        ))
      ) : (
        "Correct Answer Here"
      )}
    </div>
  );
};

export default DroppableArea;
