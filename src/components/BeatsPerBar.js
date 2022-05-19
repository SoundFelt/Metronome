import React from 'react'
import '../styles/BeatsPerBar.css'
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function BeatsPerBar(props) {

    const changeBeatsPerBar = (value) => {
        props.stopMetronome()
        props.setSignature(value)
    }

  return (
    <div>
    <FormControl className="radio-control">
    <FormLabel className="radio-label">Select Beats Per Bar</FormLabel>
    <RadioGroup defaultValue="four" name="beats-per-bar" row>
        <FormControlLabel labelPlacement="bottom" className="radio" 
        onClick={() => changeBeatsPerBar(2)} value="two" control={<Radio />} label="2" />
        <FormControlLabel labelPlacement="bottom" className="radio"
        onClick={() => changeBeatsPerBar(3)} value="three" control={<Radio />} label="3" />
        <FormControlLabel labelPlacement="bottom" className="radio" 
        onClick={() => changeBeatsPerBar(4)} value="four" control={<Radio />} label="4" />
        <FormControlLabel labelPlacement="bottom" className="radio"
        onClick={() => changeBeatsPerBar(6)} value="six" control={<Radio />} label="6" />
    </RadioGroup>
    </FormControl>
    </div>
  )
}

export default BeatsPerBar