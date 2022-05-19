import React, {useState} from 'react'
import '../styles/TapTempo.css'

function TapTempo(props) {

    const [clicks, setClicks] = useState([])
    const [clickGap, setClickGap] = useState([])

    const tapSetPulse = () => { 
        props.stopMetronome()
        const date = new Date()
        const clickMilliSecond = date.getTime()

        // Each click will add the current time in milliSeconds in array.
        setClicks((prevState) => [...prevState, clickMilliSecond])
        if (clicks.length) {
        const lastClick = clicks.slice(-1)
        const distance = clickMilliSecond - lastClick

        // ClickGap adds the duration between each previous two clicks
        setClickGap((prevState) => [...prevState, distance])
        
            // Tracks if duration from one click to another is 10% slower or quicker, and if so resets the state.
            if(clickGap.length >= 2) {
                const percent = 0.1 * clickGap.slice(-1)[0] 
                if (distance > clickGap.slice(-1)[0]){
                    if (distance > clickGap.slice(-1)[0] + percent) {
                        setClicks([])
                        setClickGap([])
                        console.log('Over 10% longer - reset')
                    } 
                }
                else {
                    if (distance < clickGap.slice(-1)[0] - percent) { 
                        setClicks([])
                        setClickGap([])
                        console.log('Over 10% quicker - reset')
                    }
                }

                // reduce adds all durations between clicks
                const arrayTotal = clickGap.reduce((total, currentVal) => {
                    const firstfigure = total + currentVal
                    return firstfigure  
                })
                // gets the average duration by taking the total of all durations and dividing by how many clicks there are
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