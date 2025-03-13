// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, theme } from '../config/theme';
// import { rtdb } from '../config/firebase';
// import { ref, onValue } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length
//     ? devices[deviceIndex]
//     : null;

//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [showGraph, setShowGraph] = useState(false);
//   const timerRef = useRef(null);

//   const [buttonState, setButtonState] = useState(null);

//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const unsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val());
//       } else {
//         setButtonState(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (isMonitoring) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else {
//       if (timerRef.current) clearInterval(timerRef.current);
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isMonitoring]);

//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     setTimeLeft(60);
//     setIsMonitoring(true);
//   };

//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   const isReady = buttonState === 1;
//   const statusColor = isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isReady ? 'Ready' : 'Not Ready';

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>
//         {device.name}
//       </Text>
//       {device.isConnected ? (
//         <Text style={{ color: theme.colors.safe, marginBottom: 5 }}>
//           Connected
//         </Text>
//       ) : (
//         <Text style={{ color: theme.colors.warning, marginBottom: 5 }}>
//           Disconnected
//         </Text>
//       )}

//       <Text style={{ color: statusColor, marginBottom: 20 }}>
//         Status: {buttonState === null ? 'Loading...' : statusText}
//       </Text>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: theme.colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             width: '58%',
//             alignItems: 'center',
//           }}
//           onPress={handleStartMonitor}
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//             Start Monitor
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => Linking.openURL('https://example.com/setup')}
//           style={{ justifyContent: 'center' }}
//         >
//           <Text
//             style={{
//               color: theme.colors.primary,
//               textDecorationLine: 'underline',
//               fontSize: 16,
//             }}
//           >
//             How to Setup?
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           Time remaining: {minutes}m {seconds}s
//         </Text>
//       </View>

//       {showGraph ? (
//         <>
//           <View
//             style={{
//               width: '100%',
//               height: 200,
//               backgroundColor: theme.colors.itemBg,
//               borderRadius: 8,
//               marginBottom: 20,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Text style={{ color: '#fff' }}>Real-time graph (I vs t)</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => setShowGraph(false)}
//             style={{ alignSelf: 'center' }}
//           >
//             <MaterialCommunityIcons
//               name="chevron-up"
//               size={36}
//               color={theme.colors.text}
//             />
//           </TouchableOpacity>
//         </>
//       ) : (
//         <TouchableOpacity
//           onPress={() => setShowGraph(true)}
//           style={{ alignSelf: 'center' }}
//         >
//           <MaterialCommunityIcons
//             name="chevron-down"
//             size={36}
//             color={theme.colors.text}
//           />
//         </TouchableOpacity>
//       )}
//     </Container>
//   );
// }

// export default DeviceDetailsScreen;

//___________________________
//v2
//___________________________
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, theme } from '../config/theme';
// import { rtdb, saveRecordToFirebase } from '../config/firebase';
// import { ref, onValue } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length
//     ? devices[deviceIndex]
//     : null;

//   const time=10;
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(time);
//   const [showGraph, setShowGraph] = useState(false);
//   const [intensityData, setIntensityData] = useState([]); // Simulated intensity data
//   const timerRef = useRef(null);

//   const [buttonState, setButtonState] = useState(null);

//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const unsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val());
//       } else {
//         setButtonState(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (isMonitoring) {
//       setShowGraph(true); // Show graph when monitoring starts
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             finishMonitoring();
//             return 0;
//           }
//           return prev - 1;
//         });
//         // Simulate intensity data every second
//         setIntensityData((prev) => [...prev, Math.random() * 100]); // Random value 0-100
//       }, 1000);
//     } else {
//       if (timerRef.current) clearInterval(timerRef.current);
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isMonitoring]);

//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     setTimeLeft(time);
//     setIntensityData([]); // Reset data
//     setIsMonitoring(true);
//   };

//   const finishMonitoring = () => {
//     setIsMonitoring(false);
//     setShowGraph(false); // Optionally hide graph after finishing
//     // Determine status based on intensity data (simplified logic)
//     const avgIntensity = intensityData.reduce((a, b) => a + b, 0) / intensityData.length;
//     const status = avgIntensity > 50 ? 'Safe to consume' : 'Might not be safe';
//     const color = avgIntensity > 50 ? '#32CD32' : '#FF4500';

//     // Save to Firebase
//     const newRecord = {
//       location: 'Klang', // Replace with actual location if available
//       date: new Date().toLocaleDateString('en-GB'), // e.g., "27/2/2025"
//       time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), // e.g., "14:30"
//       status,
//       color,
//     };
//     saveRecordToFirebase(newRecord)
//       .then(() => {
//         Alert.alert('Monitoring Complete', 'Data has been saved.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to save data: ' + error.message);
//       });
//   };

//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   const isReady = buttonState === 1;
//   const statusColor = isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isReady ? 'Ready' : 'Not Ready';

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>
//         {device.name}
//       </Text>
//       {device.isConnected ? (
//         <Text style={{ color: theme.colors.safe, marginBottom: 5 }}>
//           Connected
//         </Text>
//       ) : (
//         <Text style={{ color: theme.colors.warning, marginBottom: 5 }}>
//           Disconnected
//         </Text>
//       )}

//       <Text style={{ color: statusColor, marginBottom: 20 }}>
//         Status: {buttonState === null ? 'Loading...' : statusText}
//       </Text>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: theme.colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             width: '58%',
//             alignItems: 'center',
//           }}
//           onPress={handleStartMonitor}
//           disabled={isMonitoring} // Disable button while monitoring
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//             {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => Linking.openURL('https://example.com/setup')}
//           style={{ justifyContent: 'center' }}
//         >
//           <Text
//             style={{
//               color: theme.colors.primary,
//               textDecorationLine: 'underline',
//               fontSize: 16,
//             }}
//           >
//             How to Setup?
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           Time remaining: {minutes}m {seconds}s
//         </Text>
//       </View>

//       {showGraph && (
//         <View
//           style={{
//             width: '100%',
//             height: 200,
//             backgroundColor: theme.colors.itemBg,
//             borderRadius: 8,
//             marginBottom: 20,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Text style={{ color: '#fff' }}>
//             Real-time Intensity: {intensityData[intensityData.length - 1]?.toFixed(2) || 'N/A'}
//           </Text>
//           <Text style={{ color: '#fff' }}>
//             Data Points: {intensityData.length}
//           </Text>
//           {/* Replace with a real graph library like react-native-chart-kit */}
//         </View>
//       )}
//     </Container>
//   );
// }

