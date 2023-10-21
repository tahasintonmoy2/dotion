import {useState, useEffect} from 'react'

export const useOrigin = ()=>{
    const [muted, setIsMuted] = useState(false);
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : "";

    useEffect(()=>{
        setIsMuted(true)
    },[]);

    if(!muted){
        return "";
    }

    return origin
}