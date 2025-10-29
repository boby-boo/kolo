import L from 'leaflet';
import type { Gender } from '../../../features/users/types';
import { COLORS } from '../../../features/constants';

export const getUserIcon = (gender: Gender) => {
    let color = COLORS.default;
    if (gender === 'Male') color = COLORS.male;
    else if (gender === 'Female') color = COLORS.female;
    else color = COLORS.other;

    const neonStyle = `
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${color};
    box-shadow:
      0 0 6px ${color},
      0 0 12px ${color},
      0 0 22px ${color},
      inset 0 0 6px rgba(255,255,255,0.4);
  `;

    return L.divIcon({
        className: 'neon-marker',
        html: `<div style="${neonStyle}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
    });
};
