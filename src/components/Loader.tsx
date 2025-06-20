import React from "react";

function Loader() {
  return (
    <div className="flex justify-center h-full items-center mt-80">
      <div className="three-body ">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
}

export default Loader;