// export default DeviceDetailsScreen;

//___________________________
//v3
//___________________________
// DeviceDetailsScreen.js
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, theme } from '../config/theme';
// import { rtdb, saveRecordToFirebase } from '../config/firebase';
// import { ref, onValue } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

//   const time = 10;
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(time);
//   const [showGraph, setShowGraph] = useState(false);
//   const [binaryData, setBinaryData] = useState([]); // New state for binary data
//   const timerRef = useRef(null);
//   const [buttonState, setButtonState] = useState(null);

//   // Listen to "buttonState" in Realtime Database
//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const unsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val()); // e.g., 0 or 1
//       } else {
//         setButtonState(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Timer countdown logic
//   useEffect(() => {
//     if (isMonitoring) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isMonitoring]);

//   // Collect binary data and monitor timer completion
//   useEffect(() => {
//     if (isMonitoring) {
//       setBinaryData((prev) => [...prev, Math.random() > 0.5 ? 1 : 0]);
//       if (timeLeft <= 0) {
//         setIsMonitoring(false);
//         finishMonitoring();
//       }
//     }
//   }, [timeLeft, isMonitoring]);

//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     setTimeLeft(time);
//     setBinaryData([]); // Reset binary data
//     setShowGraph(true); // Show graph immediately
//     setIsMonitoring(true);
//   };

//   const finishMonitoring = () => {
//     setShowGraph(false);

//     // Determine status based on binary data
//     const onesCount = binaryData.filter((state) => state === 1).length;
//     const status = onesCount > binaryData.length / 2 ? 'Safe to consume' : 'Might not be safe';
//     const color = onesCount > binaryData.length / 2 ? '#32CD32' : '#FF4500';

//     // Save to Firebase
//     const newRecord = {
//       location: 'Klang',
//       date: new Date().toLocaleDateString('en-GB'),
//       time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
//       status,
//       color,
//       dataset: binaryData, // Send the list of binary numbers
//     };
//     saveRecordToFirebase(newRecord)
//       .then(() => {
//         Alert.alert('Monitoring Complete', 'Data has been saved to Firebase.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to save data: ' + error.message);
//       });
//   };

//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   const isReady = buttonState === 1;
//   const statusColor = isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isReady ? 'Ready' : 'Not Ready';

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>{device.name}</Text>
//       {device.isConnected ? (
//         <Text style={{ color: theme.colors.safe, marginBottom: 5 }}>Connected</Text>
//       ) : (
//         <Text style={{ color: theme.colors.warning, marginBottom: 5 }}>Disconnected</Text>
//       )}

//       <Text style={{ color: statusColor, marginBottom: 20 }}>
//         Status: {buttonState === null ? 'Loading...' : statusText}
//       </Text>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: theme.colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             width: '58%',
//             alignItems: 'center',
//           }}
//           onPress={handleStartMonitor}
//           disabled={isMonitoring}
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//             {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => Linking.openURL('https://example.com/setup')}
//           style={{ justifyContent: 'center' }}
//         >
//           <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline', fontSize: 16 }}>
//             How to Setup?
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           Time remaining: {minutes}m {seconds}s
//         </Text>
//       </View>

//       {showGraph && (
//         <>
//           <View
//             style={{
//               width: '100%',
//               height: 200,
//               backgroundColor: theme.colors.itemBg,
//               borderRadius: 8,
//               marginBottom: 20,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Text style={{ color: '#fff' }}>
//               Current State: {binaryData[binaryData.length - 1] ?? 'N/A'}
//             </Text>
//             <Text style={{ color: '#fff' }}>Data Points: {binaryData.length}</Text>
//           </View>
//           <TouchableOpacity onPress={() => setShowGraph(false)} style={{ alignSelf: 'center' }}>
//             <MaterialCommunityIcons name="chevron-up" size={36} color={theme.colors.text} />
//           </TouchableOpacity>
//         </>
//       )}
//     </Container>
//   );
// }

// export default DeviceDetailsScreen;


//v4
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking, Dimensions } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LineChart } from 'react-native-chart-kit';
// import { Container, theme } from '../config/theme';
// import { rtdb, saveRecordToFirebase } from '../config/firebase';
// import { ref, onValue } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

//   const time = 10;
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(time);
//   const [showGraph, setShowGraph] = useState(false);
//   const [binaryData, setBinaryData] = useState([]);
//   const timerRef = useRef(null);
//   const [buttonState, setButtonState] = useState(null);
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [deviceStatus, setDeviceStatus] = useState(null);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);

//   const disconnectionTimeout = 3000; // 5 seconds timeout for testing (adjust as needed)

//   // Listen to Firebase for buttonState and deviceStatus
//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const statusRef = ref(rtdb, 'deviceStatus');

//     const buttonUnsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         // console.log("ButtonState received: " + snapshot.val());
//         setButtonState(snapshot.val());
//       } 
//       // else {
//       //   console.log("No buttonState data");
//       // }
//     });
//     const statusUnsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const newStatus = snapshot.val();
//         if(newStatus != deviceStatus){
//           // console.log("DeviceStatus received: " + newStatus);
//           setDeviceStatus(newStatus);
//           // console.log(newStatus); 
//           setLastUpdateTime(Date.now()); // Update time in milliseconds
//         // console.log(lastUpdateTime);
//         }
//       } 
//       // else {
//         // console.log("No deviceStatus data");
//       // }
//     });

//     return () => {
//       buttonUnsubscribe();
//       statusUnsubscribe();
//     };
//   }, []);

//   // Check ESP32 connectivity based on last update time
//   useEffect(() => {
//     const checkConnectivity = setInterval(() => {
//       const currentTime = Date.now();
//       const timeSinceLastUpdate = currentTime - lastUpdateTime;
//       // console.log(timeSinceLastUpdate);
//       // console.log(`Current Time: ${currentTime}, Last Update: ${lastUpdateTime}, Time Since: ${timeSinceLastUpdate}ms`);
//       if (timeSinceLastUpdate < disconnectionTimeout) {
//         setIsEspConnected(true);
//         // console.log(timeSinceLastUpdate);
//         // console.log("ESP32 is Disconnected");
//       } else {
//         setIsEspConnected(false);
//         // console.log(timeSinceLastUpdate);
//         // console.log("ESP32 is Connected");
//       }
//     }, 2000); // Check every 2 seconds

