import React, { useState } from 'react';
import Globe from 'react-globe.gl';

function App() {
  // 1. State to store the current place name
  const [placeName, setPlaceName] = useState('Click anywhere on the globe!');

  // 2. Async function to handle clicks and call the API
  const handleGlobeClick = async ({ lat, lng }) => {
    setPlaceName('Fetching location...');
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setPlaceName(data.display_name);
      } else {
        setPlaceName('No address found for this location (maybe the ocean!).');
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      setPlaceName('Failed to fetch location data.');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, overflow: 'hidden', position: 'relative' }}>
      
      {/* 3. Floating Overlay Box */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#ffffff',
          padding: '16px 20px',
          borderRadius: '8px',
          maxWidth: '380px',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
          Selected Location
        </h4>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.4' }}>
          {placeName}
        </p>
      </div>

      {/* Globe Component */}
      <Globe
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        onGlobeClick={handleGlobeClick}
      />
    </div>
  );
}

export default App;