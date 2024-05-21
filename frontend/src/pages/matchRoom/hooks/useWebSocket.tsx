import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export function useWebSocket(url: string) {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(url);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  return socketRef.current;
}
