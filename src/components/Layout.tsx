import { ReactElement } from "react"
import { NftProvider } from "../context/main-data"
import Footer from "./Footer"
import { Navbar } from "./Navbar"

interface layoutInterfaces {
    children: ReactElement
}

const Layout: React.FC<layoutInterfaces> = (props) => {
    const { children } = props

    return (
        <NftProvider>
            <Navbar/>
            <main style={{minHeight: "calc(100vh - 136px)", overflow: "auto"}}>{children}</main>
            <Footer/>
        </NftProvider>
    )
}

export default Layout