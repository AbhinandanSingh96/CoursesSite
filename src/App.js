import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import Filter from "./Components/Filter";
import {apiUrl, filterData} from "./data";
import { useState} from "react";
import Spinner from "./Components/Spinner"
import { toast } from 'react-toastify';

const App = () => {
   const [courses, setCourses] = useState(null);
   const [loading, setLoading] = useState(true);
   const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      //outpot->
      setCourses(output.data);
    }
    catch(error){
       toast.error("Something error")
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
  <div className="min-h-screen flex-col bg-slate-500">
     <div>
      <Navbar/>  
     </div>
     
     <div className=" bg-slate-500">
     <div>
      <Filter filterData={filterData}
      category={category}
      setCategory={setCategory}/>
     </div>
     <div className="w-11/12 flex-wrap max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh]">
      {
        loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
      } 
     </div>
     </div>
    
    </div>
  );

};

export default App;