//     return () => clearInterval(checkConnectivity);
//   }, [lastUpdateTime]);

//   // Timer countdown logic
//   useEffect(() => {
//     if (isMonitoring) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isMonitoring]);

//   // Collect binary data and monitor timer completion
//   useEffect(() => {
//     if (isMonitoring) {
//       setBinaryData((prev) => [...prev, Math.random() > 0.5 ? 1 : 0]);
//       if (timeLeft <= 0) {
//         setIsMonitoring(false);
//         finishMonitoring();
//       }
//     }
//   }, [timeLeft, isMonitoring]);

//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     if (!isEspConnected) {
//       Alert.alert('ESP32 Disconnected', 'The ESP32 is not connected. Please check its WiFi connection.');
//       return;
//     }
//     setTimeLeft(time);
//     setBinaryData([]);
//     setShowGraph(true);
//     setIsMonitoring(true);
//   };

//   const finishMonitoring = () => {
//     setShowGraph(false);
//     const onesCount = binaryData.filter((state) => state === 1).length;
//     const status = onesCount > binaryData.length / 2 ? 'Safe to consume' : 'Might not be safe';
//     const color = onesCount > binaryData.length / 2 ? '#32CD32' : '#FF4500';

//     const newRecord = {
//       location: 'Klang',
//       date: new Date().toLocaleDateString('en-GB'),
//       time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
//       status,
//       color,
//       dataset: binaryData,
//     };
//     saveRecordToFirebase(newRecord)
//       .then(() => {
//         Alert.alert('Monitoring Complete', 'Data has been saved to Firebase.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to save data: ' + error.message);
//       });
//   };

//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   const isReady = buttonState === 1;
//   const statusColor = (isEspConnected && isReady) ? theme.colors.safe : theme.colors.warning;
//   // const statusText = isReady ? 'Ready' : 'Not Ready';
//   const statusText = (isEspConnected && isReady) ? 'Ready' : 'Not Ready';
//   const screenWidth = Dimensions.get('window').width;

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>{device.name}</Text>

//       <Text style={{ color: statusColor, marginBottom: 5 }}>
//         Status: {buttonState === null ? 'Loading...' : statusText}
//       </Text>
//       <Text style={{ color: isEspConnected ? theme.colors.safe : theme.colors.warning, marginBottom: 10 }}>
//         ESP32 Connection: {isEspConnected ? 'Connected' : 'Disconnected'}
//       </Text>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: theme.colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             width: '58%',
//             alignItems: 'center',
//           }}
//           onPress={handleStartMonitor}
//           disabled={isMonitoring}
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//             {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => Linking.openURL('https://example.com/setup')}
//           style={{ justifyContent: 'center' }}
//         >
//           {/* <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline', fontSize: 16 }}>
//             How to Setup?
//           </Text> */}
//         </TouchableOpacity>
//       </View>

//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           Time remaining: {minutes}m {seconds}s
//         </Text>
//       </View>

//       {showGraph && binaryData.length > 0 && (
//         <View style={{ marginBottom: 20 }}>
//           <LineChart
//             data={{
//               labels: binaryData.map((_, index) => (index + 1).toString()),
//               datasets: [{ data: binaryData }],
//             }}
//             width={screenWidth - 40}
//             height={200}
//             chartConfig={{
//               backgroundColor: theme.colors.itemBg,
//               backgroundGradientFrom: theme.colors.itemBg,
//               backgroundGradientTo: theme.colors.itemBg,
//               decimalPlaces: 0,
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' },
//             }}
//             fromZero
//             yAxisInterval={1}
//             yAxisLabel=""
//             yAxisSuffix=""
//             style={{ borderRadius: 8 }}
//           />
//           <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>
//             Current State: {binaryData[binaryData.length - 1] ?? 'N/A'}
//           </Text>
//         </View>
//       )}
//     </Container>
//   );
// }

// export default DeviceDetailsScreen; 

//v5 detectorStatus
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking, Dimensions } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LineChart } from 'react-native-chart-kit';
// import { Container, theme } from '../config/theme';
// import { rtdb, saveRecordToFirebase } from '../config/firebase';
// import { ref, onValue, off } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

//   const time = 10;
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(time);
//   const [showGraph, setShowGraph] = useState(false);
//   const [binaryData, setBinaryData] = useState([]);
//   const timerRef = useRef(null);
//   const [buttonState, setButtonState] = useState(null);
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [deviceStatus, setDeviceStatus] = useState(null);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);
//   const detectorRef = useRef(null);

//   const disconnectionTimeout = 3000;

//   // Listen to Firebase for buttonState and deviceStatus
//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const statusRef = ref(rtdb, 'deviceStatus');

//     const buttonUnsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val());
//       }
//     });
//     const statusUnsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const newStatus = snapshot.val();
//         if (newStatus !== deviceStatus) {
//           setDeviceStatus(newStatus);
//           setLastUpdateTime(Date.now());
//         }
//       }
//     });

//     return () => {
//       buttonUnsubscribe();
//       statusUnsubscribe();
//     };
//   }, []);

//   // Check ESP32 connectivity
//   useEffect(() => {
//     const checkConnectivity = setInterval(() => {
//       const currentTime = Date.now();
//       const timeSinceLastUpdate = currentTime - lastUpdateTime;
//       setIsEspConnected(timeSinceLastUpdate < disconnectionTimeout);
//     }, 2000);

//     return () => clearInterval(checkConnectivity);
//   }, [lastUpdateTime]);

//   // Timer countdown logic
//   useEffect(() => {
//     if (isMonitoring) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isMonitoring]);

//   // Collect data from Firebase detectorStatus when monitoring
//   useEffect(() => {
//     if (isMonitoring) {
//       detectorRef.current = ref(rtdb, 'detectorStatus');
//       const unsubscribe = onValue(detectorRef.current, (snapshot) => {
//         if (snapshot.exists()) {
//           const value = snapshot.val();
//           // Assuming detectorStatus provides a binary value (0 or 1)
//           setBinaryData((prev) => [...prev, value]);
//         }
//       });

