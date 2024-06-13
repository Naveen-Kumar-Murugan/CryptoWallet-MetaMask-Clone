import React from "react"
import { Link } from "react-router-dom";
import GitSvg from "../assets/github.svg";
import LinkSvg from "../assets/linkedin.svg";

export default function Home(){
    return( 
        <div>
        <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:text-center lg:py-16 lg:px-12">
        <h1 class="mb-6 text-5xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white sm:mb-4"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Crypto Curreny</span> Wallet</h1>
        <p class="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 ">Your secure place to manage cryptocurrencies. With CryptoWallet, you can safely store, send, and receive various cryptocurrencies. Enjoy the benefits of seamless transactions, real-time balance updates, and the highest level of security to keep your assets safe.</p>
        <p className="text-xl font-normal text-gray-900 lg:text-2xl dark:text-gray-400 lg:mb-4 mb-4 lg:text-center">Join us Now.</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/signup" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Sign Up
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="/login" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 mr-2">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" /></svg>
                Login
            </a>
        </div>
        <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span class="font-semibold text-gray-400 uppercase">SOCIALS</span>
            <div class="flex flex-wrap justify-center items-center mt-2 text-gray-500 sm:justify-between">
                <a href="https://github.com/Naveen-Kumar-Murugan" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <img src={GitSvg} className="h-52"/>                        
                </a>
                <a href="https://www.linkedin.com/in/naveen-kumar-murugan-4bb973255/" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <img src={LinkSvg} className="h-12"/>                
                </a> 
            </div>
        </div> 
    </div>
</section>
    </div>
    );
}