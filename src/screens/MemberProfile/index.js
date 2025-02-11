import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import database from "@react-native-firebase/database";
import { useIsFocused } from "@react-navigation/native";

import { spacing } from "../../configs";
import { Member, MemberInfo, Spacing, HeaderBar, LinearButton } from "../../components";
import styles from "./style";
import colorPalette from "../../themes/colors";
import LottieFile from "lottie-react-native";
import { SLEEP } from "../../utils/sleep";

const MemberProfile = ({ navigation }) => {
  const { userId } = useSelector((state) => state.app);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadUserDataFromFirebase = () => {
      let rootRef = database().ref();
      rootRef
        .child("Users")
        .orderByChild("userid")
        .equalTo(userId)
        .once("value")
        .then((snapshot) => {
          const key = Object.keys(snapshot.val())[0];
          setUser(snapshot.val()[key]);
        })
        .then(async () => {
          await SLEEP(1500);
          setLoaded(true);
        });
    };
    if (isFocused) {
      loadUserDataFromFirebase();
    }
  }, [isFocused]);

  return (
    <>
      <HeaderBar title={"Member Profile"} exit onClickHandler={() => navigation.navigate("Login")} onClickBackHandler={() => navigation.goBack()} />
      {!loaded && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <LottieFile source={require("../../assets/129733-dancing-girl.json")} autoPlay />
        </View>
      )}
      {loaded && (
        <View style={styles.main}>
          <Spacing spacing={spacing.xs} />
          <Member style={styles.member} memberName={user.name + " " + user.surname} memberAllowedTime={user.allowedProfileTime} />
          <Spacing spacing={spacing.s} />
          <MemberInfo status={user.status.paymentBoolean} userid={userId} />
          <View style={styles.buttonLinearContainer}>
            <View style={styles.buttonLinear}>
              <LinearButton
                colors={[colorPalette.lightRed, colorPalette.darkRed]}
                title={"Rezervasyonlarım"}
                onClickHandler={() => navigation.navigate("Reservation")}
              />
            </View>
            <View style={styles.buttonLinear}>
              <LinearButton
                colors={[colorPalette.lightRed, colorPalette.darkRed]}
                title={"Ödeme Yap"}
                onClickHandler={() => navigation.navigate("PaymentScreen")}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("QrCodeScreen")} disabled={
            user.status.paymentBoolean === false ||
              user.status.adminBoolean === true ? true : false}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colorPalette.lightRed, colorPalette.darkRed]}
              style={user.status.paymentBoolean === false ||
                user.status.adminBoolean === true ?
                styles.disabledButonCircular : styles.buttonCircular} >
              <Text style={{ color: colorPalette.white, fontWeight: "bold" }}>
                <Icon name="camera" size={30} />
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Spacing spacing={spacing.m} />
          {
            user.status.adminBoolean === true &&
            (<Text style={{textAlign: "center"}}>
              Üyeliğiniz askıya alınmıştır. Lütfen iletişime geçiniz!
            </Text>)
          }
          {
            user.status.paymentBoolean === false && 
            user.status.adminBoolean === false &&
            (<Text>
              Üyelik süreniz dolmuştur. Lütfen ödeme yapiniz!
            </Text>)
          }
        </View>
      )}
    </>
  );
};

export default MemberProfile;