//       // Stop monitoring when time runs out
//       if (timeLeft <= 0) {
//         setIsMonitoring(false);
//         off(detectorRef.current); // Remove the listener
//         finishMonitoring();
//       }

//       return () => {
//         unsubscribe();
//       };
//     }
//   }, [isMonitoring, timeLeft]);

//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     if (!isEspConnected) {
//       Alert.alert('ESP32 Disconnected', 'Please check the ESP32 WiFi connection.');
//       return;
//     }
//     setTimeLeft(time);
//     setBinaryData([]);
//     setShowGraph(true);
//     setIsMonitoring(true);
//   };

//   const finishMonitoring = () => {
//     setShowGraph(false);
//     const onesCount = binaryData.filter((state) => state === 1).length;
//     const status = onesCount > binaryData.length / 2 ? 'Safe to consume' : 'Might not be safe';
//     const color = onesCount > binaryData.length / 2 ? '#32CD32' : '#FF4500';

//     const newRecord = {
//       location: 'Klang',
//       date: new Date().toLocaleDateString('en-GB'),
//       time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
//       status,
//       color,
//       dataset: binaryData,
//     };
//     saveRecordToFirebase(newRecord)
//       .then(() => {
//         Alert.alert('Monitoring Complete', 'Data has been saved to Firebase.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to save data: ' + error.message);
//       });
//   };

//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   const isReady = buttonState === 1;
//   const statusColor = isEspConnected && isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isEspConnected && isReady ? 'Ready' : 'Not Ready';
//   const screenWidth = Dimensions.get('window').width;

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>{device.name}</Text>

//       <Text style={{ color: statusColor, marginBottom: 5 }}>
//         Status: {buttonState === null ? 'Loading...' : statusText}
//       </Text>
//       <Text style={{ color: isEspConnected ? theme.colors.safe : theme.colors.warning, marginBottom: 10 }}>
//         ESP32 Connection: {isEspConnected ? 'Connected' : 'Disconnected'}
//       </Text>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: theme.colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             width: '58%',
//             alignItems: 'center',
//           }}
//           onPress={handleStartMonitor}
//           disabled={isMonitoring}
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//             {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => Linking.openURL('https://example.com/setup')}
//           style={{ justifyContent: 'center' }}
//         >
//           {/* <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline', fontSize: 16 }}>
//             How to Setup?
//           </Text> */}
//         </TouchableOpacity>
//       </View>

//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           Time remaining: {minutes}m {seconds}s
//         </Text>
//       </View>

//       {showGraph && binaryData.length > 0 && (
//         <View style={{ marginBottom: 20 }}>
//           <LineChart
//             data={{
//               labels: binaryData.map((_, index) => (index + 1).toString()),
//               datasets: [{ data: binaryData }],
//             }}
//             width={screenWidth - 40}
//             height={200}
//             chartConfig={{
//               backgroundColor: theme.colors.itemBg,
//               backgroundGradientFrom: theme.colors.itemBg,
//               backgroundGradientTo: theme.colors.itemBg,
//               decimalPlaces: 0,
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' },
//             }}
//             fromZero
//             yAxisInterval={1}
//             yAxisLabel=""
//             yAxisSuffix=""
//             style={{ borderRadius: 8 }}
//           />
//           <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>
//             Current State: {binaryData[binaryData.length - 1] ?? 'N/A'}
//           </Text>
//         </View>
//       )}
//     </Container>
//   );
// }

// export default DeviceDetailsScreen;

//v6
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking, Dimensions, SafeAreaView } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LineChart } from 'react-native-chart-kit';
// import { Container, theme } from '../config/theme';
// import { rtdb, saveRecordToFirebase } from '../config/firebase';
// import { ref, onValue, off } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

//   const time = 10; // Total monitoring time in seconds
//   const totalTimeMs = time * 1000; // Total time in milliseconds
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(time);
//   const [showGraph, setShowGraph] = useState(false);
//   const [binaryData, setBinaryData] = useState([]); // Stores objects: [{ value: 0/1, timestamp: ms }, ...]
//   const binaryDataRef = useRef([]); // Ref to track latest binaryData
//   const [startTime, setStartTime] = useState(null); // Track start time of monitoring
//   const timerRef = useRef(null);
//   const [buttonState, setButtonState] = useState(null);
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [deviceStatus, setDeviceStatus] = useState(null);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);
//   const detectorRef = useRef(null);

//   const disconnectionTimeout = 3000;

//   // Listen to Firebase for buttonState and deviceStatus
//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const statusRef = ref(rtdb, 'deviceStatus');

//     const buttonUnsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val());
//       }
//     });
//     const statusUnsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const newStatus = snapshot.val();
//         if (newStatus !== deviceStatus) {
//           setDeviceStatus(newStatus);
//           setLastUpdateTime(Date.now());
//         }
//       }
//     });

//     return () => {
//       buttonUnsubscribe();
//       statusUnsubscribe();
//     };
//   }, []);

//   // Check ESP32 connectivity
//   useEffect(() => {
//     const checkConnectivity = setInterval(() => {
//       const currentTime = Date.now();
//       const timeSinceLastUpdate = currentTime - lastUpdateTime;
//       setIsEspConnected(timeSinceLastUpdate < disconnectionTimeout);
//     }, 2000);

//     return () => clearInterval(checkConnectivity);
//   }, [lastUpdateTime]);

//   // Timer countdown logic
//   useEffect(() => {
//     if (isMonitoring) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isMonitoring]);

//   // Finish monitoring when timeLeft reaches 0
//   useEffect(() => {
//     if (timeLeft <= 0 && isMonitoring) {
//       setIsMonitoring(false);
//       finishMonitoring();
//     }
//   }, [timeLeft, isMonitoring]);

