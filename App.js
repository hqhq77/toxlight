// // import React, { useState } from 'react';
// // import { ThemeProvider } from 'styled-components/native';
// // import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import HomeScreen from './components/HomeScreen';
// // import AllRecordsScreen from './components/AllRecordsScreen';
// // import RecordDetailsScreen from './components/RecordDetailsScreen';
// // import DeviceDetailsScreen from './components/DeviceDetailsScreen';
// // import { theme } from './config/theme';

// // const Stack = createStackNavigator();

// // const initialRecords = [
// //   { location: 'Klang',     date: '25/2/2025',  time: '20:37', status: 'Safe to consume',   color: '#32CD32' },
// //   { location: 'Klang',     date: '26/2/2025',  time: '09:15', status: 'Might not be safe', color: '#FF4500' },
// // ];

// // const initialDevices = [
// //   { name: "Julia's ToxLIGHT", isConnected: true },
// //   { name: "Bob's ToxLIGHT",   isConnected: false },
// //   { name: "Alice's ToxLIGHT", isConnected: true },
// // ];

// // export default function App() {
// //   const [records, setRecords] = useState(initialRecords);
// //   const [devices, setDevices] = useState(initialDevices);

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <NavigationContainer theme={DarkTheme}>
// //         <Stack.Navigator>
// //           <Stack.Screen
// //             name="Home"
// //             options={{ headerShown: false }}
// //           >
// //             {(props) => (
// //               <HomeScreen
// //                 {...props}
// //                 records={records}
// //                 devices={devices}
// //               />
// //             )}
// //           </Stack.Screen>

// //           <Stack.Screen
// //             name="AllRecords"
// //             options={{ title: 'All Past Records' }}
// //           >
// //             {(props) => (
// //               <AllRecordsScreen
// //                 {...props}
// //                 records={records}
// //                 setRecords={setRecords}
// //               />
// //             )}
// //           </Stack.Screen>

// //           <Stack.Screen
// //             name="RecordDetails"
// //             options={{ title: 'Record Details' }}
// //           >
// //             {(props) => (
// //               <RecordDetailsScreen
// //                 {...props}
// //                 records={records}
// //                 setRecords={setRecords}
// //               />
// //             )}
// //           </Stack.Screen>

// //           <Stack.Screen
// //             name="DeviceDetails"
// //             options={{ title: 'Device Details' }}
// //           >
// //             {(props) => (
// //               <DeviceDetailsScreen
// //                 {...props}
// //                 devices={devices}
// //                 setDevices={setDevices}
// //               />
// //             )}
// //           </Stack.Screen>
// //         </Stack.Navigator>
// //       </NavigationContainer>
// //     </ThemeProvider>
// //   );
// // }

//v2
// import React, { useState, useEffect } from 'react';
// import { ThemeProvider } from 'styled-components/native';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './components/HomeScreen';
// import AllRecordsScreen from './components/AllRecordsScreen';
// import RecordDetailsScreen from './components/RecordDetailsScreen';
// import DeviceDetailsScreen from './components/DeviceDetailsScreen';
// import { theme } from './config/theme';
// import { rtdb } from './config/firebase';
// import { ref, onValue } from 'firebase/database';

// const Stack = createStackNavigator();

// const initialDevices = [
//   { name: "Julia's ToxLIGHT", isConnected: true },
//   { name: "Bob's ToxLIGHT", isConnected: false },
//   { name: "Alice's ToxLIGHT", isConnected: true },
// ];

// export default function App() {
//   const [records, setRecords] = useState([]);
//   const [devices, setDevices] = useState(initialDevices);

//   useEffect(() => {
//     const recordsRef = ref(rtdb, 'records');
//     const unsubscribe = onValue(recordsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const recordsArray = Object.entries(data).map(([key, value]) => ({
//           key,
//           ...value,
//         }));
//         setRecords(recordsArray);
//       } else {
//         setRecords([]);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <NavigationContainer theme={DarkTheme}>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="Home"
//             options={{ headerShown: false }}
//           >
//             {(props) => (
//               <HomeScreen
//                 {...props}
//                 records={records}
//                 devices={devices}
//               />
//             )}
//           </Stack.Screen>

