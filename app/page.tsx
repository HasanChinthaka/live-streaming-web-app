"use client"

import useUser from '@/hooks/useUser';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from "uuid";

const Home = () => {
  const [roomID, setRoomID] = useState("");
  const router = useRouter();
  const { fullName, setFullName } = useUser();

  useEffect(() => {
    setFullName("");
  }, [setFullName])
  return (
    <div className='w-full h-screen'>
      <section className='bg-gray-950 text-white'>
        <div className="mx-auto max-w-screen-xl h-screen px-4 md:py-12 py-32 flex-col gap-24 flex items-center">
          <Image src="/logo.png" alt='log' width={200} height={200} />
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="bg-gradient-to-r h-[60px] from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-5xl">
              {`Have a smooth live streaming`}
            </h1>
            <p className="mx-auto mt-6 max-w-4xl sm:text-xl/relaxed">
              Go live, join a stream, or watch others — it’s easy and fun! <br />
              <span className='text-base'>Just choose your role (Host, Co-host, or Audience) and start connecting with people in real-time.</span>
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <input
                type="text"
                id='name'
                onChange={(e) => setFullName(e.target.value.toString())}
                className='border rounded-md focus:border-transparent focus:outline-none bg-white focus:ring-0 px-4 py-2 w-full text-black'
                placeholder='Enter your name'
              />
            </div>
            {fullName && fullName.length >= 3 && (
              <>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <input
                    type="text"
                    id="roomid"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    className="border rounded-md focus:border-transparent focus:outline-none bg-white focus:ring-0 px-4 py-2 w-full text-black"
                    placeholder="Enter room ID to join a live stream"
                  />
                  <button
                    className="rounded-md bg-blue-600 px-10 py-[11px] text-sm font-medium text-white focus:outline-none sm:w-auto"
                    onClick={() => router.push(`/Room/${roomID}?role=Audience`)}
                    disabled={!roomID}
                  >
                    Join
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="text-lg font-medium hover:text-blue-400 hover:underline hover:cursor-pointer"
                    onClick={() => router.push(`/room/${uuid()}`)}
                  >
                    Or start a new live stream
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home