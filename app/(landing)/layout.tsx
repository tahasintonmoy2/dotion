import React, {ReactNode} from "react"
import Navbar from "./_components/navbar"

const LandingPage = ({
    children
}:{
    children: ReactNode
}) => {
    return (
        <div className="h-full dark:bg-[#0f111a]">
            <Navbar/>
            <main className="h-full pt-40">
                {children}
            </main>
        </div>
    )
}

export default LandingPage