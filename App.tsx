/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image as RnImage,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import Canvas , {Image as CanvasImage} from 'react-native-canvas';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import SpriteImage from './assets/images/Dhoodh_Set.png';
import SpriteImage from './assets/images/css_sprites-120.png';
// import SpriteImage from './assets/images/css_sprites.png';

import SpriteComponent from './SpriteComponent120';
import SpriteComponent60 from './SpriteComponent60'


type SectionProps = PropsWithChildren<{
  title: string;
}>;


let GAME_FRAME = 0; // Not required to change
let STAGERRED_FRAME = 1; // More the staggerred frame is , slower will be the animation
let FRAME = 0; // Keep Track of the current Frame count
let TOTAL_FRAMES = 118; // Oth based Indexing of Sprite Sequence
let START_MARGIN = 90; // First Sequence is starting from 90px in Sequence Png Image if not use



function App(): JSX.Element {

  var context:any = null;
  var image:any = null;
  
  const [spriteObj,setSpriteObj] = useState({
    x:0,
    y:0,
    width:170,
    height:250,
  })

  const requestRef = React.useRef();


const handleCanvas = (canvas) => {
  // Checking if canvas is present 
  if (!(canvas instanceof Canvas)) {
    return;
  }
  image = new CanvasImage(canvas);
  canvas.height = 250;
  canvas.width = 200;
  context = canvas.getContext('2d');
  // context.clearRect(0, 0, 200, 260);
  // context.fillStyle = "rgba(0, 0, 200, 0.5)";
  // For locally stored Images
  image.src = RnImage.resolveAssetSource(SpriteImage).uri;
  // For web based Image url 
  // image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/mario.png';
  image.addEventListener('load', () => {
    console.log('image is loaded');
    animate(); // Calling Animate Function
    // context.fillStyle = "#FF0000";
    // context.fillRect(0, 0, 150, 75);
    // context.drawImage(image,(FRAME * spriteObj.width) + START_MARGIN,0,spriteObj.width,spriteObj.height,0,0,spriteObj.width,spriteObj.height);

  });
  
}

const animate =  () => {

  // Making Background Transparent
  context.clearRect(0,0,200,250); // Clearing Canvas before running next iteration
  console.log("frame",FRAME);
  
  // context.drawImage(image,FRAME * spriteObj.width,0,spriteObj.width,spriteObj.height,0,0,spriteObj.width,spriteObj.height);
  context.drawImage(image,(FRAME * spriteObj.width),0,spriteObj.width,spriteObj.height,0,0,spriteObj.width,spriteObj.height);
  
  if(GAME_FRAME % STAGERRED_FRAME == 0) { // if condition for slowing down the animation speed
    if(FRAME < TOTAL_FRAMES) { // Checking for Max Frames
      FRAME++; 
    } else {
      FRAME = 0; // Resetting frame when reached at the last sequence
    }
  }
  GAME_FRAME++; 
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / 60);
  // requestAnimationFrame(animate); // Looping function for next Iteration of same function "animate()"
}
 
  return (
    <SafeAreaView>
      <View style={{backgroundColor:'#e2edde'}}>
      {/* <SpriteComponent /> */}
      {/* <SpriteComponent60 /> */}
        <Canvas ref={handleCanvas} style={{width:'100%',height:'100%'}} />
      </View>
    </SafeAreaView>
  );
}


export default memo(App);