//           <Stack.Screen
//             name="AllRecords"
//             options={{ title: 'All Past Records' }}
//           >
//             {(props) => (
//               <AllRecordsScreen
//                 {...props}
//                 records={records}
//                 setRecords={setRecords}
//               />
//             )}
//           </Stack.Screen>

//           <Stack.Screen
//             name="RecordDetails"
//             options={{ title: 'Record Details' }}
//           >
//             {(props) => (
//               <RecordDetailsScreen
//                 {...props}
//                 records={records}
//                 setRecords={setRecords}
//               />
//             )}
//           </Stack.Screen>

//           <Stack.Screen
//             name="DeviceDetails"
//             options={{ title: 'Device Details' }}
//           >
//             {(props) => (
//               <DeviceDetailsScreen
//                 {...props}
//                 devices={devices}
//                 setDevices={setDevices}
//               />
//             )}
//           </Stack.Screen>
//         </Stack.Navigator>
//       </NavigationContainer>
//     </ThemeProvider>
//   );
// }

//v3
// import React, { useState, useEffect } from 'react';
// import { ThemeProvider } from 'styled-components/native';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './components/HomeScreen';
// import AllRecordsScreen from './components/AllRecordsScreen';
// import RecordDetailsScreen from './components/RecordDetailsScreen';
// import DeviceDetailsScreen from './components/DeviceDetailsScreen';
// import { theme } from './config/theme';
// import { rtdb } from './config/firebase';
// import { ref, onValue } from 'firebase/database';

// const Stack = createStackNavigator();

// const initialDevices = [
//   { name: "Julia's ToxLIGHT", isConnected: true },
//   // { name: "Bob's ToxLIGHT", isConnected: false },
//   // { name: "Alice's ToxLIGHT", isConnected: true },
// ];

// export default function App() {
//   const [records, setRecords] = useState([]);
//   const [devices, setDevices] = useState(initialDevices);

//   useEffect(() => {
//     const recordsRef = ref(rtdb, 'records');
//     const unsubscribe = onValue(recordsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const recordsArray = Object.entries(data).map(([key, value]) => ({
//           key,
//           ...value,
//         }));
//         setRecords(recordsArray);
//       } else {
//         setRecords([]);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <NavigationContainer theme={DarkTheme}>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" options={{ headerShown: false }}>
//             {(props) => <HomeScreen {...props} records={records} devices={devices} />}
//           </Stack.Screen>
//           <Stack.Screen name="AllRecords" options={{ title: 'All Past Records' }}>
//             {(props) => <AllRecordsScreen {...props} records={records} setRecords={setRecords} />}
//           </Stack.Screen>
//           <Stack.Screen name="RecordDetails" options={{ title: 'Record Details' }}>
//             {(props) => <RecordDetailsScreen {...props} records={records} setRecords={setRecords} />}
//           </Stack.Screen>
//           <Stack.Screen name="DeviceDetails" options={{ title: 'Device Details' }}>
//             {(props) => <DeviceDetailsScreen {...props} devices={devices} setDevices={setDevices} />}
//           </Stack.Screen>
//         </Stack.Navigator>
//       </NavigationContainer>
//     </ThemeProvider>
//   );
// }

//_____________________________________________________________________________________________
//v4
// import React, { useState, useEffect } from 'react';
// import { ThemeProvider } from 'styled-components/native';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './components/HomeScreen';
// import AllRecordsScreen from './components/AllRecordsScreen';
// import RecordDetailsScreen from './components/RecordDetailsScreen';
// import DeviceDetailsScreen from './components/DeviceDetailsScreen';
// import { theme } from './config/theme';
// import { rtdb } from './config/firebase';
// import { ref, onValue } from 'firebase/database';
// import { Esp32ConnectionProvider } from './Esp32ConnectionContext'; // Adjust the path as needed

