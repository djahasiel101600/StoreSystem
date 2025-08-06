import { useEffect, useRef } from 'react';
import song from '../../assets/scanner beep.mp3'; // or use public path: '/audio/song.mp3'

const AutoPlayAudio = ({shouldPlayAudio}: {shouldPlayAudio: boolean}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulate your condition (replace with your real logic)


  useEffect(() => {
    if (shouldPlayAudio && audioRef.current) {
      const playPromise = audioRef.current.play();

      // Optional: handle autoplay blocking by browser
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay prevented:', error);
        });
      }
    }
  }, [shouldPlayAudio]);

  return <audio ref={audioRef} src={song} />;
};

export default AutoPlayAudio;
