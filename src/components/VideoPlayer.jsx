import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react'

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function VideoPlayer({ src, poster, title, className = '' }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video starts playing automatically (running mode)
    video.muted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked fallback
          setIsPlaying(false)
        })
    }
  }, [src])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    setDuration(video.duration)
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (!video || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1)
    video.currentTime = percent * duration
    setCurrentTime(video.currentTime)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 2800)
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e3dbd1] bg-black shadow-xl select-none ${className}`}
    >
      {/* Video Tag */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="h-full w-full object-cover cursor-pointer"
        aria-label={title || 'Documentary film'}
      />

      {/* Top Floating Badge */}
      <div className="pointer-events-none absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3 py-1 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
        </span>
        <span className="font-sans text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-wider text-white uppercase">
          Field Recording
        </span>
      </div>

      {/* Sound Indicator Badge (Clickable to quickly unmute) */}
      {isMuted && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md transition-all hover:bg-black/90 hover:scale-105"
        >
          <VolumeX className="h-3.5 w-3.5 text-bronze" />
          <span className="font-sans text-[0.68rem] tracking-wide">Tap to Unmute</span>
        </button>
      )}

      {/* Large Center Play Overlay (when paused) */}
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all"
          aria-label="Play video"
        >
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-white/80 bg-black/60 text-white shadow-2xl transition-transform hover:scale-110">
            <Play className="h-7 w-7 sm:h-9 sm:w-9 translate-x-0.5 text-white fill-white" />
          </div>
        </button>
      )}

      {/* Video Control Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-5 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar (Scrubber) */}
        <div
          onClick={handleSeek}
          className="group/bar relative mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/25 transition-all hover:h-2.5"
        >
          <div
            className="h-full rounded-full bg-[#C9A15A] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `calc(${progressPercent}% - 7px)` }}
          />
        </div>

        {/* Buttons & Timer */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-white" />
              ) : (
                <Play className="h-4 w-4 translate-x-0.5 fill-white" />
              )}
            </button>

            {/* Mute/Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>

            {/* Time Stamp */}
            <span className="font-mono text-xs text-white/80 select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Restart loop */}
            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0
                  videoRef.current.play()
                  setIsPlaying(true)
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="Restart"
              aria-label="Restart"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="Fullscreen"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
