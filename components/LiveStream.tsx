"use client";

import { useEffect, useRef } from 'react';
import useUser from '@/hooks/useUser';
import { usePathname, useSearchParams } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 as uuid } from "uuid";

const LiveStream = ({ roomid }: { roomid: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { fullName } = useUser(); // fixed typo: `fullName` should match your Zustand store

  const roleStr = searchParams.get("role") || "Host";
  const role =
    roleStr === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : roleStr === 'Cohost'
        ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;

  useEffect(() => {
    if (!containerRef.current) return;

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
    const userName = fullName || `User-${Date.now()}`;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomid,
      uuid(),
      userName,
      720
    );

    const sharedLinks: { name: string; url: string }[] = [];
    const currentUrl = `${window.location.origin}${pathname}`;
    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
      sharedLinks.push({
        name: "Join as co-host",
        url: `${currentUrl}?role=Cohost`,
      });
    }
    sharedLinks.push({
      name: "Join as audience",
      url: `${currentUrl}?role=Audience`,
    });

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: { role },
      },
      sharedLinks,
    });
  }, [roomid, pathname, role, fullName]);

  return (
    <div ref={containerRef} className="w-full h-screen" />
  );
};

export default LiveStream;
