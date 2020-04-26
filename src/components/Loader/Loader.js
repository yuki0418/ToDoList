import React from 'react';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="Loader">
      <div className="background"></div>
      <div className="wrapper">
        <div id="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
      </div>
    </div>
  )
}
