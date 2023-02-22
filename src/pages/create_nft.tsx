import { ReactElement } from "react"
import Layout from "../components/Layout"

export default function CreateNFT() {
    return (
        <>CreateNFT</>
    )
}

CreateNFT.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}