
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../config/theme';

function TimelineItem({ item, index, isSelecting, isSelected, selectedFromHome, onPress, onLongPress }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const baseColor = isSelected ? '#444' : theme.colors.itemBg;
  const animatedBgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [baseColor, '#555'],
  });

  const containerStyle = {
    flexDirection: 'row',
    marginVertical: 10,
    opacity: selectedFromHome ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(index)}
      onLongPress={() => onLongPress(index)}
      style={containerStyle}
    >
      <View style={{ width: 40, alignItems: 'center' }}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 8,
            backgroundColor: item.color,
            marginBottom: 4,
          }}
        />
        <View style={{ width: 2, flex: 1, backgroundColor: '#444' }} />
      </View>

      <Animated.View
        style={{
          flex: 1,
          borderRadius: 8,
          padding: 10,
          backgroundColor: animatedBgColor,
        }}
      >
        {isSelecting && (
          <View style={{ position: 'absolute', top: 5, right: 5 }}>
            {isSelected ? (
              <MaterialCommunityIcons name="checkbox-marked-outline" size={22} color="#fff" />
            ) : (
              <MaterialCommunityIcons name="checkbox-blank-outline" size={22} color="#fff" />
            )}
          </View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="calendar" size={18} color="#fff" />
          <Text style={{ color: '#fff', marginLeft: 4 }}>
            {item.date}, {item.time}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="map-marker" size={18} color="#fff" />
          <Text style={{ color: '#fff', marginLeft: 4 }}>{item.location}</Text>
        </View>

        <Text style={{ color: item.color, marginTop: 6 }}>{item.status}</Text>
        {/* <Text style={{ color: '#fff', marginTop: 6, fontSize: 12 }}>
          Data: {item.dataset ? item.dataset.join(', ') : 'N/A'}
        </Text> */}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default TimelineItem;

// import React, { useRef } from 'react';
// import { View, Text, TouchableOpacity, Animated } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { theme } from '../config/theme';

// function TimelineItem({
//   item,
//   index,
//   isSelecting,
//   isSelected,
//   selectedFromHome,
//   onPress,
//   onLongPress
// }) {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   const handlePressIn = () => {
//     Animated.timing(animatedValue, {
//       toValue: 1,
//       duration: 150,
//       useNativeDriver: false,
//     }).start();
//   };
//   const handlePressOut = () => {
//     Animated.timing(animatedValue, {
//       toValue: 0,
//       duration: 150,
//       useNativeDriver: false,
//     }).start();
//   };

//   const baseColor = isSelected ? '#444' : theme.colors.itemBg;
//   const animatedBgColor = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [baseColor, '#555'],
//   });

//   const containerStyle = {
//     flexDirection: 'row',
//     marginVertical: 10,
//     opacity: selectedFromHome ? 0.6 : 1,
//   };

//   return (
//     <TouchableOpacity
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//       onPress={() => onPress(index)}
//       onLongPress={() => onLongPress(index)}
//       style={containerStyle}
//     >
//       <View style={{ width: 40, alignItems: 'center' }}>
//         <View
//           style={{
//             height: 16,
//             width: 16,
//             borderRadius: 8,
//             backgroundColor: item.color,
//             marginBottom: 4,
//           }}
//         />
//         <View style={{ width: 2, flex: 1, backgroundColor: '#444' }} />
//       </View>

//       <Animated.View
//         style={{
//           flex: 1,
//           borderRadius: 8,
//           padding: 10,
//           backgroundColor: animatedBgColor,
//         }}
//       >
//         {isSelecting && (
//           <View style={{ position: 'absolute', top: 5, right: 5 }}>
//             {isSelected ? (
//               <MaterialCommunityIcons
//                 name="checkbox-marked-outline"
//                 size={22}
//                 color="#fff"
//               />
//             ) : (
//               <MaterialCommunityIcons
//                 name="checkbox-blank-outline"
//                 size={22}
//                 color="#fff"
//               />
//             )}
//           </View>
//         )}

//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
//           <MaterialCommunityIcons name="calendar" size={18} color="#fff" />
//           <Text style={{ color: '#fff', marginLeft: 4 }}>
//             {item.date}, {item.time}
//           </Text>
//         </View>

//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <MaterialCommunityIcons name="map-marker" size={18} color="#fff" />
//           <Text style={{ color: '#fff', marginLeft: 4 }}>{item.location}</Text>
//         </View>

//         <Text style={{ color: item.color, marginTop: 6 }}>{item.status}</Text>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// }

// export default TimelineItem;
