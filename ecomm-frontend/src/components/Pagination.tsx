import React from "react";

const Pagination = ({ pageCount, updatePage }: any) => {
  return (
    <div className="container pages">
      {[...Array(pageCount).keys()].map((value: any) => {
        return (
          <button
            onClick={() => updatePage(value + 1)}
            key={value}
            className="btn chip"
          >
            {value + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
