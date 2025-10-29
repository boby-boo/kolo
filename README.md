# 🗺 Kolo - Interactive Users Map

_WebSite: https://kolo-five.vercel.app/_

Kolo is a React + TypeScript application that helps users discover people with similar interests on an interactive map.
You can search for users by typing in the search bar or by clicking on their interests directly inside pop-ups.
All users are visualized as map markers with smart clustering for smooth navigation and performance.

## 🚀 Features

🔍 Search by interests - filter users instantly via the input field.

🎯 Click-to-filter - click on an interest to see all users who share it.

🗺 Interactive map - powered by Leaflet with marker clustering.

💬 User pop-ups - view user details (name, age, bio, interests).

⚡️ Optimized rendering - uses React.memo, useMemo, and useDebounce for smooth updates.

## 🧠 Tech Stack

React
TypeScript
SCSS
Leaflet.js

## ⚙️ Performance Optimizations

React.memo - prevents unnecessary component re-renders.
useMemo - memoizes filtered user lists for efficiency.
useDebounce - delays updates for smoother user input.
