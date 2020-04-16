import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { response, error, loading } = useFetch(
    "https://www.anapioficeandfire.com/api/houses",
    {
      query: {
        page: currentPage,
        pageSize: 5,
      },
    }
  );

  if (error) {
    return <div className="error">{JSON.stringify(error)}</div>;
  }
  return (
    <div className="App">
      <h1>Game of Thrones Houses - Page {currentPage}</h1>
      {loading && <div className="loading">Loading page {currentPage}</div>}
      {!loading &&
        response.map((data) => {
          return (
            <div className="datapoint" key={data.Date}>
              <h3>{data.name}</h3>
              {data.words && <cite>"{data.words}"</cite>}
              {data.coatOfArms && (
                <p>
                  <b>Coat of Arms: </b>
                  {data.coatOfArms}
                </p>
              )}
            </div>
          );
        })}
      <div className="pagination">
        {currentPage > 1 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            Go to page {currentPage - 1}
          </button>
        )}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Go to page {currentPage + 1}
        </button>
      </div>
    </div>
  );
}

export default App;
