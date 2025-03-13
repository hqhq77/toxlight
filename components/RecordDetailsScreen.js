
//v3
import React from 'react';
import { View, Text, Button, Alert, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { Container, theme } from '../config/theme';
import { deleteRecordFromFirebase } from '../config/firebase';

function RecordDetailsScreen({ route, navigation, records, setRecords }) {
  const { recordIndex } = route.params || {};
  const record = recordIndex >= 0 && recordIndex < records.length ? records[recordIndex] : null;
  
  if (!record) {
    return (
      <Container>
        <Text style={{ color: theme.colors.text }}>Record not found!</Text>
      </Container>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const recordKey = record.key;
            deleteRecordFromFirebase(recordKey)
              .then(() => {
                const newRecords = [...records];
                newRecords.splice(recordIndex, 1);
                setRecords(newRecords);
                navigation.goBack();
              })
              .catch((error) => {
                Alert.alert('Error', 'Failed to delete record: ' + error.message);
              });
          },
        },
      ]
    );
  };

  const isSafe = record.status.toLowerCase().includes('safe');
  const screenWidth = Dimensions.get('window').width;

  // Extract values and timestamps for the graph
  const values = record.dataset && record.dataset.length > 0 ? record.dataset.map((entry) => entry.value) : [];
  const timestamps = record.dataset && record.dataset.length > 0 ? record.dataset.map((entry) => `${Math.floor(entry.timestamp)}`) : [];

  return (
    <Container>
      <Text style={{ color: theme.colors.text, fontSize: 20, marginBottom: 6 }}>
        {record.date} {record.time}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <MaterialCommunityIcons
          name="map-marker"
          size={20}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>{record.location}</Text>
      </View>

      {values.length > 0 && timestamps.length > 0 ? (
        <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
          {/* Y-axis label "Intensity" (rotated vertically) */}
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
                labels: timestamps, // Use timestamps for X-axis
                datasets: [
                  {
                    data: values, // Use values for Y-axis
                    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange line
                    strokeWidth: 2,
                  },
                ],
              }}
              width={screenWidth - 80} // Adjust width to accommodate Y-axis label
              height={200}
              chartConfig={{
                backgroundColor: theme.colors.itemBg,
                backgroundGradientFrom: theme.colors.itemBg,
                backgroundGradientTo: theme.colors.itemBg,
                fillShadowGradient: 'rgba(255, 165, 0, 0.3)', // Orange fill with opacity
                fillShadowGradientOpacity: 1, // Full opacity for the fill
                decimalPlaces: 0, // No decimals for binary data
                color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange line
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa500' }, // Orange dots
                propsForBackgroundLines: {
                  stroke: '#00CED1', // Cyan grid lines
                  strokeDasharray: '', // Solid lines
                },
              }}
              fromZero
              yAxisInterval={1} // Ensures only 0 and 1 are shown
              yAxisLabel=""
              yAxisSuffix=""
              yLabels={[0, 1]} // Explicitly set Y-axis to show only 0 and 1
              style={{ borderRadius: 8 }}
              verticalLabelRotation={0} // Keep labels horizontal
              withShadow={false} // Disable default shadow
              withInnerLines={true} // Ensure grid lines are visible
            />
            {/* Add the X-axis title "t(ms)" centered below the graph */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                t(ms)
              </Text>
            </View>
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>
              Last State: {values[values.length - 1] ?? 'N/A'}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: theme.colors.itemBg,
            borderRadius: 8,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>No Data Available</Text>
        </View>
      )}

      <Text
        style={{
          color: isSafe ? theme.colors.safe : theme.colors.warning,
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        {isSafe ? 'Safe to consume.' : 'Unsafe to consume.'}
      </Text>

      <Button title="Delete Record" color="red" onPress={handleDelete} />
    </Container>
  );
}

export default RecordDetailsScreen;

// import React from 'react';
// import { View, Text, Button, Alert } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, theme } from '../config/theme';

// function RecordDetailsScreen({ route, navigation, records, setRecords }) {
//   const { recordIndex } = route.params || {};
//   const record = recordIndex >= 0 && recordIndex < records.length
//     ? records[recordIndex]
//     : null;

