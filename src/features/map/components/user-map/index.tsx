import { memo, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import MapMartkerCluster from '../map-marker-cluster';
import type { User } from '../../../../features/users/types';

const MapInvalidateOnLoad = () => {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }, [map]);

    return null;
};

const center: L.LatLngTuple = [48.3794, 31.1656];

type UserMapProps = {
    users: User[];
};

export const UserMap = memo(({ users }: UserMapProps) => {
    return (
        <MapContainer
            center={center}
            zoom={6}
            style={{ height: '100vh', width: '100%' }}
            preferCanvas={true}
        >
            <MapInvalidateOnLoad />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapMartkerCluster key="markers" users={users} />
        </MapContainer>
    );
});
