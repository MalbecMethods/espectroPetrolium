import  Nav  from "../components/Nav.jsx"
import '../../public/css/index.css'
import Leaflet from "../components/Leaflet.jsx";

export const Maps = () => {
    return(
        <>
            <Nav />
            <h1>Ubicación de Yacimientos</h1>
            <Leaflet />
        </>
    )
}
