import {useState} from "react";
import {MapContainer, TileLayer, CircleMarker} from "react-leaflet";
import useReviews from "./hooks/useReviews";
import 'leaflet/dist/leaflet.css';
import './Map.css'

function Map() {
    function setChipotle() {
        setMapSelection("chipotle");
    }

    return (
        <>
            <div className="map-container-outer">
                <MapContainer
                    center={[33.88289815692969, -117.88520699382313]} // Fullerton coords
                    zoom={15.7}
                    zoomSnap={0}
                    zoomDelta={0.1}
                >
                    <TileLayer
                        url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=EONVu3wPN06Rzc03jRkO"
                    />
                    <CircleMarker
                        center={[33.88289815692969, -117.88520699382313]}
                        radius={9}

                        // Colors
                        fillColor="rgba(0, 102, 255, 0.25)"
                        color="rgb(0, 102, 255)"

                        // On Click
                        eventHandlers={{
                            click: setChipotle
                    }}
                    />
                </MapContainer>
            </div>
        </>
    )
}

export default Map;