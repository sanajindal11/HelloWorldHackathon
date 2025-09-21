import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { classData } from "./SampleData/variables";

const Assign = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Assignments</Text>
      {classData.map((classItem) => (
        <View key={classItem.id} style={styles.classSection}>
          <Text style={styles.className}>{classItem.name}</Text>
          <FlatList
            data={classItem.assignments}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                {item.name}: {item.grade}%
              </Text>
            )}
          />
        </View>
      ))}
    </View>
  );
};

export default Assign;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  classSection: { marginBottom: 20 },
  className: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  item: { fontSize: 18, paddingVertical: 2 },
});
