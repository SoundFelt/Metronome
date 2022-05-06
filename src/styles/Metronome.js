import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    running: (props) => ({
      animationName: 'moveSlider',
      animationDuration: props.clickInterval,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    }),
    "@global" : {
      "@keyframes moveSlider" : {
        "0%" : {
            transformOrigin: 'bottom'
        },
        "25%" : {
            transform: 'rotate(-40deg)',
            transformOrigin: 'bottom',
        },
        "75%" : {
            transform: 'rotate(40deg)',
            transformOrigin: 'bottom'
        },
        "100%" : {
            transform: 'rotate(0deg)',
            transformOrigin: 'bottom'
        }
    }
  }
  })