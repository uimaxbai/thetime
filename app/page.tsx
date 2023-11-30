"use client";
import React, { useState, useEffect } from 'react';
import './normal.css';

async function getTime(timezone: string) {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/'+timezone); // Update with your server URL
    const data = await response.json();
    return data;
  }
  catch (e) {
    console.error(e);
    return {};
  }
}

export default function Home() {
  const [date, setDate] = useState(new Date());

  // TODO: subtract time it took for server to respondS
  useEffect(() => {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let currentTime = date.getTime();
    let response: object;
    const timer = setInterval(() => {
      // console.log("hi");
      currentTime += 10;
      setDate(new Date(currentTime));
    }, 10);
    const getTime1 = setInterval(function () {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      response = getTime(timezone);
      setDate(new Date(response.datetime));
      currentTime = date.getTime();
    }, 60000);
    var offset = date.getTimezoneOffset(), o = Math.abs(offset);
    var offsetStr = (offset > 0 ? "-" : "+") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    document.getElementById('timezone')!.innerText = "Timezone: " + timezone + " (" + offsetStr + ")";

    return () => {
      clearInterval(timer);
    };
  }, []);
  let ms = ('0' + Math.floor(date.getMilliseconds() / 10)).slice(-2);
  let s = ('0' + date.getSeconds()).slice(-2);
  let m = ('0' + date.getMinutes()).slice(-2);
  let h = ('0' + date.getHours()).slice(-2);
  let dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + h + ":" + m + ":" + s + "." + ms;
  let dateStr1 = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let timeStr = h + ":" + m + ":" + s;
  let msStr = "." + ms;
  return (
    <main className="main flex min-h-screen flex-col items-center justify-center p-4">
      <div>
        <h1 className="timeStr"><time dateTime={dateStr} className="timeEl flex flex-col" suppressHydrationWarning><span className="dateString" suppressHydrationWarning>{dateStr1}</span><div><span suppressHydrationWarning>{timeStr}</span><span className='ms' suppressHydrationWarning>{msStr}</span></div></time></h1>
        <div className="info-div flex gap-2 flex-row justify-items-start w-full">
          <span id="timezone" className="timezone"></span>
          <span></span>
        </div>
      </div>
    </main>
  )
}
