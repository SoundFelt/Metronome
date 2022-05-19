import React, {useState} from 'react'
import './styles/Metronome.css'
import metronome from './extras/metronome.png'
import Display from './Display'
import BeatsPerBar from './BeatsPerBar'
import TapTempo from './TapTempo'
import primarySound from './extras/metronomeSoundOne.1.wav'
import secondarySound from './extras/metronomeSoundTwo.1.wav'

function Metronome() {
     
    const sounds = {
      primarySound: new Audio(primarySound),
      secondarySound: new Audio(secondarySound)
    }
    sounds.secondarySound.volume = 0.7

    const [inputTempo, setInputTempo] = useState(132)
    const [sliderTempo, setSliderTempo] = useState(-132)
    const [running, setRunning] = useState(false)
    const [clickInterval, setClickInterval] = useState()
    const [signature, setSignature] = useState(4)

    // intervalIDs saved to state, so they can be stopped in the stopMetronome function
    const [mainIntervalID, setMainIntervalID] = useState()
    const [secondaryIntervalID, setSecondaryIntervalID] = useState()

    const startMetronome = () => {
      // if entered tempo/tapped tempo is lower than 40 or greater than 240, stop metronome and reset the tempo
      if (inputTempo < 40) {
        setInputTempo(40)
        stopMetronome()
        return
      } 
      if (inputTempo > 240) {
        setInputTempo(240)
        stopMetronome()
        return
      }
      stopMetronome() 
      setRunning(true)
      const milliSeconds = 60 / inputTempo * 1000
      setClickInterval(milliSeconds * 2)    
      clickSequence(milliSeconds)
    }

    const clickSequence = (milliSeconds) => {
      setTimeout(() => {
        // first main click happens outside the interval to ensure it's with animation
        sounds.primarySound.play()
        
        // mainBeat interval will click at the start of each bar depending on signature (milliSeconds * signature)
         const mainBeat = setInterval(() => {
          sounds.primarySound.play()
          startSecondaryBeat()
        }, milliSeconds * signature)
          setMainIntervalID(mainBeat)

        // secondaryBeat function is called by mainBeat interval, starting the secondary clicks.
        // Once x reaches the signature, the interval is stopped so that it doesn't click with mainBeat.
        // mainBeat interval runs again and the cycle repeats.
        const startSecondaryBeat = () => {
          let x = 0
          const secondaryBeat = setInterval(()=> {
          if (++x === signature) {
          clearInterval(secondaryBeat)
          return
          }
          sounds.secondarySound.play()
          }, milliSeconds)
          setSecondaryIntervalID(secondaryBeat)
        } 
        startSecondaryBeat()
        // setTimeout to start the click sequence at the same time the animation runs
      }, milliSeconds * 2 / 4) 
    }

    const stopMetronome = () => {
      setRunning(false)
      clearInterval(mainIntervalID)
      clearInterval(secondaryIntervalID)
      const sliderValue = inputToSlider(inputTempo)
      setSliderTempo(sliderValue)
    }

    // Both sliderChange & inputToSlider sets the correct value for the stick(slider) and tempo input.
    const sliderChange = (e) => {
        stopMetronome()
        setSliderTempo(e.target.value)
        const tempoRemovedMinus = e.target.value.toString().slice(1)
        setInputTempo(parseInt(tempoRemovedMinus))
    }

    const inputToSlider = (value) => {
        const tempoString = value.toString()
        const minus = '-'
        const tempoAddedMinus = parseInt(minus.concat(tempoString))
        return tempoAddedMinus
    }

    // Runs when new tempo entered into input
    const inputChange = (value) => {
        value < 240 && value > 40 ? setInputTempo(value) : setInputTempo(40)
        setInputTempo(value)
        if (value > 40 && value < 240) {
        const sliderValue = inputToSlider(value)
        setSliderTempo(sliderValue)
        }
    }

  return (
    <div className="metronome-container">
      <div className="absolute-position-container">
        <img className="metronome-img" src={metronome} alt="metronome"/>
        
        <Display inputTempo={inputTempo} inputChange={inputChange} running={running}
        sliderChange={sliderChange} sliderTempo={sliderTempo} clickInterval={clickInterval}
        stopMetronome={stopMetronome} startMetronome={startMetronome}/>

        <TapTempo inputChange={inputChange} stopMetronome={stopMetronome}/>

        <BeatsPerBar stopMetronome={stopMetronome} setSignature={setSignature}/>
      </div>
    </div>
  )
}

export default Metronome