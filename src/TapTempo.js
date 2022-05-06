import React, {useState} from 'react'
import './styles/TapTempo.css'

function TapTempo(props) {

    const [clicks, setClicks] = useState([])
    const [clickGap, setClickGap] = useState([])

    const tapSetPulse = () => { 
        props.stopMetronome()
        const date = new Date()
        const clickMilliSecond = date.getTime()
        setClicks((prevState) => [...prevState, clickMilliSecond])
        if (clicks.length) {
        const lastClick = clicks.slice(-1)
        const distance = clickMilliSecond - lastClick
        setClickGap((prevState) => [...prevState, distance])
        
            if(clickGap.length >= 2) {
                const percent = 0.1 * clickGap.slice(-1)[0] 
                if (distance > clickGap.slice(-1)[0]){
                    if (distance > clickGap.slice(-1)[0] + percent) {
                        setClicks([])
                        setClickGap([])
                        console.log('Over 20% longer - reset')
                    } 
                }
                else {
                    if (distance < clickGap.slice(-1)[0] - percent) { 
                        setClicks([])
                        setClickGap([])
                        console.log('Over 20% quicker - reset')
                    }
                }
                const arrayTotal = clickGap.reduce((total, currentVal) => {
                    const firstfigure = total + currentVal
                    return firstfigure  
                })
                const average = arrayTotal / clickGap.length
                const bpm = Math.round(60000 / average) + 8
                props.inputChange(bpm)
            } 
    }  
}

  return (
    <div>
        <button className="tap-button" 
        onClick={tapSetPulse}>Click/Tap To Set Pulse</button>
    </div>
  )
}

export default TapTempo