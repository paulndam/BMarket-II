/** @format */

import React, { useState } from "react";

const SearchBox = (props) => {
  const [name, setname] = useState("");
//   const [lname,setlname] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
    // props.history.push(`/search/lname/${lname}`)
  };

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <form onSubmit={submitHandler} className="search">
            <div id="MenuItems">
              <input
                className="searchTerm"
                type="text"
                name="q"
                id="q"
                placeholder="What are you looking for?"
                onChange={(e) => setname(e.target.value) }
                
              />
              <button className="searchButton" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
