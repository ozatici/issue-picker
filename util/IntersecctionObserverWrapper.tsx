import React from "react";
import { useRef, useEffect } from "react";

const IntersectionObserverWrapper = ({ fetchEntries }) => {
    const endRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchEntries();
                }
            },
            {
                threshold: 1,
            }
        );
        if (endRef.current) {
            observer.observe(endRef.current);
        }
        return () => {
            if (endRef.current) {
                observer.unobserve(endRef.current);
            }
        };
    }, [fetchEntries]);


    return <div ref={endRef} />;

}

export default IntersectionObserverWrapper