//   // Collect data from Firebase detectorStatus when monitoring
//   useEffect(() => {
//     let unsubscribe;
//     if (isMonitoring && startTime) {
//       detectorRef.current = ref(rtdb, 'detectorStatus');
//       unsubscribe = onValue(detectorRef.current, (snapshot) => {
//         if (snapshot.exists()) {
//           const value = snapshot.val();
//           const currentTime = Date.now();
//           const timestamp = currentTime - startTime; // Calculate timestamp relative to startTime
//           // Ensure timestamp doesn't exceed totalTimeMs
//           if (timestamp <= totalTimeMs) {
//             setBinaryData((prev) => {
//               const newData = [...prev, { value, timestamp }];
//               binaryDataRef.current = newData; // Update ref with latest data
//               // console.log('New binaryData entry:', { value, timestamp }); // Debugging
//               return newData;
//             });
//           }
//         }
//       });
//     }

//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//       if (detectorRef.current) {
//         off(detectorRef.current);
//       }
//     };
//   }, [isMonitoring, startTime]);

//   // Update binaryDataRef whenever binaryData changes
//   useEffect(() => {
//     binaryDataRef.current = binaryData;
//   }, [binaryData]);

//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     if (!isEspConnected) {
//       Alert.alert('ESP32 Disconnected', 'Please check the ESP32 WiFi connection.');
//       return;
//     }
//     setTimeLeft(time);
//     setBinaryData([]); // Reset data for new monitoring session
//     binaryDataRef.current = []; // Reset ref
//     setStartTime(Date.now()); // Set start time immediately
//     setShowGraph(true); // Show graph when monitoring starts
//     setIsMonitoring(true);
//   };

//   const finishMonitoring = () => {
//     const dataToSave = binaryDataRef.current; // Use ref to get latest data
//     // console.log('binaryData before saving to Firebase:', dataToSave); // Debugging
//     if (dataToSave.length === 0) {
//       Alert.alert('No Data', 'No data was collected during monitoring.');
//       return;
//     }

//     const onesCount = dataToSave.filter((entry) => entry.value === 1).length;
//     const status = onesCount > dataToSave.length / 2 ? 'Safe to consume' : 'Might not be safe';
//     const color = onesCount > dataToSave.length / 2 ? '#32CD32' : '#FF4500';

//     const newRecord = {
//       location: 'Klang',
//       date: new Date().toLocaleDateString('en-GB'),
//       time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
//       status,
//       color,
//       dataset: dataToSave, // Save the dataset with values and timestamps
//     };

//     saveRecordToFirebase(newRecord)
//       .then(() => {
//         Alert.alert('Monitoring Complete', 'Data has been saved to Firebase.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to save data: ' + error.message);
//       });
//   };

//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   const isReady = buttonState === 1;
//   const statusColor = isEspConnected && isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isEspConnected && isReady ? 'Ready' : 'Not Ready';
//   const screenWidth = Dimensions.get('window').width;

//   // Generate time labels in milliseconds for the X-axis using actual timestamps
//   const getTimeLabels = () => {
//     if (!binaryData.length) return [];
//     return binaryData.map((entry) => `${Math.floor(entry.timestamp)}`); // Use the actual timestamp from the data
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Container style={{ paddingHorizontal: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>{device.name}</Text>

//         <Text style={{ color: statusColor, marginBottom: 5 }}>
//           Status: {buttonState === null ? 'Loading...' : statusText}
//         </Text>
//         <Text style={{ color: isEspConnected ? theme.colors.safe : theme.colors.warning, marginBottom: 10 }}>
//           ESP32 Connection: {isEspConnected ? 'Connected' : 'Disconnected'}
//         </Text>

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: theme.colors.primary,
//               padding: 12,
//               borderRadius: 8,
//               width: '58%',
//               alignItems: 'center',
//             }}
//             onPress={handleStartMonitor}
//             disabled={isMonitoring}
//           >
//             <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//               {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => Linking.openURL('https://example.com/setup')}
//             style={{ justifyContent: 'center' }}
//           >
//             {/* <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline', fontSize: 16 }}>
//               How to Setup?
//             </Text> */}
//           </TouchableOpacity>
//         </View>

//         <View style={{ marginBottom: 20 }}>
//           <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//             Time remaining: {minutes}m {seconds}s
//           </Text>
//         </View>

//         {showGraph && binaryData.length > 0 && (
//           <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
//             {/* Y-axis label "Intensity" (rotated vertically) */}
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: 14,
//                 fontWeight: 'bold',
//                 transform: [{ rotate: '-90deg' }],
//                 width: 80,
//                 position: 'absolute',
//                 left: -40,
//                 top: 80,
//                 textAlign: 'center',
//               }}
//             >
//               Intensity
//             </Text>

//             <View style={{ flex: 1, marginLeft: 20 }}>
//               <LineChart
//                 data={{
//                   labels: getTimeLabels(), // Use actual timestamps from the data
//                   datasets: [
//                     {
//                       data: binaryData.map((entry) => entry.value), // Extract values for the chart
//                       color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange line
//                       strokeWidth: 2,
//                     },
//                   ],
//                 }}
//                 width={screenWidth - 80}
//                 height={200}
//                 chartConfig={{
//                   backgroundColor: theme.colors.itemBg,
//                   backgroundGradientFrom: theme.colors.itemBg,
//                   backgroundGradientTo: theme.colors.itemBg,
//                   fillShadowGradient: 'rgba(255, 165, 0, 0.3)', // Orange fill with opacity
//                   fillShadowGradientOpacity: 1, // Full opacity for the fill
//                   decimalPlaces: 0,
//                   color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange line
//                   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                   propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa500' }, // Orange dots
//                   propsForBackgroundLines: {
//                     stroke: '#00CED1', // Cyan grid lines
//                     strokeDasharray: '', // Solid lines
//                   },
//                 }}
//                 fromZero
//                 yAxisInterval={1} // Ensures only 0 and 1 are shown
//                 yAxisLabel=""
//                 yAxisSuffix=""
//                 yLabels={[0, 1]} // Explicitly set Y-axis to show only 0 and 1
//                 style={{ borderRadius: 8 }}
//                 verticalLabelRotation={0} // Keep labels horizontal
//                 withShadow={false} // Disable default shadow
//                 withInnerLines={true} // Ensure grid lines are visible
//               />
//               {/* Add the X-axis title "t(ms)" centered below the graph */}
//               <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
//                 <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
//                   t(ms)
//                 </Text>
//               </View>
//               <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>
//                 Current State: {binaryData[binaryData.length - 1]?.value ?? 'N/A'}
//               </Text>
//             </View>
//           </View>
//         )}
//       </Container>
//     </SafeAreaView>
//   );
// }

// export default DeviceDetailsScreen;

//v7
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Alert, Linking, Dimensions, SafeAreaView } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LineChart } from 'react-native-chart-kit';
// import { Container, theme } from '../config/theme';
// import { rtdb, saveRecordToFirebase } from '../config/firebase';
// import { ref, onValue, off } from 'firebase/database';

