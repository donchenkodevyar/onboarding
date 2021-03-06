import React from 'react';

const useAnimationFrame = callback => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime)
        }
        previousTimeRef.current = time;
        requestRef.current = window.requestAnimationFrame(animate);
    }

    React.useEffect(() => {
        requestRef.current = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(requestRef.current);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useAnimationFrame;
