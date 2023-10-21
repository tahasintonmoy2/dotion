import React, {ReactNode} from "react"
import Navbar from "./_components/navbar"

const LandingPage = ({
    children
}:{
    children: ReactNode
}) => {
    return (
        <div className="h-full dark:bg-[#020817]">
            <Navbar/>
            <main className="h-full pt-40">
                {children}
            </main>
        </div>
    )
}

export default LandingPage