// const Stack = createStackNavigator();

// const initialDevices = [
//   { name: "Julia's ToxLIGHT", isConnected: true },
//   // { name: "Bob's ToxLIGHT", isConnected: false },
//   // { name: "Alice's ToxLIGHT", isConnected: true },
// ];

// export default function App() {
//   const [records, setRecords] = useState([]);
//   const [devices, setDevices] = useState(initialDevices);

//   useEffect(() => {
//     const recordsRef = ref(rtdb, 'records');
//     const unsubscribe = onValue(recordsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const recordsArray = Object.entries(data).map(([key, value]) => ({
//           key,
//           ...value,
//         }));
//         setRecords(recordsArray);
//       } else {
//         setRecords([]);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <Esp32ConnectionProvider> {/* Wrap the app with the provider */}
//       <ThemeProvider theme={theme}>
//         <NavigationContainer theme={DarkTheme}>
//           <Stack.Navigator>
//             <Stack.Screen name="Home" options={{ headerShown: false }}>
//               {(props) => <HomeScreen {...props} records={records} devices={devices} />}
//             </Stack.Screen>
//             <Stack.Screen name="AllRecords" options={{ title: 'All Past Records' }}>
//               {(props) => <AllRecordsScreen {...props} records={records} setRecords={setRecords} />}
//             </Stack.Screen>
//             <Stack.Screen name="RecordDetails" options={{ title: 'Record Details' }}>
//               {(props) => <RecordDetailsScreen {...props} records={records} setRecords={setRecords} />}
//             </Stack.Screen>
//             <Stack.Screen name="DeviceDetails" options={{ title: 'Device Details' }}>
//               {(props) => <DeviceDetailsScreen {...props} devices={devices} setDevices={setDevices} />}
//             </Stack.Screen>
//           </Stack.Navigator>
//         </NavigationContainer>
//       </ThemeProvider>
//     </Esp32ConnectionProvider>
//   );
// }

//v5 solve rendering <Text> error
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import AllRecordsScreen from './components/AllRecordsScreen';
import RecordDetailsScreen from './components/RecordDetailsScreen';
import DeviceDetailsScreen from './components/DeviceDetailsScreen';
import { theme } from './config/theme';
import { rtdb } from './config/firebase';
import { ref, onValue } from 'firebase/database';
import { Esp32ConnectionProvider } from './Esp32ConnectionContext'; // Import only the provider

const Stack = createStackNavigator();

const initialDevices = [
  { name: "Julia's ToxLIGHT", isConnected: true },
  // { name: "Bob's ToxLIGHT", isConnected: false },
  // { name: "Alice's ToxLIGHT", isConnected: true },
];

export default function App() {
  const [records, setRecords] = useState([]);
  const [devices, setDevices] = useState(initialDevices);

  useEffect(() => {
    const recordsRef = ref(rtdb, 'records');
    const unsubscribe = onValue(recordsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const recordsArray = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setRecords(recordsArray);
      } else {
        setRecords([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Esp32ConnectionProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <HomeScreen {...props} records={records} devices={devices} />}
              </Stack.Screen>
              <Stack.Screen name="AllRecords" options={{ title: 'All Past Records' }}>
                {(props) => <AllRecordsScreen {...props} records={records} setRecords={setRecords} />}
              </Stack.Screen>
              <Stack.Screen name="RecordDetails" options={{ title: 'Record Details' }}>
                {(props) => <RecordDetailsScreen {...props} records={records} setRecords={setRecords} />}
              </Stack.Screen>
              <Stack.Screen name="DeviceDetails" options={{ title: 'Device Details' }}>
                {(props) => <DeviceDetailsScreen {...props} devices={devices} setDevices={setDevices} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Esp32ConnectionProvider>
    </View>
  );
}