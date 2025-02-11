'use client'
import { AxiosResponse } from "axios";
import { error } from "console";
import { AnyMxRecord } from "dns";
import { Anybody } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

export default function Home() {
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
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }

    const axios = require('axios');
    const fetchData = async () => {
      const result = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+localStorage.getItem("lat")+'&lon='+localStorage.getItem("lng")+'&appid='+'0dbf73a231ff0dee0b3e05737ad7b81e')
      return result
    }
    fetchData().then(res => setDataInfo(res.data))
  },[])

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="text-left">🌤NextWeather</Navbar.Brand>
        </Container>
      </Navbar>
      <main className="text-center">
        <WeatherCard/>
      </main>
      <footer className="text-center justify-center">
        <p>Made by Lengyel Bálint</p>
      </footer>
    </div>
  );

  function WeatherCard(){
    if (dataInfo){
      console.log(dataInfo)
      return (
        <div className="Card">
          <Card className="bg-dark text-white">
            <Card.Img src="" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>{dataInfo.name}</Card.Title>
              <Card.Text>{dataInfo.weather[0].main}</Card.Text>
              <Card.Text className="">{dataInfo.weather[0].description}</Card.Text>
              <Card.Img src={" https://openweathermap.org/img/wn/"+dataInfo.weather[0].icon+"@2x.png"} alt="Card image" />
              <Card.Text>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </div>
      )  
      
    }else{
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )   
    }
  }
}