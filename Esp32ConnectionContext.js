// // Esp32ConnectionContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { ref, onValue } from 'firebase/database';
// import { rtdb } from './config/firebase';

// // Create the context
// const Esp32ConnectionContext = createContext();

// // Create a provider component
// export const Esp32ConnectionProvider = ({ children }) => {
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);
//   const disconnectionTimeout = 5000; // 5 seconds timeout

//   // Listen to Firebase "deviceStatus" to update the last update time
//   useEffect(() => {
//     const statusRef = ref(rtdb, 'deviceStatus');
//     const unsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setLastUpdateTime(Date.now());
//       }
//       //   setIsEspConnected(true); // Set based on initial snapshot
//       // } else {
//       //   setIsEspConnected(false);
//       // }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Check connectivity periodically based on the last update time
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const timeSinceLastUpdate = currentTime - lastUpdateTime;
//       setIsEspConnected(timeSinceLastUpdate < disconnectionTimeout);
//     }, 2000); // Check every 2 seconds
//     return () => clearInterval(interval);
//   }, [lastUpdateTime]);

//   return (
//     <Esp32ConnectionContext.Provider value={{ isEspConnected, lastUpdateTime }}>
//       {children}
//     </Esp32ConnectionContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useEsp32Connection = () => {
//   const context = useContext(Esp32ConnectionContext);
//   if (!context) {
//     throw new Error('useEsp32Connection must be used within an Esp32ConnectionProvider');
//   }
//   return context;
// };


//____________________________________________________________________
//v2
// Update your Esp32ConnectionContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { ref, onValue } from 'firebase/database';
// import { rtdb } from './config/firebase';

// // Create the context
// const Esp32ConnectionContext = createContext();

// // Create a provider component
// export const Esp32ConnectionProvider = ({ children }) => {
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);
//   const disconnectionTimeout = 5000; // 5 seconds timeout

//   // Listen to Firebase "deviceStatus" to update the last update time
//   useEffect(() => {
//     const statusRef = ref(rtdb, 'deviceStatus');
//     const unsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setLastUpdateTime(Date.now());
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Check connectivity periodically based on the last update time
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const timeSinceLastUpdate = currentTime - lastUpdateTime;
//       setIsEspConnected(timeSinceLastUpdate < disconnectionTimeout);
//     }, 2000); // Check every 2 seconds
//     return () => clearInterval(interval);
//   }, [lastUpdateTime]);

//   // Make sure to return the children within the Provider
//   return (
//     <Esp32ConnectionContext.Provider value={{ isEspConnected, lastUpdateTime }}>
//       {children}
//     </Esp32ConnectionContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useEsp32Connection = () => {
//   const context = useContext(Esp32ConnectionContext);
//   if (!context) {
//     throw new Error('useEsp32Connection must be used within an Esp32ConnectionProvider');
//   }
//   return context;
// };

//v3
import React, { createContext, useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { rtdb } from './config/firebase';

// Create the context
const Esp32ConnectionContext = createContext();

// Create a provider component
export const Esp32ConnectionProvider = ({ children }) => {
  const [isEspConnected, setIsEspConnected] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const disconnectionTimeout = 5000; // 5 seconds timeout

  // Listen to Firebase "deviceStatus" to update the last update time
  useEffect(() => {
    const statusRef = ref(rtdb, 'deviceStatus');
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setLastUpdateTime(Date.now());
      }
    });
    return () => unsubscribe();
  }, []);

  // Check connectivity periodically based on the last update time
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastUpdate = currentTime - lastUpdateTime;
      setIsEspConnected(timeSinceLastUpdate < disconnectionTimeout);
    }, 2000); // Check every 2 seconds
    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  // Make sure to return the children within a View component
  return (
    <Esp32ConnectionContext.Provider value={{ isEspConnected, lastUpdateTime }}>
      <View style={{ flex: 1 }}>{children}</View>
    </Esp32ConnectionContext.Provider>
  );
};

// Custom hook to use the context
export const useEsp32Connection = () => {
  const context = useContext(Esp32ConnectionContext);
  if (!context) {
    throw new Error('useEsp32Connection must be used within an Esp32ConnectionProvider');
  }
  return context;
};
