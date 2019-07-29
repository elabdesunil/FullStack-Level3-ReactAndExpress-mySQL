import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableHighlight} from 'react-native';
const SpaceImages = [

  {
    url: "https://i.imgur.com/9p4VsBw.jpg",
    caption: "When Galaxeys Collide"
  },

  {
    url: "https://i.imgur.com/dggemYH.jpg",
    caption: "Florida, from above."
  },

  {
    url: "https://i.imgur.com/deI932c.jpg",
    caption: "LEGO Spaceman"
  },

  {
    url: "https://i.imgur.com/j69hRu8.jpg",
    caption: "Star Wars with the crew"
  },

  {
    url: "https://i.imgur.com/YUipl9m.jpg",
    caption: "Japanese drone aboard the ISS"
  },

  {
    url: "https://i.imgur.com/VcCPjaV.jpg",
    caption: "Not the ISS ..."
  }
 ];

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      index:0,
      imageWidth:0,
    }
  }
  newImage = (event)=>{
    const {index, imageWidth} = this.state;
    const X = event.nativeEvent.locationX;
    const touchCalc = (X < imageWidth/2)? -1:1;
    let newIndex = (index + touchCalc) % SpaceImages.length;
    if(newIndex < 0){
      newIndex = SpaceImages.length + newIndex;
    }
    this.setState({
      index:newIndex
    })
  }
  onNewLayout = (event)=>{
    this.setState({
      imageWidth:event.nativeEvent.layout.width
    })
  }

  render(){
    const image = SpaceImages[this.state.index];
    return(
      <View style={styles.container}>
      <View style = {styles.empty} />
      <TouchableHighlight onPress = {this.newImage} style = {styles.image}>
      <ImageBackground source = {{uri: image.url}} style = {styles.image}>
      <Text style = {styles.imageCaption}>{image.caption}</Text>
      </ ImageBackground>
      </TouchableHighlight>
      <View style = {styles.empty} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#3D485E'
  },
  image:{
    flex:2,
    width:320,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  imageCaption:{
    textAlign:'center',
    backgroundColor:'rgba(100,100,100,0.5)',
    color:'white',
    width:320
  },
  empty:{
    flex:1
  }
})