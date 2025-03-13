// import React, { useState, useEffect, useRef } from 'react';
// import { View, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
// import { theme } from '../config/theme';
// import TimelineItem from './TimelineItem';

// function AllRecordsScreen({ route, navigation, records, setRecords }) {
//   const { selectedIndex = 0 } = route.params || {};
//   const listRef = useRef(null);

//   const [isSelecting, setIsSelecting] = useState(false);
//   const [selectedIndices, setSelectedIndices] = useState([]);

//   useEffect(() => {
//     if (!records || records.length === 0) return;
//     const safeIndex = Math.max(0, Math.min(selectedIndex, records.length - 1));
//     setTimeout(() => {
//       if (listRef.current) {
//         listRef.current.scrollToIndex({
//           index: safeIndex,
//           animated: true,
//           viewPosition: 0.5,
//         });
//       }
//     }, 300);
//   }, [records, selectedIndex]);

//   const toggleSelection = (index) => {
//     if (selectedIndices.includes(index)) {
//       setSelectedIndices(selectedIndices.filter((i) => i !== index));
//     } else {
//       setSelectedIndices([...selectedIndices, index]);
//     }
//   };

//   const handlePressItem = (index) => {
//     if (isSelecting) {
//       toggleSelection(index);
//     } else {
//       navigation.navigate('RecordDetails', { recordIndex: index });
//     }
//   };

//   const handleLongPressItem = (index) => {
//     if (!isSelecting) {
//       setIsSelecting(true);
//       setSelectedIndices([index]);
//     } else {
//       toggleSelection(index);
//     }
//   };

//   const selectAll = () => {
//     const allIndices = records.map((_, idx) => idx);
//     setSelectedIndices(allIndices);
//   };

//   const deleteSelected = () => {
//     if (selectedIndices.length === 0) return;
//     Alert.alert(
//       'Delete Records',
//       `Are you sure you want to delete ${selectedIndices.length} records?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             const newRecords = records.filter(
//               (_, idx) => !selectedIndices.includes(idx)
//             );
//             setRecords(newRecords);
//             setIsSelecting(false);
//             setSelectedIndices([]);
//           },
//         },
//       ]
//     );
//   };

//   const cancelSelection = () => {
//     setIsSelecting(false);
//     setSelectedIndices([]);
//   };

//   const renderTimelineItem = ({ item, index }) => {
//     return (
//       <TimelineItem
//         item={item}
//         index={index}
//         isSelecting={isSelecting}
//         isSelected={selectedIndices.includes(index)}
//         selectedFromHome={index === selectedIndex}
//         onPress={handlePressItem}
//         onLongPress={handleLongPressItem}
//       />
//     );
//   };

//   const getItemLayout = (_, i) => ({
//     length: 80,
//     offset: 80 * i,
//     index: i,
//   });

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
//       {isSelecting && (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
//           <Button title="Select All" onPress={selectAll} />
//           <Button title="Delete" onPress={deleteSelected} color="red" />
//           <Button title="Cancel" onPress={cancelSelection} />
//         </View>
//       )}

//       <FlatList
//         ref={listRef}
//         data={records}
//         keyExtractor={(_, idx) => idx.toString()}
//         renderItem={renderTimelineItem}
//         contentContainerStyle={{ padding: 20 }}
//         getItemLayout={getItemLayout}
//       />
//     </View>
//   );
// }

// export default AllRecordsScreen;

import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Button, Alert, Text as RNText } from 'react-native';
import { theme } from '../config/theme';
import { deleteRecordFromFirebase } from '../config/firebase';
import TimelineItem from './TimelineItem';

function AllRecordsScreen({ route, navigation, records, setRecords }) {
  const { selectedIndex = 0 } = route.params || {};
  const listRef = useRef(null);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    if (!records || records.length === 0) return;
    const safeIndex = Math.max(0, Math.min(selectedIndex, records.length - 1));
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToIndex({
          index: safeIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }, 300);
  }, [records, selectedIndex]);

  const toggleSelection = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handlePressItem = (index) => {
    if (isSelecting) {
      toggleSelection(index);
    } else {
      navigation.navigate('RecordDetails', { recordIndex: index });
    }
  };

  const handleLongPressItem = (index) => {
    if (!isSelecting) {
      setIsSelecting(true);
      setSelectedIndices([index]);
    } else {
      toggleSelection(index);
    }
  };

  const selectAll = () => {
    const allIndices = records.map((_, idx) => idx);
    setSelectedIndices(allIndices);
  };

  const deleteSelected = () => {
    if (selectedIndices.length === 0) return;
    Alert.alert(
      'Delete Records',
      `Are you sure you want to delete ${selectedIndices.length} records?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const promises = selectedIndices.map((index) => deleteRecordFromFirebase(records[index].key));
            Promise.all(promises)
              .then(() => {
                const newRecords = records.filter((_, idx) => !selectedIndices.includes(idx));
                setRecords(newRecords);
                setIsSelecting(false);
                setSelectedIndices([]);
              })
              .catch((error) => Alert.alert('Error', 'Failed to delete records: ' + error.message));
          },
        },
      ]
    );
  };

  const cancelSelection = () => {
    setIsSelecting(false);
    setSelectedIndices([]);
  };

  const renderTimelineItem = ({ item, index }) => {
    return (
      <TimelineItem
        item={item}
        index={index}
        isSelecting={isSelecting}
        isSelected={selectedIndices.includes(index)}
        selectedFromHome={index === selectedIndex}
        onPress={handlePressItem}
        onLongPress={handleLongPressItem}
      />
    );
  };

  const getItemLayout = (_, i) => ({
    length: 80,
    offset: 80 * i,
    index: i,
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {isSelecting && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <Button title="Select All" onPress={selectAll} />
          <Button title="Delete" onPress={deleteSelected} color="red" />
          <Button title="Cancel" onPress={cancelSelection} />
        </View>
      )}

      <FlatList
        ref={listRef}
        data={records}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderTimelineItem}
        contentContainerStyle={{ padding: 20 }}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

export default AllRecordsScreen;