import { View, Text, Image } from "react-native";
import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import styles from "./style";
import HeaderBar from "../../components/HeaderBar";
import Icon from "react-native-vector-icons/AntDesign";
import colorPalette from "../../themes/colors";
import { W } from "../../utils/ui/dimension";

const data = [
  {
    trainerName: "Ahmet Hocayla Cycling",
    date: "12.12.2020",
    time: "12:00",
    image: "https://picsum.photos/50",
  },
  {
    trainerName: "Ayşe Hocayla Zumba",
    date: "12.12.2020",
    time: "12:00",
    image: "https://picsum.photos/50",
  },
  {
    trainerName: "Volkan Hocayla “Try Hard” dersi",
    date: "12.12.2020",
    time: "12:00",
    image: "https://picsum.photos/50",
  },
];

const Reservation = () => {
  return (
    <View style={styles.container}>
      <HeaderBar title={"Rezervasyonlarım"} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.resrow}>
            <Image style={styles.images} source={{ uri: item.image }} />
            <View style={styles.namedate}>
              <Text style={styles.trainername}>{item.trainerName}</Text>
              <Text style={styles.dateTime}>
                {item.time} - {item.date}
              </Text>
            </View>
          </View>
        )}
        nestedScrollEnabled
      />
      <View style={styles.addButton}>
        <Icon name={"pluscircle"} color={colorPalette.lightRed} size={60} />
      </View>
    </View>
  );
};

export default Reservation;