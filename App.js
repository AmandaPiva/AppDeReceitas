import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Appbar, Searchbar, Card, Paragraph } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';


export default function App() {
  const [meals, setMeals] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  console.log(meals);
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php"

  const getMeals = async function(){
    const response = await fetch(url);
    const data = await response.json();
    setMeals(data.categories);
  }

  useEffect(() => {
      getMeals();
  }, [])

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Appbar style={styles.Appbar}>
      <Text style={styles.Text1}>Minhas Receitas</Text>
      </Appbar>

      <View style={styles.View1}>
        <Pressable style={styles.Button}>
          <AntDesign name="edit" size={24} color="white" style={styles.IconBtn} />
          <Text style={styles.LabelBtn}>Criar Receita</Text>
        </Pressable>

      </View>
      <View style={styles.View2}>
        <Text style={styles.Text2}>Ultimas Receitas</Text>
      </View>

      <StatusBar style="auto" />

      <ScrollView>
        {
          meals.map((meal) => (
            <Card key={meal.idCategory}>
              <Card.Cover source={meal.strCategoryThumb}/>
              <Card.Title title={meal.strCategory}/>
              <Card.Content>
                <Paragraph>{meal.strCategoryDescription}</Paragraph>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    Appbar:{
      backgroundColor: '#F27289',
      paddingTop:'2%',
    },
    Text1:{
      color:"#fff",
      marginLeft:"5%",
      fontSize: 18
    },
    View1: {
      padding:30,
      marginLeft:20,
      height:"12%",
    },
    Button: {
      backgroundColor:"#BFB39B",
      width:"50%",
      height:"70%",
      display:"flex",
      flexDirection:"row",
      borderRadius:10,
    },
    LabelBtn: {
      textAlign:"center",
      marginTop:15,
      paddingLeft:10,
      color:"#fff",
      fontSize:15
    },
    IconBtn: {
      marginTop:15,
      paddingLeft:15
    },
    Text2: {
      textAlign:"center",
      fontSize:30,
      color:"#D9666F",
      fontWeight:"500"
    },
    View2: {
      padding:40
    }
});
