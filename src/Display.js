import React from 'react'
import './styles/Display.css'
import {useStyles} from './styles/Metronome'
import {marks} from './extras/metronomeSpeeds'
import Slider from '@mui/material/Slider';


function Display(props) {

  // clickInterval passed via props to JSS styles to set animation speed.
  const classes = useStyles(props)

  const inInputEnter = (e) => {
    e.key === 'Enter' && !props.running && props.startMetronome()
    e.key === 'Enter' && props.running && props.stopMetronome()
  }
    
  return (
    <div>
        <div className={`slider ${props.running && classes.running}`}>
          <Slider orientation="vertical" track="inverted" defaultValue={props.sliderTempo} 
          step={1} marks={!props.running && marks} min={-240} max={-40} onClick={props.stopMetronome} 
          onChange={props.sliderChange}  value={props.sliderTempo}/>
        </div>

        <div className="input-container">
          <input placeholder="Enter BPM" className="bpm-input" name="bpm-input" onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
          max={240} min={40} type="number"
          value={props.inputTempo}  
          onChange={(e) => props.inputChange(e.target.value)}
          onKeyDown={inInputEnter}></input>
        </div>
       
        {!props.running 
          ? <div onClick={props.startMetronome} className="buttons start">Start</div>
          : <div onClick={props.stopMetronome} className="buttons stop">Stop</div>}

    </div>
  )
}

export default Display