// function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
//   const { deviceIndex } = route.params || {};
//   const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

//   const time = 10; // monitoring time in seconds
//   const totalTimeMs = time * 1000; 
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(time);
//   const [showGraph, setShowGraph] = useState(false);
//   const [binaryData, setBinaryData] = useState([]); // [{ value: 0 or 1, timestamp: ms }, ...]
//   const binaryDataRef = useRef([]); 
//   const [startTime, setStartTime] = useState(null); 
//   const timerRef = useRef(null);

//   // Firebase states
//   const [buttonState, setButtonState] = useState(null);
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [deviceStatus, setDeviceStatus] = useState(null);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);
//   const detectorRef = useRef(null);

//   const disconnectionTimeout = 3000; // ms

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 1. Listen to Firebase for buttonState and deviceStatus
//   // ─────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const buttonRef = ref(rtdb, 'buttonState');
//     const statusRef = ref(rtdb, 'deviceStatus');

//     const buttonUnsubscribe = onValue(buttonRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setButtonState(snapshot.val());
//       }
//     });

//     const statusUnsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const newStatus = snapshot.val();
//         if (newStatus !== deviceStatus) {
//           setDeviceStatus(newStatus);
//           setLastUpdateTime(Date.now());
//         }
//       }
//     });

//     return () => {
//       buttonUnsubscribe();
//       statusUnsubscribe();
//     };
//   }, [deviceStatus]);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 2. Check ESP32 connectivity by comparing lastUpdateTime with current time
//   // ─────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const checkConnectivity = setInterval(() => {
//       const currentTime = Date.now();
//       const timeSinceLastUpdate = currentTime - lastUpdateTime;
//       setIsEspConnected(timeSinceLastUpdate < disconnectionTimeout);
//     }, 2000);

//     return () => clearInterval(checkConnectivity);
//   }, [lastUpdateTime]);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 3. Timer countdown logic
//   // ─────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (isMonitoring) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [isMonitoring]);

//   // If time runs out, stop monitoring
//   useEffect(() => {
//     if (timeLeft <= 0 && isMonitoring) {
//       setIsMonitoring(false);
//       finishMonitoring();
//     }
//   }, [timeLeft, isMonitoring]);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 4. Collect data from Firebase detectorStatus while monitoring
//   // ─────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     let unsubscribe;
//     if (isMonitoring && startTime) {
//       detectorRef.current = ref(rtdb, 'detectorStatus');
//       unsubscribe = onValue(detectorRef.current, (snapshot) => {
//         if (snapshot.exists()) {
//           const value = snapshot.val(); // 0 or 1 from the sensor
//           const currentTime = Date.now();
//           const timestamp = currentTime - startTime; // ms since we started

//           // Only store data if within totalTimeMs
//           if (timestamp <= totalTimeMs) {
//             setBinaryData((prev) => {
//               const newData = [...prev, { value, timestamp }];
//               binaryDataRef.current = newData;
//               return newData;
//             });
//           }
//         }
//       });
//     }

//     return () => {
//       if (unsubscribe) unsubscribe();
//       if (detectorRef.current) off(detectorRef.current);
//     };
//   }, [isMonitoring, startTime]);

//   // Keep the ref updated with latest array
//   useEffect(() => {
//     binaryDataRef.current = binaryData;
//   }, [binaryData]);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 5. Start monitoring
//   // ─────────────────────────────────────────────────────────────────────────────
//   const handleStartMonitor = () => {
//     if (!device?.isConnected) {
//       Alert.alert('Device not connected', 'Please connect this device first.');
//       return;
//     }
//     if (!isEspConnected) {
//       Alert.alert('ESP32 Disconnected', 'Please check the ESP32 WiFi connection.');
//       return;
//     }

//     // Reset
//     setTimeLeft(time);
//     setBinaryData([]);
//     binaryDataRef.current = [];

//     setStartTime(Date.now()); 
//     setShowGraph(true);
//     setIsMonitoring(true);
//   };

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 6. Finish monitoring and save to Firebase
//   // ─────────────────────────────────────────────────────────────────────────────
//   const finishMonitoring = () => {
//     const dataToSave = binaryDataRef.current; 
//     if (dataToSave.length === 0) {
//       Alert.alert('No Data', 'No data was collected during monitoring.');
//       return;
//     }

//     // Basic logic: if more than half are "1", we say "Safe to consume"
//     const onesCount = dataToSave.filter((entry) => entry.value === 1).length;
//     const status = onesCount > dataToSave.length / 2 ? 'Safe to consume' : 'Might not be safe';
//     const color = onesCount > dataToSave.length / 2 ? '#32CD32' : '#FF4500';

//     const newRecord = {
//       location: 'Klang',
//       date: new Date().toLocaleDateString('en-GB'), // e.g. "01/03/2025"
//       time: new Date().toLocaleTimeString('en-US', {
//         hour12: false,
//         hour: '2-digit',
//         minute: '2-digit',
//       }), // e.g. "14:30"
//       status,
//       color,
//       dataset: dataToSave, 
//     };

//     saveRecordToFirebase(newRecord)
//       .then(() => {
//         Alert.alert('Monitoring Complete', 'Data has been saved to Firebase.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to save data: ' + error.message);
//       });

//     setShowGraph(false);
//   };

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 7. Early return if no device
//   // ─────────────────────────────────────────────────────────────────────────────
//   if (!device) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Device not found!</Text>
//       </Container>
//     );
//   }

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 8. Display states
//   // ─────────────────────────────────────────────────────────────────────────────
//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   const isReady = buttonState === 1;
//   const statusColor = isEspConnected && isReady ? theme.colors.safe : theme.colors.warning;
//   const statusText = isEspConnected && isReady ? 'Ready' : 'Not Ready';
//   const screenWidth = Dimensions.get('window').width;

