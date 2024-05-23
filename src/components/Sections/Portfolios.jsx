import React, { useState, useEffect } from "react";
import Portfolio from "../Items/Portfolio";

function Portfolios({ workData }) {
  const [dataVisibleCount, setDataVisibleCount] = useState(6);
  const [dataIncrement] = useState(3);
  const [visibleItems, setVisibleItems] = useState([]);
  const [noMorePost, setNoMorePost] = useState(false);

  // const handleLoadmore = (e) => {
  //   e.preventDefault();
  //   let tempCount = dataVisibleCount + dataIncrement;
  //   if (tempCount > workData?.length) {
  //     setNoMorePost(true);
  //   } else {
  //     setVisibleItems(workData);
  //   }
  // };
  return (
    <>
      <div className="row portfolio-wrapper">
        {workData?.map((item, index) => (
          <div className="col-md-4 col-sm-6 grid-item" key={index}>
            <Portfolio portfolio={item} />
          </div>
        ))}
      </div>

      {/* {noMorePost ? null : (
        <div className="load-more text-center mt-4">
          <a
            href="#!"
            className="btn btn-default"
            onClick={(e) => handleLoadmore(e)}
          >
            <i className="fas fa-circle-notch"></i> Load more
          </a>
        </div>
      )} */}
    </>
  );
}

export default Portfolios;
