import React, { useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";

function App() {
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [developers, setDevelopers] = useState([]);
  const [original, setOriginal] = useState([]);
  const [loader, setLoader] = useState(true);
  const majorRef = useRef();
  const genderRef = useRef();

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://json-api.uz/api/project/11-dars/developers?skip=${skip}&limit=${limit}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDevelopers((dev) => [...dev, ...data.data]);
        setOriginal((dev) => [...dev, ...data.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [skip, limit]);

  function handlePaginate(event) {
    event.preventDefault();
    let copied = [...original];

    setSkip(skip + limit);
  }
  function handleSelect(event) {
    event.target.value;
    let copied = [...original];
    if (genderRef.current.value) {
      copied = copied.filter((value) => {
        return value.gender === genderRef.current.value;
      });
    }
    if (majorRef.current.value) {
      copied = copied.filter((value) => {
        return value.major === majorRef.current.value;
      });
    }
    setDevelopers(copied);
  }

  return (
    <div className="container mx-auto px-24">
      <div className="flex justify-between mx-24 my-8">
        <select
          ref={majorRef}
          className="w-52  border rounded-md p-2 "
          onChange={handleSelect}
          name="major"
        >
          <option value="">All Majors</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
          <option value="Engineering">Engineering</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>
        <select
          ref={genderRef}
          className="w-52   border rounded-md p-2"
          onChange={handleSelect}
          name="gender"
        >
          <option value="">All Genders </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      {loader && (
        <div className=" flex  justify-center">
          <RingLoader></RingLoader>
        </div>
      )}
      <ul className="flex flex-wrap gap-4 font-sans ">
        {developers.map((developer) => (
          <div
            className="border rounded-md p-4 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[250px]   "
            key={developer.id}
          >
            <h3 className="font-bold">Name: {developer.fullName}</h3>
            <h3>Major: {developer.major}</h3>
            <h3>Age: {developer.age}</h3>
            <h3>Gender: {developer.gender}</h3>
          </div>
        ))}
      </ul>
      <button
        className="flex justify-center items-center border p-3 bg-slate-300 rounded-md w-7/12  mx-auto m-5 text-white hover:shadow-md hover:bg-slate-400 transition-all duration-300"
        onClick={handlePaginate}
      >
        Show More 10
      </button>
    </div>
  );
}

export default App;
