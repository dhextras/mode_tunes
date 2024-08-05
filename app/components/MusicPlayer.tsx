import React from "react";

import Controls from "~/components/PlayerComponents/Controls";
import Player from "~/components/PlayerComponents/Player";
import Seekbar from "~/components/PlayerComponents/Seekbar";
import Track from "~/components/PlayerComponents/Track";
import VolumeBar from "~/components/PlayerComponents/VolumeBar";
import { usePlayer } from "~/hooks/usePlayer";

import type { CategoryProp, SongProp } from "~/types/db.types";

interface MusicPlayerProps {
  activeCategory: CategoryProp | null;
  activeSongs: SongProp[];
}

// IMPORTANT TODO: 1. Clean the code since you fcking copy & pasted it, 2. Make it responsive for mobile, 3. Add Neumorphism effect
function MusicPlayer({ activeCategory, activeSongs }: MusicPlayerProps) {
  const {
    currentSongs,
    currentIndex,
    isActive,
    isPlaying,
    activeSong,
    duration,
    seekTime,
    appTime,
    volume,
    repeat,
    shuffle,
    playPause,
    nextSong,
    prevSong,
    setDuration,
    setSeekTime,
    setAppTime,
    setVolume,
    setRepeat,
    setShuffle,
  } = usePlayer(activeSongs);

  const handlePlayPause = () => {
    if (!isActive) return;
    playPause(!isPlaying);
  };

  if (currentSongs.length === 0 || !activeSong || !activeCategory) return null;

  return (
    <div className="flex items-center justify-between bg-gray-800 p-2 px-8 text-white sm:px-12">
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeCategory={activeCategory}
        activeSong={activeSong}
      />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={prevSong}
          handleNextSong={nextSong}
        />
        <Seekbar
          value={appTime}
          min={0}
          max={duration}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSeekTime(Number(event.target.value))
          }
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          isPlaying={isPlaying}
          volume={volume}
          seekTime={seekTime}
          onEnded={nextSong}
          onTimeUpdate={(event: React.SyntheticEvent<HTMLAudioElement>) =>
            setAppTime(event.currentTarget.currentTime)
          }
          onLoadedData={(event: React.SyntheticEvent<HTMLAudioElement>) =>
            setDuration(event.currentTarget.duration)
          }
          repeat={repeat}
        />
      </div>
      <VolumeBar
        value={volume}
        min={0}
        max={1}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setVolume(Number(event.target.value))
        }
        setVolume={setVolume}
      />
    </div>
  );
}

export default MusicPlayer;
