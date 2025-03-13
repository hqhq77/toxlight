// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, Card, ItemRow } from '../config/theme';

// function HomeScreen({ navigation, records, devices }) {
//   return (
//     <Container>
//       <View style={{ width: '100%', height: '30%', position: 'relative' }}>
//         <Image
//           source={{
//             uri: 'https://citizendium.org/wiki/images/b/b8/Photobacterium_phosphoreum.jpg',
//           }}
//           style={{
//             width: '100%',
//             height: '100%',
//             resizeMode: 'cover'
//           }}
//         />
//         <View
//           style={{
//             position: 'absolute',
//             bottom: '-20%',
//             width: '100%',
//             alignItems: 'center'
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 36,
//               fontWeight: 'bold',
//               color: '#fff'
//             }}
//           >
//             ToxLIGHT
//           </Text>
//         </View>
//       </View>

//       <View style={{ marginTop: '15%' }} />

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//         <Card style={{ width: '48%' }}>
//           <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
//             Devices
//           </Text>
//           <FlatList
//             style={{ maxHeight: 200 }}
//             data={devices}
//             keyExtractor={(_, idx) => idx.toString()}
//             renderItem={({ item, index }) => (
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('DeviceDetails', { deviceIndex: index })}
//               >
//                 <ItemRow>
//                   <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//                     {item.name}
//                   </Text>
//                   <Text
//                     style={{
//                       color: item.isConnected ? '#32CD32' : '#FF4500',
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     {item.isConnected ? 'Connected' : 'Disconnected'}
//                   </Text>
//                 </ItemRow>
//               </TouchableOpacity>
//             )}
//           />
//         </Card>

//         <Card style={{ width: '48%' }}>
//           <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
//             Past Records
//           </Text>
//           <FlatList
//             style={{ maxHeight: 200 }}
//             data={records}
//             keyExtractor={(_, index) => index.toString()}
//             renderItem={({ item, index }) => (
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate('AllRecords', { selectedIndex: index })
//                 }
//               >
//                 <ItemRow>
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <MaterialCommunityIcons
//                       name="map-marker"
//                       size={18}
//                       color="#fff"
//                       style={{ marginRight: 5 }}
//                     />
//                     <Text style={{ color: '#fff', marginRight: 8 }}>
//                       {item.location}
//                     </Text>

//                     <MaterialCommunityIcons
//                       name="calendar"
//                       size={18}
//                       color="#fff"
//                       style={{ marginRight: 5 }}
//                     />
//                     <Text style={{ color: '#fff' }}>{item.date}, {item.time}</Text>
//                   </View>
//                   <Text style={{ color: item.color, marginTop: 5 }}>{item.status}</Text>
//                 </ItemRow>
//               </TouchableOpacity>
//             )}
//           />
//         </Card>
//       </View>
//     </Container>
//   );
// }

// export default HomeScreen;

//v2
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, Card, ItemRow } from '../config/theme';
// import { ref, onValue } from 'firebase/database';
// import { rtdb } from '../config/firebase';

// function HomeScreen({ navigation, records, devices }) {
//   // New state to track the ESP32 connectivity (from Firebase)
//   const [isEspConnected, setIsEspConnected] = useState(false);
//   const [lastUpdateTime, setLastUpdateTime] = useState(0);
//   const disconnectionTimeout = 5000; // 5 seconds timeout

