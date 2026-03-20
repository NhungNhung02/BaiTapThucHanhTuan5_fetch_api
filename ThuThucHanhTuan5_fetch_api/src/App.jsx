import { useState, useEffect } from "react";

function FetchSearchFilter(props) {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      const url = "https://jsonplaceholder.typicode.com/posts"
      async function fetchDataFromUrl(url) {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setFilteredData(data);
        console.log("setFilteredData Fetch");
      }
      fetchDataFromUrl(url)
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      const newData = data.filter(item => item.title.includes(searchValue))
      // console.log(newData);
      setFilteredData(newData)
    } else {
      if (data.length > 0) {
        setFilteredData(data);
      }
    }
  }, [searchValue])


  function handleChange(e) {
    const val = e.target.value;
    setSearchValue(val)
  }

  return (
    <>
      <input type="text" placeholder='Enter your search..' onChange={handleChange} value={searchValue} />
      <ul>
        {
          filteredData.map(item => {
            return <li key={item.id}>{item.title}</li>
          })
        }
      </ul>
    </>
  )
}

export default FetchSearchFilter;
