import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

export default function WeatherCard(){
    const [ dataInfo, setDataInfo ]:any = useState();

    useEffect(()=>{
      if ("geolocation" in navigator) {
        // Prompt user for permission to access their location
        navigator.geolocation.getCurrentPosition(
          // Success callback function
          (position) => {
            // Get the user's latitude and longitude coordinates
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            localStorage.setItem("lat",lat.toString());
            localStorage.setItem("lng",lng.toString());
      
            // Do something with the location data, e.g. display on a map
            console.log(`Latitude: ${localStorage.getItem("lat")}, longitude: ${localStorage.getItem("lng")}`);
          },
          // Error callback function
          (error) => {
            // Handle errors, e.g. user denied location sharing permissions
            console.error("Error getting user location:", error);
            localStorage.setItem("lat","0");
            localStorage.setItem("lng","0");
          }
        );
      } else {
        // Geolocation is not supported by the browser
        console.error("Geolocation is not supported by this browser.");
        localStorage.setItem("lat","0");
        localStorage.setItem("lng","0");
      }
  
      console.log("Axios GEt")
      const axios = require('axios');
      const fetchData = async () => {
        const result = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+localStorage.getItem("lat")+'&lon='+localStorage.getItem("lng")+'&appid='+'0dbf73a231ff0dee0b3e05737ad7b81e&units=metric')
        return result
      }
      fetchData().then(res => setDataInfo(res.data))
    },[])

    if (dataInfo){
      console.log(dataInfo)
      return (
        <div className="inset-x-0">
          <Card className="ml-auto mr-auto w-min">
            <Card.ImgOverlay className="grid grid-flows-col grid-rows-2 gap-1 justify-items-stretch bg-slate-200 dark:bg-zinc-800 rounded p-3">
              <div className="row-span-2 bg-gradient-to-b from-blue-400 to-cyan-400 rounded"><Card.Img  src={" https://openweathermap.org/img/wn/"+dataInfo.weather[0].icon+"@2x.png"} alt="Card image"/></div>
              <Card.Title className="h-min bg-slate-300 dark:bg-slate-700 roundedfont-bold p-1 pl-2 rounded">{dataInfo.name}</Card.Title>
              <mark className="bg-orange-500 text-white rounded h-min p-1 pl-2">{dataInfo.main.temp}°C</mark>
              <Card.Text className="bg-slate-300 dark:bg-slate-700 rounded h-min p-1 pl-2">{dataInfo.weather[0].main}</Card.Text>
              <Card.Text className="bg-slate-300 dark:bg-slate-700 rounded h-min p-1 pl-2">{dataInfo.weather[0].description}</Card.Text>
              <div className="row-span-2 bg-slate-300 dark:bg-slate-700 rounded p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-wind mt-2 mb-2 ml-auto mr-auto" viewBox="0 0 16 16" transform={"rotate("+dataInfo.wind.deg+")"}><title>{dataInfo.wind.deg+"°"}</title><path  d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/></svg>
                <p className="text-center">{dataInfo.wind.speed}m/s</p>
              </div>
              <ColdAlert/>
            </Card.ImgOverlay>
          </Card>
        </div>
      )
    }else{
      return (
        <div role="status" className="bg-slate-200 dark:bg-zinc-800 rounded p-3 w-20 ml-auto mr-auto text-center">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-400 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      )   
    }
}

function ColdAlert(){
    //if (dataInfo && dataInfo.main.temp && dataInfo.main.temp < 1) {
    if (true) {
      return(
        <div className="toast ml-auto mr-auto w-min mt-3 mb-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded p-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header bg-sky-500 rounded p-3 text-white text-2xl">
            ⛄
          </div>
          <div className="toast-body w-max text-white">
          </div>
        </div>
      )
    }else{
      return(<></>)
    }
  }
