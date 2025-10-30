import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import { getUserIcon } from '../../utils/getUserIcon';
import type { User } from '../../../../features/users/types';
import { useMap } from 'react-leaflet';
import { useUsersContext } from '../../../../features/users/context/UsersContext';
import { getPopapHTML } from '../../utils/getPopapHTML';

const MapMarkerCluster = ({ users }: { users: User[] }) => {
    const map = useMap();
    const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
    const { filterByInterest } = useUsersContext();

    useEffect(() => {
        clusterRef.current = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 80,
        });
        map.addLayer(clusterRef.current);

        return () => {
            map.removeLayer(clusterRef.current!);
            clusterRef.current = null;
        };
    }, [map]);

    useEffect(() => {
        if (!clusterRef.current) return;

        clusterRef.current.clearLayers();

        users.forEach(user => {
            const marker = L.marker([user.lat, user.lon], {
                icon: getUserIcon(user.gender ?? null),
            });
            const popupHtml = getPopapHTML(user);
            marker.bindPopup(popupHtml);
            clusterRef.current?.addLayer(marker);
        });
    }, [users]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onPopupOpen = (e: any) => {
            const popup = e.popup._contentNode as HTMLElement;

            popup.addEventListener('click', ev => {
                const chip = (ev.target as HTMLElement).closest('.marker-chip');
                if (!chip) return;

                const interest = (chip as HTMLElement).dataset.interest;
                if (interest) {
                    filterByInterest(interest);
                    map.closePopup();
                }
            });
        };

        map.on('popupopen', onPopupOpen);

        return () => {
            map.off('popupopen', onPopupOpen);
        };
    }, [map, filterByInterest]);

    return null;
};

export default MapMarkerCluster;
