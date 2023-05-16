 import React, { memo, useState } from 'react';
 import {
   Image as RnImage,
   SafeAreaView,
 } from 'react-native';
 
 import Canvas , {Image as CanvasImage} from 'react-native-canvas';
 
 import SpriteImage from './assets/images/css_sprites-120.png';
 
 
 let GAME_FRAME = 0; // Not required to change
 let STAGERRED_FRAME = 4; // More the staggerred frame is , slower will be the animation
 let FRAME = 0; // Keep Track of the current Frame count
 let TOTAL_FRAMES = 119;

 
 function App(): JSX.Element {
 
   var context:any = null;
   var image:any = null;
   
   const [spriteObj,setSpriteObj] = useState({
     x:0,
     y:0,
     width:170,
     height:250,
     currentFrame:0,
     totalFrame:149
   })
 
 const handleCanvas = (canvas) => {
   // Checking if canvas is present 
   if (!(canvas instanceof Canvas)) {
     return;
   }
   image = new CanvasImage(canvas);
   canvas.height = 300;
   canvas.width = 300;
   context = canvas.getContext('2d');
   // For locally stored Images
   image.src = RnImage.resolveAssetSource(SpriteImage).uri;
   // For web based Image url
   // image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/mario.png';
   image.addEventListener('load', () => {
     console.log('image is loaded');
     animate(); // Calling Animate Funvtion
   });
   
 }
 
 const animate = () => {
 
   context.drawImage(image,FRAME * spriteObj.width,0,spriteObj.width,spriteObj.height,0,0,spriteObj.width,spriteObj.height);
   console.log("Frame",FRAME,spriteObj.totalFrame);
   
   if(GAME_FRAME % STAGERRED_FRAME == 0) { // if condition for slowing down the animation speed
     if(FRAME < TOTAL_FRAMES) {
       FRAME++;
     } else {
       FRAME = 0;
     }
   }
   GAME_FRAME++; 
   requestAnimationFrame(animate); // Looping function for next Iteration
 }
  
   return (
     <SafeAreaView>
       <Canvas ref={handleCanvas} style={{width:'100%',height:'100%',backgroundColor:'#e2edde'}} />
     </SafeAreaView>
   );
 }
 
 
 export default memo(App);
 