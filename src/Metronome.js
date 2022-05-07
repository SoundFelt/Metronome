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

    const [inputTempo, setInputTempo] = useState(132)
    const [sliderTempo, setSliderTempo] = useState(-132)
    const [running, setRunning] = useState(false)
    const [clickInterval, setClickInterval] = useState()
    const [signature, setSignature] = useState(4)

    const startMetronome = () => {
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
        sounds.primarySound.play()
        
        window.mainBeat = setInterval(() => {
          clearInterval(window.secondaryBeat)
          sounds.primarySound.play()
          startSecondaryBeat()
        }, milliSeconds * signature + 5)

        const startSecondaryBeat = () => {
          let y = 0
          window.secondaryBeat = setInterval(()=> {
          if (++y === signature - 1) {
          clearInterval(window.secondaryBeat) 
          }
          sounds.secondarySound.volume = 0.7
          sounds.secondarySound.play()
          }, milliSeconds + 5)
        } 
        startSecondaryBeat()
      }, milliSeconds * 2 / 4) 
    }

    const stopMetronome = () => {
      setRunning(false)
      clearInterval(window.clickId)
      clearInterval(window.mainBeat)
      clearInterval(window.secondaryBeat)
      const sliderValue = inputToSlider(inputTempo)
      setSliderTempo(sliderValue)
    }

    const sliderChange = (e) => {
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

    const inputChange = (value) => {
        value < 240 && value > 40 ? setInputTempo(value) : setInputTempo(40)
        setInputTempo(value)
        const sliderValue = inputToSlider(value)
        if (running === false) {
          if (sliderValue > -40) {
            setSliderTempo(-40)
          } 
          else if (sliderValue < -240 ) {
            setSliderTempo(-240)
          } else {
            setSliderTempo(sliderValue)
          }
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