//   // Generate the labels for the X-axis
//   const getTimeLabels = () => {
//     if (!binaryData.length) return [];
//     return binaryData.map((entry) => `${Math.floor(entry.timestamp)}`); 
//   };

//   // Decide how often to skip X-axis labels if data is large
//   const skipInterval = binaryData.length > 20 ? 5 : 1;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Container style={{ paddingHorizontal: 20 }}>
//         <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>
//           {device.name}
//         </Text>

//         <Text style={{ color: statusColor, marginBottom: 5 }}>
//           Status: {buttonState === null ? 'Loading...' : statusText}
//         </Text>
//         <Text style={{ color: isEspConnected ? theme.colors.safe : theme.colors.warning, marginBottom: 10 }}>
//           ESP32 Connection: {isEspConnected ? 'Connected' : 'Disconnected'}
//         </Text>

//         {/* Start Monitor Button */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: theme.colors.primary,
//               padding: 12,
//               borderRadius: 8,
//               width: '58%',
//               alignItems: 'center',
//             }}
//             onPress={handleStartMonitor}
//             disabled={isMonitoring}
//           >
//             <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//               {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => Linking.openURL('https://example.com/setup')}
//             style={{ justifyContent: 'center' }}
//           >
//             {/* 
//               <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline', fontSize: 16 }}>
//                 How to Setup?
//               </Text> 
//             */}
//           </TouchableOpacity>
//         </View>

//         {/* Timer */}
//         <View style={{ marginBottom: 20 }}>
//           <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//             Time remaining: {minutes}m {seconds}s
//           </Text>
//         </View>

//         {/* Show the graph only if user wants and we have data */}
//         {showGraph && binaryData.length > 0 && (
//           <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
//             {/* Y-axis label "Intensity" (rotated) */}
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: 14,
//                 fontWeight: 'bold',
//                 transform: [{ rotate: '-90deg' }],
//                 width: 80,
//                 position: 'absolute',
//                 left: -40,
//                 top: 80,
//                 textAlign: 'center',
//               }}
//             >
//               Intensity
//             </Text>

//             <View style={{ flex: 1, marginLeft: 20 }}>
//               <LineChart
//                 data={{
//                   labels: getTimeLabels(),
//                   datasets: [
//                     {
//                       data: binaryData.map((entry) => entry.value),
//                       color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
//                       strokeWidth: 2,
//                     },
//                   ],
//                 }}
//                 width={screenWidth - 80}
//                 height={200}
//                 chartConfig={{
//                   backgroundColor: theme.colors.itemBg,
//                   backgroundGradientFrom: theme.colors.itemBg,
//                   backgroundGradientTo: theme.colors.itemBg,
//                   decimalPlaces: 0,

//                   // Only label 0 or 1 on the Y-axis
//                   formatYLabel: (value) => {
//                     const val = Math.round(value);
//                     if (val === 0) return '0';
//                     if (val === 1) return '1';
//                     return ''; // Hide all else
//                   },

//                   // Skip some X labels if data is large
//                   formatXLabel: (label, index) => {
//                     if (index % skipInterval === 0) return label;
//                     return '';
//                   },

//                   color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // line color
//                   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                   propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa500' },
//                   propsForBackgroundLines: {
//                     stroke: '#00CED1',
//                     strokeDasharray: '',
//                   },
//                 }}
//                 fromZero
//                 segments={1} // minimal lines on the Y-axis
//                 yAxisInterval={1}
//                 style={{ borderRadius: 8 }}
//                 verticalLabelRotation={0}
//                 withShadow={false}
//                 withInnerLines
//               />
//               {/* X-axis title */}
//               <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
//                 <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>t(ms)</Text>
//               </View>
//               <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>
//                 Current State: {binaryData[binaryData.length - 1]?.value ?? 'N/A'}
//               </Text>
//             </View>
//           </View>
//         )}
//       </Container>
//     </SafeAreaView>
//   );
// }

// export default DeviceDetailsScreen;

//________________________________________________________________--
//v8 global connection
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, Dimensions, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { Container, theme } from '../config/theme';
import { rtdb, saveRecordToFirebase } from '../config/firebase';
import { ref, onValue, off } from 'firebase/database';
import { useEsp32Connection } from '../Esp32ConnectionContext'; // Adjust the path as needed

