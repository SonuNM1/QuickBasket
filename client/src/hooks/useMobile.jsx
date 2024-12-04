import {useEffect, useState} from 'react'

/*

useMobile hook determines whether the viewport width is smaller than a specified breakpoint (default is 768 pixels). It's used to adjust a component's behaviour or styling for mobile versus desktop devices. 

The purpose of this code is to determine whether the user is accessing our application on a mobile device or a desktop based on the screen width. 

checks screen widht -> updates state -> responds to resizing 

*/


// Custom hook to determine if the current viewport width is below a breakpoint 

const useMobile = (breakpoint = 768) => {

    // State to store whether the current width is considered mobile 

    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

    // handleResize checks the current viewport (window.innerWidth) and updates the isMobile state accordingly 

    const handleResize = () => {
        const checkpoint = window.innerWidth < breakpoint   // Check if width is below the breakpoint 
        setIsMobile(checkpoint)     // updates the state 
    }

    // Effect to set up event listeners for window resizing 

    useEffect(()=>{
        handleResize()

        // add event listener for window resize 

        window.addEventListener('resize', handleResize)     

        // clean up event listener on component unmount 

        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    },[])   // empty dependency array ensures this runs only on mount and unmount

    return [isMobile]
}

export default useMobile

// 1.29