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
import { NavbarToggle } from "react-bootstrap";
import WeatherCard from "./weatherCard";

export default function Home() {
  

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-800 text-black dark:text-white font-[family-name:var(--font-geist-sans)]">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="text-left text-orange-500 rounded p-3 text-2xl bg-slate-300 dark:bg-zinc-800 font-bold">🌤 NextWeather</Navbar.Brand>
        </Container>
      </Navbar>
      <main className="">
        <br/>
        <WeatherCard/>
      </main>
      <footer className="text-center p-3 inset-x-0 bottom-0">
        <p className="bg-slate-200 dark:bg-zinc-800 rounded p-3 w-60 ml-auto mr-auto">Made by <a href="https://github.com/LengyelB404" className="bg-orange-500 hover:bg-orange-400 p-1 rounded text-white">Lengyel Bálint</a></p>
      </footer>
    </div>
  );

  

  
}