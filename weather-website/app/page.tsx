'use client'
import { AxiosResponse } from "axios";
import { error } from "console";
import { AnyMxRecord } from "dns";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';

export default function Home() {

  let lat = 1;
  let lon = 1;
  const [ dataInfo, setDataInfo ]:any = useState();

  useEffect(()=>{
    const axios = require('axios');
    const fetchData = async () => {
      const result = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+'0dbf73a231ff0dee0b3e05737ad7b81e')
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
        <WeatherDisplay/>
      </main>
      <footer className="text-center justify-center">
        <p>Made by Lengyel Bálint</p>
      </footer>
    </div>
  );

  function WeatherDisplay(){
    if (dataInfo){
      console.log(dataInfo)
      return (
        <div>
          {dataInfo.weather[0].main}
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