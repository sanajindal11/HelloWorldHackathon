import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { classData } from "./SampleData/variables";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>

      {classData.map((cls, index) => (
        <Link
          key={index}
          href="/assign"
          asChild
        >
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              {cls.name} - Final Grade: {cls.finalGrade}
            </Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3a3f47",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
