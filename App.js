import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {

  const [odds, setOdds] = useState([]);
  const [displayedOdds, setDisplayedOdds] = useState([])
  const [page, setPage] = useState(1);

  useEffect(() => {
    getOdds();
  }, [])

  const getOdds = async () => {
    try {
      const response = await fetch('https://www.merkurxtip.rs/restapi/offer/sr/sport/S/mob?annex=0&hours=72&desktopVersion=1.23.4&locale=sr');
      const data = await response.json()
      setOdds(data.esMatches);
      setDisplayedOdds(data.esMatches.slice(0, page * 30))
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setDisplayedOdds(odds.slice(0, page * 30))
  }, [page])


  const displayOdds = () => {
    setPage(prevPage => prevPage + 1)
  }

  const renderItem = ({ item }) => {
    return (<Text style={{ color: 'white' }}>{item.home}</Text>)

  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FlatList
        data={displayedOdds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={displayOdds}
        onEndReachedThreshold={0.1}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04133D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
