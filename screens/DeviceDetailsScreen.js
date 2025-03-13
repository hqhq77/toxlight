// // screens/DeviceDetailsScreen.js

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';

// // 1. Import Realtime Database references from firebase/database
// import { ref, onValue } from 'firebase/database';

// // 2. Import the db from your init file
// import { db } from '../firebase';

// // ... your other imports ...

// export default function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   // example device code...
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

//   // We'll store the "buttonState" from RTDB in local state
//   const [buttonState, setButtonState] = useState(null);

//   useEffect(() => {
//     // Create a reference to "buttonState" in the root of your DB
//     const buttonRef = ref(rtdb, 'buttonState');
//     onValue(buttonRef, (snapshot) => {
//     setButtonState(snapshot.val()); 
//     });


//     // Listen for changes
//     const unsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val());
//       } else {
//         setButtonState(null);
//       }
//     });

//     // Clean up the subscription
//     return () => unsubscribe();
//   }, []);

//   // Determine "Ready" or "Not Ready" based on buttonState
//   const isReady = buttonState === 1;
//   const statusColor = isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isReady ? 'Ready' : 'Not Ready';

//   if (!device) {
//     return (
//       <View>
//         <Text>Device not found!</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       {/* Example usage */}
//       <Text style={{ fontSize: 24 }}> {device.name} </Text>

//       {/* Show the RTDB data */}
//       <Text style={{ color: statusColor, marginBottom: 20 }}>
//     Status: {buttonState === null ? 'Loading...' : statusText}
//     </Text>


//       {/* The rest of your existing layout... */}
//     </View>
//   );
// }
