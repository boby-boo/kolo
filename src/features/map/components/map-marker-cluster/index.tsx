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
        if (!clusterRef.current) {
            clusterRef.current = L.markerClusterGroup({
                chunkedLoading: true,
                maxClusterRadius: 80,
            });
            map.addLayer(clusterRef.current);
        }

        clusterRef.current.clearLayers();

        users.forEach(user => {
            const marker = L.marker([user.lat, user.lon], {
                icon: getUserIcon(user.gender ?? null),
            });

            const popupHtml = getPopapHTML(user);

            marker.bindPopup(popupHtml);
            clusterRef.current?.addLayer(marker);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map.on('popupopen', (e: any) => {
            const popup = e.popup._contentNode as HTMLElement;
            popup.querySelectorAll('.marker-chip').forEach(chip => {
                chip.addEventListener('click', ev => {
                    const interest = (ev.currentTarget as HTMLElement).dataset
                        .interest!;
                    filterByInterest(interest);
                    map.closePopup();
                });
            });
        });

        return () => {
            clusterRef.current?.clearLayers();
        };
    }, [users, map, filterByInterest]);

    return null;
};

export default MapMarkerCluster;
