import { Music4, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const MUTE_STORAGE_KEY = 'phonics-hub-ambient-jazz-muted'
const BAR_DURATION = 2.4
const MASTER_VOLUME = 0.16

const progression = [
  { bass: 48, chord: [60, 64, 67, 71] },
  { bass: 53, chord: [60, 65, 69, 72] },
  { bass: 50, chord: [57, 60, 64, 67] },
  { bass: 55, chord: [59, 62, 65, 69] },
]

function midiToFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12)
}

function createNoiseBuffer(context) {
  const buffer = context.createBuffer(1, context.sampleRate * 0.35, context.sampleRate)
  const channel = buffer.getChannelData(0)

  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = Math.random() * 2 - 1
  }

  return buffer
}

function playNote(context, destination, note, startTime, duration, options = {}) {
  const oscillator = context.createOscillator()
  const gainNode = context.createGain()
  const filter = context.createBiquadFilter()
  const vibratoOscillator = context.createOscillator()
  const vibratoGain = context.createGain()

  oscillator.type = options.type ?? 'triangle'
  oscillator.frequency.value = midiToFrequency(note)
  filter.type = 'lowpass'
  filter.frequency.value = options.filterFrequency ?? 1800
  filter.Q.value = 0.7

  vibratoOscillator.type = 'sine'
  vibratoOscillator.frequency.value = options.vibratoRate ?? 4.5
  vibratoGain.gain.value = options.vibratoDepth ?? 2.5

  gainNode.gain.setValueAtTime(0.0001, startTime)
  gainNode.gain.linearRampToValueAtTime(options.volume ?? 0.045, startTime + 0.04)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  vibratoOscillator.connect(vibratoGain)
  vibratoGain.connect(oscillator.frequency)
  oscillator.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(destination)

  oscillator.start(startTime)
  oscillator.stop(startTime + duration)
  vibratoOscillator.start(startTime)
  vibratoOscillator.stop(startTime + duration)
}

function playBrushHit(context, destination, noiseBuffer, startTime) {
  const source = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gainNode = context.createGain()

  source.buffer = noiseBuffer
  filter.type = 'highpass'
  filter.frequency.value = 1900
  gainNode.gain.setValueAtTime(0.0001, startTime)
  gainNode.gain.linearRampToValueAtTime(0.018, startTime + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22)

  source.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(destination)

  source.start(startTime)
  source.stop(startTime + 0.24)
}

function scheduleBar(audioState) {
  const { context, masterGain, noiseBuffer } = audioState
  const pattern = progression[audioState.step % progression.length]
  const startTime = context.currentTime + 0.08

  pattern.chord.forEach((note, index) => {
    playNote(context, masterGain, note, startTime + index * 0.01, 1.8, {
      volume: 0.032,
      filterFrequency: 1500,
      vibratoDepth: 1.4,
    })
  })

  playNote(context, masterGain, pattern.bass, startTime, 0.92, {
    type: 'sine',
    volume: 0.03,
    filterFrequency: 520,
    vibratoDepth: 0.2,
  })

  playNote(context, masterGain, pattern.bass + 7, startTime + 1.18, 0.82, {
    type: 'sine',
    volume: 0.024,
    filterFrequency: 540,
    vibratoDepth: 0.2,
  })

  ;[0.1, 0.7, 1.25, 1.8].forEach((offset) => {
    playBrushHit(context, masterGain, noiseBuffer, startTime + offset)
  })

  audioState.step += 1
}

function readStoredMuteState() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(MUTE_STORAGE_KEY) === 'true'
}

export function AmbientMusicPanel() {
  const [isMuted, setIsMuted] = useState(readStoredMuteState)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef({
    context: null,
    intervalId: null,
    masterGain: null,
    noiseBuffer: null,
    step: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted))
  }, [isMuted])

  useEffect(() => {
    const audioState = audioRef.current

    if (!audioState.masterGain || !audioState.context) {
      return
    }

    audioState.masterGain.gain.setTargetAtTime(
      isMuted ? 0.0001 : MASTER_VOLUME,
      audioState.context.currentTime,
      0.12,
    )
  }, [isMuted])

  useEffect(
    () => () => {
      const audioState = audioRef.current

      if (audioState.intervalId) {
        window.clearInterval(audioState.intervalId)
      }

      if (audioState.context) {
        audioState.context.close().catch(() => {})
      }
    },
    [],
  )

  const togglePlayback = async () => {
    const audioState = audioRef.current

    if (!isPlaying) {
      if (!audioState.context) {
        const context = new window.AudioContext()
        const masterGain = context.createGain()

        masterGain.gain.value = isMuted ? 0.0001 : MASTER_VOLUME
        masterGain.connect(context.destination)

        audioState.context = context
        audioState.masterGain = masterGain
        audioState.noiseBuffer = createNoiseBuffer(context)
      }

      await audioState.context.resume()
      scheduleBar(audioState)
      audioState.intervalId = window.setInterval(() => {
        scheduleBar(audioState)
      }, BAR_DURATION * 1000)
      setIsPlaying(true)
      return
    }

    if (audioState.intervalId) {
      window.clearInterval(audioState.intervalId)
      audioState.intervalId = null
    }

    if (audioState.context) {
      await audioState.context.suspend()
    }

    setIsPlaying(false)
  }

  return (
    <section className="music-panel surface-card" aria-label="Ambient jazz player">
      <div className="music-panel__copy">
        <span className="music-panel__icon" aria-hidden="true">
          <Music4 size={18} strokeWidth={2} />
        </span>
        <div>
          <strong>Jazz Lounge</strong>
          <p>Optional ambient jazz for the portal.</p>
        </div>
      </div>

      <div className="music-panel__actions">
        <button className="ghost-button music-panel__button" onClick={togglePlayback} type="button">
          {isPlaying ? (
            <>
              <Pause aria-hidden="true" size={16} strokeWidth={2} />
              Pause
            </>
          ) : (
            <>
              <Play aria-hidden="true" size={16} strokeWidth={2} />
              Play
            </>
          )}
        </button>
        <button
          className="ghost-button music-panel__button"
          onClick={() => setIsMuted((currentValue) => !currentValue)}
          type="button"
        >
          {isMuted ? (
            <>
              <VolumeX aria-hidden="true" size={16} strokeWidth={2} />
              Unmute
            </>
          ) : (
            <>
              <Volume2 aria-hidden="true" size={16} strokeWidth={2} />
              Mute
            </>
          )}
        </button>
      </div>
    </section>
  )
}