//   // Listen to Firebase "deviceStatus" to update the last update time
//   useEffect(() => {
//     const statusRef = ref(rtdb, 'deviceStatus');
//     const unsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         // When a new update is received, update the timestamp
//         setLastUpdateTime(Date.now());
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Check the connectivity periodically based on the last update time
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       if (currentTime - lastUpdateTime < disconnectionTimeout) {
//         setIsEspConnected(true);
//       } else {
//         setIsEspConnected(false);
//       }
//     }, 2000); // Check every 2 seconds
//     return () => clearInterval(interval);
//   }, [lastUpdateTime]);

//   return (
//     <Container>
//       <View style={{ width: '100%', height: '30%', position: 'relative' }}>
//         <Image
//           source={{
//             uri: 'https://citizendium.org/wiki/images/b/b8/Photobacterium_phosphoreum.jpg',
//           }}
//           style={{
//             width: '100%',
//             height: '100%',
//             resizeMode: 'cover'
//           }}
//         />
//         <View
//           style={{
//             position: 'absolute',
//             bottom: '-20%',
//             width: '100%',
//             alignItems: 'center'
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 36,
//               fontWeight: 'bold',
//               color: '#fff'
//             }}
//           >
//             ToxLIGHT
//           </Text>
//         </View>
//       </View>

//       <View style={{ marginTop: '15%' }} />

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//         <Card style={{ width: '48%' }}>
//           <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
//             Devices
//           </Text>
//           <FlatList
//             style={{ maxHeight: 200 }}
//             data={devices}
//             keyExtractor={(_, idx) => idx.toString()}
//             renderItem={({ item, index }) => {
//               // Combine device's own connection state with the ESP32 connection status.
//               const connected = item.isConnected && isEspConnected;
//               return (
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate('DeviceDetails', { deviceIndex: index })
//                   }
//                 >
//                   <ItemRow>
//                     <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//                       {item.name}
//                     </Text>
//                     <Text
//                       style={{
//                         color: connected ? '#32CD32' : '#FF4500',
//                         fontWeight: 'bold'
//                       }}
//                     >
//                       {connected ? 'Connected' : 'Disconnected'}
//                     </Text>
//                   </ItemRow>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </Card>

//         <Card style={{ width: '48%' }}>
//           <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
//             Past Records
//           </Text>
//           <FlatList
//             style={{ maxHeight: 200 }}
//             data={records}
//             keyExtractor={(_, index) => index.toString()}
//             renderItem={({ item, index }) => (
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate('AllRecords', { selectedIndex: index })
//                 }
//               >
//                 <ItemRow>
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <MaterialCommunityIcons
//                       name="map-marker"
//                       size={18}
//                       color="#fff"
//                       style={{ marginRight: 5 }}
//                     />
//                     <Text style={{ color: '#fff', marginRight: 8 }}>
//                       {item.location}
//                     </Text>
//                     <MaterialCommunityIcons
//                       name="calendar"
//                       size={18}
//                       color="#fff"
//                       style={{ marginRight: 5 }}
//                     />
//                     <Text style={{ color: '#fff' }}>
//                       {item.date}, {item.time}
//                     </Text>
//                   </View>
//                   <Text style={{ color: item.color, marginTop: 5 }}>
//                     {item.status}
//                   </Text>
//                 </ItemRow>
//               </TouchableOpacity>
//             )}
//           />
//         </Card>
//       </View>
//     </Container>
//   );
// }

// export default HomeScreen;

//_______________________________________________________________________
//v3
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Card, ItemRow } from '../config/theme';
import { useEsp32Connection } from '../Esp32ConnectionContext'; // Adjust the path as needed

function HomeScreen({ navigation, records, devices }) {
  const { isEspConnected } = useEsp32Connection(); // Access global ESP32 connection state

  return (
    <Container>
      <View style={{ width: '100%', height: '30%', position: 'relative' }}>
        <Image
          source={{
            uri: 'https://citizendium.org/wiki/images/b/b8/Photobacterium_phosphoreum.jpg',
          }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: '-20%',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            ToxLIGHT
          </Text>
        </View>
      </View>

      <View style={{ marginTop: '15%' }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Card style={{ width: '48%' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            Devices
          </Text>
          <FlatList
            style={{ maxHeight: 200 }}
            data={devices}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item, index }) => {
              // Combine device's own connection state with the ESP32 connection status
              const connected = item.isConnected && isEspConnected;
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeviceDetails', { deviceIndex: index })
                  }
                >
                  <ItemRow>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: connected ? '#32CD32' : '#FF4500',
                        fontWeight: 'bold',
                      }}
                    >
                      {connected ? 'Connected' : 'Disconnected'}
                    </Text>
                  </ItemRow>
                </TouchableOpacity>
              );
            }}
          />
        </Card>

        <Card style={{ width: '48%' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            Past Records
          </Text>
          <FlatList
            style={{ maxHeight: 200 }}
            data={records}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllRecords', { selectedIndex: index })
                }
              >
                <ItemRow>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={18}
                      color="#fff"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: '#fff', marginRight: 8 }}>
                      {item.location}
                    </Text>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={18}
                      color="#fff"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: '#fff' }}>
                      {item.date}, {item.time}
                    </Text>
                  </View>
                  <Text style={{ color: item.color, marginTop: 5 }}>
                    {item.status}
                  </Text>
                </ItemRow>
              </TouchableOpacity>
            )}
          />
        </Card>
      </View>
    </Container>
  );
}

export default HomeScreen;  