//   if (!record) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Record not found!</Text>
//       </Container>
//     );
//   }

//   const handleDelete = () => {
//     Alert.alert(
//       'Delete Record',
//       'Are you sure you want to delete this record?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             const newRecords = [...records];
//             newRecords.splice(recordIndex, 1);
//             setRecords(newRecords);
//             navigation.goBack();
//           },
//         },
//       ]
//     );
//   };

//   const isSafe = record.status.toLowerCase().includes('safe');

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 20, marginBottom: 6 }}>
//         {record.date} {record.time}
//       </Text>

//       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//         <MaterialCommunityIcons
//           name="map-marker"
//           size={20}
//           color="#fff"
//           style={{ marginRight: 6 }}
//         />
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           {record.location}
//         </Text>
//       </View>

//       <View
//         style={{
//           width: '100%',
//           height: 200,
//           backgroundColor: theme.colors.itemBg,
//           borderRadius: 8,
//           marginBottom: 20,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Text style={{ color: '#fff' }}>Graph: I vs. t</Text>
//       </View>

//       <Text
//         style={{
//           color: isSafe ? theme.colors.safe : theme.colors.warning,
//           fontSize: 18,
//           marginBottom: 20,
//         }}
//       >
//         {isSafe ? 'Safe to consume.' : 'Unsafe to consume.'}
//       </Text>

//       <Button title="Delete Record" color="red" onPress={handleDelete} />
//     </Container>
//   );
// }

// export default RecordDetailsScreen;

//v2
// import React from 'react';
// import { View, Text, Button, Alert } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, theme } from '../config/theme';
// import { deleteRecordFromFirebase } from '../config/firebase';

// function RecordDetailsScreen({ route, navigation, records, setRecords }) {
//   const { recordIndex } = route.params || {};
//   const record = recordIndex >= 0 && recordIndex < records.length
//     ? records[recordIndex]
//     : null;

//   if (!record) {
//     return (
//       <Container>
//         <Text style={{ color: theme.colors.text }}>Record not found!</Text>
//       </Container>
//     );
//   }

//   const handleDelete = () => {
//     Alert.alert(
//       'Delete Record',
//       'Are you sure you want to delete this record?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             const recordKey = record.key;
//             deleteRecordFromFirebase(recordKey)
//               .then(() => {
//                 const newRecords = [...records];
//                 newRecords.splice(recordIndex, 1);
//                 setRecords(newRecords);
//                 navigation.goBack();
//               })
//               .catch((error) => {
//                 Alert.alert('Error', 'Failed to delete record: ' + error.message);
//               });
//           },
//         },
//       ]
//     );
//   };

//   const isSafe = record.status.toLowerCase().includes('safe');

//   return (
//     <Container>
//       <Text style={{ color: theme.colors.text, fontSize: 20, marginBottom: 6 }}>
//         {record.date} {record.time}
//       </Text>

//       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//         <MaterialCommunityIcons
//           name="map-marker"
//           size={20}
//           color="#fff"
//           style={{ marginRight: 6 }}
//         />
//         <Text style={{ color: theme.colors.text, fontSize: 18 }}>
//           {record.location}
//         </Text>
//       </View>

//       <View
//         style={{
//           width: '100%',
//           height: 200,
//           backgroundColor: theme.colors.itemBg,
//           borderRadius: 8,
//           marginBottom: 20,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Text style={{ color: '#fff' }}>
//           Dataset: {record.dataset ? record.dataset.join(', ') : 'N/A'}
//         </Text>
//       </View>

//       <Text
//         style={{
//           color: isSafe ? theme.colors.safe : theme.colors.warning,
//           fontSize: 18,
//           marginBottom: 20,
//         }}
//       >
//         {isSafe ? 'Safe to consume.' : 'Unsafe to consume.'}
//       </Text>

//       <Button title="Delete Record" color="red" onPress={handleDelete} />
//     </Container>
//   );
// }

// export default RecordDetailsScreen;
