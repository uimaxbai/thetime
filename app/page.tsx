"use client";
import React, { useState, useEffect } from 'react';
// import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTowerCell, faMoon } from '@fortawesome/free-solid-svg-icons'
// import Image from 'next/image';
import './normal.css';
import { MoonFill, SunFill } from 'react-bootstrap-icons';
import { useMediaQuery } from "react-responsive";

import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules

// Prevent FontAwesome icons from changing size.
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

async function getTime(timezone: string) {
  try {
    let currentTime = (new Date()).getTime();
    const response = await fetch('https://worldtimeapi.org/api/timezone/' + timezone);
    const data = await response.json();
    // console.log(data);
    let lastTime = (new Date()).getTime() - currentTime;
    // console.log(lastTime);
    // console.log(Date.parse(data.datetime));

    let diff = (new Date()).getTime() - (Date.parse(data.datetime) + lastTime);
    // console.log(lastTime);
    return diff;
  }
  catch (e) {
    console.error(e);
    return NaN;
  }
}

async function actuallyGetTime() {
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let response = await getTime(timezone);
  if (Number.isNaN(response)) {
    document.getElementById("tower-cell")!.style.opacity = "0.5";
  }
  else {
    document.getElementById("tower-cell")!.style.opacity = "1";
  }
  let date = new Date((new Date()).getTime() + response);
  return date.getTime();
}

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [itRan, setItRan] = useState(false);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme !== null) {
      setIsDark(theme === "true");
      setItRan(true);
      // console.log("1: ", true);
    }
  }, []);



  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark: boolean) => { if (itRan === false) setIsDark(isSystemDark) }
  );

  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    let itRan1 = false;
    if (theme !== null) {
      itRan1 = true;
    }
    if (itRan === false && itRan1 === false) {
      // console.log(itRan);
      setIsDark(systemPrefersDark ? true : false);
    }
  }, [setIsDark, systemPrefersDark, itRan]);

  useEffect(() => {
    localStorage.setItem('theme', isDark.toString());
  }, [isDark]);


  useEffect(() => {
    // let date = new Date();
    // let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timer = setInterval(() => {

      // console.log("hi");
      setDate(d => new Date(d.getTime() + 10));
    }, 10);
    // timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    actuallyGetTime().then((epoch) => {
      setDate(new Date(epoch));
    });
    setDate(new Date());
    const getTime1 = setInterval(() => {
      actuallyGetTime().then((epoch) => {
        setDate(new Date(epoch));
      });
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let date = new Date();
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var offset = date.getTimezoneOffset(), o = Math.abs(offset);
    var offsetStr = (offset > 0 ? "-" : "+") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    document.getElementById('timezone')!.innerText += " " + timezone + " (" + offsetStr + ")";
  }, []);

  let ms = ('0' + Math.floor(date.getMilliseconds() / 10)).slice(-2);
  let s = ('0' + date.getSeconds()).slice(-2);
  let m = ('0' + date.getMinutes()).slice(-2);
  let h = ('0' + date.getHours()).slice(-2);
  let d = ('0' + date.getDate()).slice(-2);
  let dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + h + ":" + m + ":" + s + "." + ms;
  let dateStr1 = d + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let timeStr = h + ":" + m + ":" + s;
  let msStr = "." + ms;
  let utcDateStr = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + "T" + ('0' + date.getUTCHours()).slice(-2) + ":" + ('0' + date.getUTCMinutes()).slice(-2) + ":" + ('0' + date.getUTCSeconds()).slice(-2) + "." + ('0' + Math.floor(date.getUTCMilliseconds() / 10)).slice(-2);
  let utcTimeStr = ('0' + date.getUTCHours()).slice(-2) + ":" + ('0' + date.getUTCMinutes()).slice(-2) + ":" + ('0' + date.getUTCSeconds()).slice(-2) + "." + ('0' + Math.floor(date.getUTCMilliseconds() / 10)).slice(-2);
  let utcDateStr1 = ('0' + date.getUTCDate()).slice(-2) + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
  return (
    <main className="main flex min-h-screen flex-col items-center justify-center p-4">
      <div>
        <h1 className="timeStr">
          <time dateTime={dateStr} className="timeEl flex flex-col" suppressHydrationWarning>
            <span className="dateString" suppressHydrationWarning>{dateStr1}</span>
            <div>
              <span suppressHydrationWarning>{timeStr}</span>
              <span className='ms' suppressHydrationWarning>{msStr}</span>
              <span id="tower-cell" className='tower-cell ml-2'><FontAwesomeIcon icon={faTowerCell} /></span>
            </div>
          </time>
        </h1>
        <div className="info-div flex gap-2 flex-row justify-between w-full">
          <div className="gap-2 flex items-center">
            <Toggle
              checked={isDark}
              onChange={({ target }) => setIsDark(target.checked)}
              icons={{ checked: "🌙", unchecked: "🔆" }}
              aria-label="Dark mode toggle"
            />
            <span id="timezone" className="timezone">Timezone:</span>
          </div>
          <span>UTC: <time id="utc" suppressHydrationWarning dateTime={utcDateStr}>{utcDateStr1} {utcTimeStr}</time> </span>
        </div>
      </div>
    </main>
  )
}
