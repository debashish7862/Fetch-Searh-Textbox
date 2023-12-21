import React, { useEffect, useState } from "react";
import './style.css'
function Fetch() {
  const [entriesData, setEntriesData] = useState();
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState();
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);

        setEntriesData(data.entries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [entriesData]);

  const searchHandle = () => {
    const result = entriesData.filter((e) => {
      return e.API.includes(search);
    });

    setSearchedData(result);
  };

  return (
    <>
      <h1>Total Count : - {count}</h1>
      <div>
        <label htmlFor="textbox">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search by API name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button onClick={searchHandle}>Search</button>
        </label>
      </div>
      <table>
        <tr>
          <th>API</th>
          <th>DESCRIPTION</th>
          <th>AUTH</th>
          <th>CATEGORY</th>
          <th>CORS</th>
          <th>LINK</th>
          <th>HTTPS</th>
        </tr>
        <tbody>
          {searchedData.map((e) => {
            return (
              <tr>
                <td>{e.API}</td>
                <td>{e.Description}</td>
                <td>{e.Auth}</td>
                <td>{e.Category}</td>
                <td>{e.Cors}</td>
                <td>
                  <a href={e.Link} target="_blank">
                    {e.Link}
                  </a>
                </td>
                <td>{e.HTTPS}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Fetch;