function DeviceDetailsScreen({ route, navigation, devices, setDevices }) {
  const { deviceIndex } = route.params || {};
  const device = deviceIndex >= 0 && deviceIndex < devices.length ? devices[deviceIndex] : null;

  const time = 10; // monitoring time in seconds
  const totalTimeMs = time * 1000;
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const [showGraph, setShowGraph] = useState(false);
  const [binaryData, setBinaryData] = useState([]); // [{ value: 0 or 1, timestamp: ms }, ...]
  const binaryDataRef = useRef([]);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  // Firebase states (only for buttonState, since ESP32 connection is global)
  const [buttonState, setButtonState] = useState(null);
  const detectorRef = useRef(null);

  // Get ESP32 connection status from global context
  const { isEspConnected } = useEsp32Connection();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Listen to Firebase for buttonState only (ESP32 connection is handled globally)
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const buttonRef = ref(rtdb, 'buttonState');

    const buttonUnsubscribe = onValue(buttonRef, (snapshot) => {
      if (snapshot.exists()) {
        setButtonState(snapshot.val());
      }
    });

    return () => {
      buttonUnsubscribe();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Timer countdown logic
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMonitoring) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isMonitoring]);

  // If time runs out, stop monitoring
  useEffect(() => {
    if (timeLeft <= 0 && isMonitoring) {
      setIsMonitoring(false);
      finishMonitoring();
    }
  }, [timeLeft, isMonitoring]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Collect data from Firebase detectorStatus while monitoring
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let unsubscribe;
    if (isMonitoring && startTime) {
      detectorRef.current = ref(rtdb, 'detectorStatus');
      unsubscribe = onValue(detectorRef.current, (snapshot) => {
        if (snapshot.exists()) {
          const value = snapshot.val(); // 0 or 1 from the sensor
          const currentTime = Date.now();
          const timestamp = currentTime - startTime; // ms since we started

          // Only store data if within totalTimeMs
          if (timestamp <= totalTimeMs) {
            setBinaryData((prev) => {
              const newData = [...prev, { value, timestamp }];
              binaryDataRef.current = newData;
              return newData;
            });
          }
        }
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
      if (detectorRef.current) off(detectorRef.current);
    };
  }, [isMonitoring, startTime]);

  // Keep the ref updated with latest array
  useEffect(() => {
    binaryDataRef.current = binaryData;
  }, [binaryData]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Start monitoring
  // ─────────────────────────────────────────────────────────────────────────────
  const handleStartMonitor = () => {
    // if (!device?.isConnected) {
    //   Alert.alert('Device not connected', 'Please connect this device first.');
    //   return;
    // }
    if (!isEspConnected) {
      Alert.alert('ESP32 Disconnected', 'Please check the ESP32 WiFi connection.');
      return;
    }
    if (!isReady) {
      Alert.alert('Cap not close', 'Please close the cap properly.');
      return;
    }
    // Reset
    setTimeLeft(time);
    setBinaryData([]);
    binaryDataRef.current = [];

    setStartTime(Date.now());
    setShowGraph(true);
    setIsMonitoring(true);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Finish monitoring and save to Firebase
  // ─────────────────────────────────────────────────────────────────────────────
  const finishMonitoring = () => {
    const dataToSave = binaryDataRef.current;
    if (dataToSave.length === 0) {
      Alert.alert('No Data', 'No data was collected during monitoring.');
      return;
    }

    // Basic logic: if more than half are "1", we say "Safe to consume"
    const onesCount = dataToSave.filter((entry) => entry.value === 1).length;
    const status = onesCount > dataToSave.length / 2 ? 'Safe to consume' : 'Might not be safe';
    const color = onesCount > dataToSave.length / 2 ? '#32CD32' : '#FF4500';

    const newRecord = {
      location: 'Klang',
      date: new Date().toLocaleDateString('en-GB'), // e.g. "01/03/2025"
      time: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }), // e.g. "14:30"
      status,
      color,
      dataset: dataToSave,
    };

    saveRecordToFirebase(newRecord)
      .then(() => {
        Alert.alert('Monitoring Complete', 'Data has been saved to Firebase.');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to save data: ' + error.message);
      });

    // setShowGraph(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. Early return if no device
  // ─────────────────────────────────────────────────────────────────────────────
  if (!device) {
    return (
      <Container>
        <Text style={{ color: theme.colors.text }}>Device not found!</Text>
      </Container>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. Display states
  // ─────────────────────────────────────────────────────────────────────────────
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isReady = buttonState === 1;
  const statusColor = isEspConnected && isReady ? theme.colors.safe : theme.colors.warning;
  const statusText = isEspConnected && isReady ? 'Ready' : 'Not Ready';
  const screenWidth = Dimensions.get('window').width;

  // Generate the labels for the X-axis
  const getTimeLabels = () => {
    if (!binaryData.length) return [];
    return binaryData.map((entry) => `${Math.floor(entry.timestamp)}`);
  };

  // Decide how often to skip X-axis labels if data is large
  const skipInterval = binaryData.length > 20 ? 5 : 1;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 8 }}>
          {device.name}
        </Text>

        <Text style={{ color: statusColor, marginBottom: 5 }}>
          Status: {buttonState === null ? 'Loading...' : statusText}
        </Text>
        <Text style={{ color: isEspConnected ? theme.colors.safe : theme.colors.warning, marginBottom: 10 }}>
          ESP32 Connection: {isEspConnected ? 'Connected' : 'Disconnected'}
        </Text>

        {/* Start Monitor Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              padding: 12,
              borderRadius: 8,
              width: '58%',
              alignItems: 'center',
            }}
            onPress={handleStartMonitor}
            disabled={isMonitoring}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              {isMonitoring ? 'Monitoring...' : 'Start Monitor'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://example.com/setup')}
            style={{ justifyContent: 'center' }}
          >
            {/* 
              <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline', fontSize: 16 }}>
                How to Setup?
              </Text> 
            */}
          </TouchableOpacity>
        </View>

        {/* Timer */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18 }}>
            Time remaining: {minutes}m {seconds}s
          </Text>
        </View>

        {/* Show the graph only if user wants and we have data */}
        {showGraph && binaryData.length > 0 && (
          <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
            {/* Y-axis label "Intensity" (rotated) */}
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                transform: [{ rotate: '-90deg' }],
                width: 80,
                position: 'absolute',
                left: -40,
                top: 80,
                textAlign: 'center',
              }}
            >
              Intensity
            </Text>

            <View style={{ flex: 1, marginLeft: 20 }}>
              <LineChart
                data={{
                  labels: getTimeLabels(),
                  datasets: [
                    {
                      strokeWidth: 4,
                      data: binaryData.map((entry) => entry.value),
                      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={screenWidth - 80}
                height={200}
                chartConfig={{
                  backgroundColor: theme.colors.itemBg,
                  backgroundGradientFrom: theme.colors.itemBg,
                  backgroundGradientTo: theme.colors.itemBg,
                  decimalPlaces: 0,

                  // Only label 0 or 1 on the Y-axis
                  formatYLabel: (value) => {
                    const val = Math.round(value);
                    if (val === 0) return '0';
                    if (val === 1) return '1';
                    return ''; // Hide all else
                  },

                  // Skip some X labels if data is large
                  formatXLabel: (label, index) => {
                    if (index % skipInterval === 0) return label;
                    return '';
                  },

                  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // line color
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: { r: '2', strokeWidth: '2', stroke: '#ffa500' },
                  propsForBackgroundLines: {
                    stroke: '#00CED1',
                    strokeDasharray: '',
                  },
                }}
                fromZero
                segments={1} // minimal lines on the Y-axis
                yAxisInterval={1}
                style={{ borderRadius: 8 }}
                verticalLabelRotation={0}
                withShadow={false}
                withInnerLines
              />
              {/* X-axis title */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>t(ms)</Text>
              </View>
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>
                Current State: {binaryData[binaryData.length - 1]?.value ?? 'N/A'}
              </Text>
            </View>
          </View>
        )}
      </Container>
    </SafeAreaView>
  );
}

export default DeviceDetailsScreen;