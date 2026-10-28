/* Art-only module. Replace a renderer or assign PNG sprite metadata in overrides.js.
   Coordinates are relative to the object's center; physics lives in game.js. */
const Palette=['#dedede','#b3b3b3','#797979','#2f2f2f'];
const Art={renderers:{},images:{},overrides:window.LP_ART||{},
 draw(g,key,x,y,options={}){const custom=this.overrides[key];if(custom?.src){let img=this.images[key];if(!img){img=this.images[key]=new Image();img.src=custom.src}if(img.complete&&img.naturalWidth){g.imageSmoothingEnabled=false;const w=custom.width||32,h=custom.height||32,frames=custom.frames||1,frame=Math.floor((options.time||0)*(custom.fps||8))%frames;g.drawImage(img,frame*img.naturalWidth/frames,0,img.naturalWidth/frames,img.naturalHeight,Math.round(x-(custom.anchorX??w/2)),Math.round(y-(custom.anchorY??h/2)),w,h);return}}g.save();g.translate(Math.round(x),Math.round(y));this.renderers[key]?.(g,options);g.restore()},
 box(g,x,y,w,h,c){g.fillStyle=Palette[c];g.fillRect(Math.round(x),Math.round(y),w,h)},
 poly(g,points,c){g.fillStyle=Palette[c];g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()}};
const B=(g,x,y,w,h,c)=>Art.box(g,x,y,w,h,c),P=(g,p,c)=>Art.poly(g,p,c);
Art.renderers.pigeon=(g,o)=>{B(g,-12,0,8,4,3);B(g,-9,-4,18,13,3);B(g,-7,-3,14,10,1);B(g,-4,0,10,7,2);B(g,-3,o.flap?-13:-1,8,o.flap?15:8,2);B(g,4,-12,10,12,3);B(g,5,-11,8,10,1);B(g,14,-5,5,3,3);B(g,-5,9,2,4,3);B(g,3,9,2,4,3);
 // Mechanical eye socket, chrome ring, bright lens. Laser origin: (+10,-7).
 B(g,6,-11,9,8,3);B(g,7,-10,7,6,0);B(g,8,-9,5,4,2);B(g,9,-8,3,2,3);B(g,10,-8,1,1,0);B(g,5,-5,2,3,3);if(o.firing)B(g,14,-8,5,2,0)};
Art.renderers.hawk=g=>{P(g,[[-17,-8],[-5,-3],[0,-6],[5,-3],[17,-8],[9,3],[2,4],[0,11],[-3,4],[-10,2]],3);B(g,0,-5,5,4,2);B(g,3,-5,1,1,0)};
function cat(g,o,tall){B(g,-13,-3,23,11,tall?3:2);B(g,6,-9,12,12,3);P(g,[[6,-8],[7,-15],[12,-8],[16,-15],[18,-7]],3);B(g,8,-7,3,2,0);B(g,14,-7,2,2,0);B(g,18,-2,4,2,3);B(g,-12,7,4,6,3);B(g,3,7,4,6,3);B(g,-20,-8,4,10,3);B(g,-18,-2,6,4,3);if(tall){B(g,-10,-2,3,8,0);B(g,-3,-2,3,8,0)}}
Art.renderers.cat=(g,o)=>cat(g,o,false);Art.renderers.highCat=(g,o)=>cat(g,o,true);
Art.renderers.kid=(g,o)=>{B(g,-5,-17,10,9,2);B(g,-6,-18,12,4,3);B(g,-7,-7,14,15,3);B(g,-6,8,4,10,3);B(g,3,8,4,10,3);g.save();g.rotate(o.aim||0);B(g,0,-4,16,4,2);B(g,12,-7,7,6,3);B(g,12,-10,5,3,2);g.restore()};
Art.renderers.paint=g=>{B(g,-3,-3,6,6,3);B(g,-2,-2,2,2,0)};
function wheels(g,w,y){for(const x of [-w/2+8,w/2-8]){B(g,x-4,y-4,8,8,3);B(g,x-2,y-2,4,4,1)}}
Art.renderers.taxi=g=>{B(g,-21,-5,42,13,3);P(g,[[-15,-5],[-10,-14],[9,-14],[15,-5]],2);B(g,-9,-12,8,6,0);B(g,2,-12,7,6,0);B(g,-4,-18,9,4,3);B(g,-17,-1,33,3,1);for(let x=-13;x<15;x+=6)B(g,x,0,3,2,3);wheels(g,42,9)};
Art.renderers.motorcycle=g=>{wheels(g,32,8);P(g,[[-11,5],[-3,-4],[8,-4],[13,5]],3);B(g,1,-14,6,6,3);B(g,-2,-7,9,6,2);B(g,10,-6,3,9,3)};
Art.renderers.truck=g=>{B(g,-39,-56,55,63,2);B(g,-37,-54,51,57,1);for(let x=-32;x<12;x+=7)B(g,x,-51,1,52,2);B(g,17,-27,20,34,3);B(g,20,-24,11,12,0);B(g,34,-5,5,12,2);wheels(g,78,9);B(g,-5,5,8,8,3)};
Art.renderers.icicle=g=>{P(g,[[-8,-13],[8,-13],[4,3],[0,15],[-4,4]],2);P(g,[[-5,-11],[0,-11],[0,9],[-2,1]],0)};
Art.renderers.can=g=>{B(g,-7,-9,14,18,3);B(g,-5,-7,10,14,1);B(g,-9,-11,18,3,2);B(g,-3,-14,6,3,3);B(g,-3,-5,1,11,2);B(g,2,-5,1,11,2)};
Art.renderers.banana=g=>{P(g,[[-1,-11],[3,-10],[3,-1],[12,5],[10,9],[0,4],[-10,9],[-13,6],[-4,-1]],3);P(g,[[-1,-7],[1,-6],[1,1],[9,6],[8,7],[0,3],[-9,7],[-10,6],[-2,0]],0)};
Art.renderers.tv=g=>{B(g,-13,-10,26,21,3);B(g,-11,-8,18,15,1);B(g,-9,-6,14,11,2);B(g,-7,-4,8,1,0);B(g,9,-5,2,2,0);B(g,9,0,2,2,0);B(g,-9,11,4,3,3);B(g,6,11,4,3,3);P(g,[[-4,-10],[-10,-17],[-8,-17],[0,-11],[8,-17],[10,-17],[4,-10]],3)};
Art.renderers.target=g=>{B(g,-8,-8,16,16,3);B(g,-6,-6,12,12,0);B(g,-4,-4,8,8,2);B(g,-2,-2,4,4,0)};
Art.renderers.scaffold=(g,o)=>{const w=o.width,h=o.height;B(g,0,0,w,h,3);B(g,1,1,w-2,3,0);for(let x=4;x<w;x+=12)B(g,x,5,5,2,1);g.strokeStyle=Palette[2];g.lineWidth=2;for(let x=5;x<w-20;x+=32){g.strokeRect(x,h,28,23);g.beginPath();g.moveTo(x,h);g.lineTo(x+28,h+23);g.moveTo(x+28,h);g.lineTo(x,h+23);g.stroke()}};
Art.renderers.wall=(g,o)=>{B(g,0,0,o.width,o.height,3);B(g,2,2,o.width-4,o.height-4,2);for(let y=5;y<o.height-2;y+=8)B(g,3,y,o.width-6,1,1)};
Art.renderers.crate=(g,o)=>{B(g,0,0,o.width,o.height,3);B(g,2,2,o.width-4,o.height-4,1);g.strokeStyle=Palette[3];g.beginPath();g.moveTo(3,3);g.lineTo(o.width-3,o.height-3);g.moveTo(o.width-3,3);g.lineTo(3,o.height-3);g.stroke()};
Art.renderers.mover=(g,o)=>{Art.renderers.wall(g,o);for(let y=5;y<o.height-4;y+=12)P(g,[[4,y],[o.width/2,y+5],[o.width-4,y],[o.width-4,y+4],[o.width/2,y+9],[4,y+4]],0)};

// Replace background keys with a full 480 × 270 PNG, anchor (0,0), or a renderer.
function cloud(g,x,y){Art.box(g,x,y,32,5,0);Art.box(g,x+7,y-6,18,8,0);Art.box(g,x+13,y-10,8,7,0)}
function city(g,w,h,t,icy=false){Art.box(g,0,0,w,h,0);for(let i=0;i<5;i++)cloud(g,((i*113-t*8)%(w+70)+w+70)%(w+70)-35,20+i%3*23);for(let layer=0;layer<2;layer++)for(let i=0;i<13;i++){const bw=36+(i*13)%25,bh=40+(i*29)%100,x=((i*53-t*(layer?11:4))%(w+100)+w+100)%(w+100)-60,y=h-bh;Art.box(g,x,y,bw,bh,layer?1:1);if(layer){Art.box(g,x,y,bw,3,icy?0:2);for(let q=0;q<3;q++)for(let j=0;j<8;j++)Art.box(g,x+6+q*10,y+8+j*13,3,5,2)}}if(icy)for(let i=0;i<40;i++)Art.box(g,(i*67)%w,(i*37+t*20)%h,1,2,1)}
function baseScene(g,w,h,t,m){city(g,w,h,t,m===1);if(m===0){const road=h===270?BALANCE.sky.roadY:h-30;Art.box(g,0,road-6,w,8,2);Art.box(g,0,road+2,w,h-road-2,3);Art.box(g,0,road+2,w,2,0);for(let x=-60;x<w+60;x+=60)Art.box(g,((x-t*70)%(w+60)+w+60)%(w+60)-30,h-11,27,2,1)}else if(m===1){Art.box(g,0,0,20,h,2);Art.box(g,w-20,0,20,h,2);for(let y=0;y<h;y+=16){Art.box(g,0,y,20,2,0);Art.box(g,w-20,y,20,2,0)}}else{Art.box(g,12,12,w-24,h-24,3);Art.box(g,20,20,w-40,h-40,0);for(let y=23;y<h-20;y+=16)for(let x=23;x<w-20;x+=22)Art.box(g,x,y,12,1,1)}}
const BACKGROUNDS=['skyBackground','peakBackground','rooftopBackground'];
BACKGROUNDS.forEach((key,m)=>Art.renderers[key]=(g,o)=>baseScene(g,o.width,o.height,o.time,m));
function scene(g,w,h,t,m){Art.draw(g,BACKGROUNDS[m],0,0,{width:w,height:h,time:t})}

Art.renderers.plane=(g,o)=>{ // Single-seat propeller plane: nose LEFT, tail RIGHT.
 B(g,-25,-4,45,10,3);P(g,[[-30,0],[-24,-4],[-24,6]],2);P(g,[[15,-3],[23,-14],[28,-14],[26,6],[15,6]],3);
 P(g,[[-10,-4],[-7,-13],[6,-13],[10,-4]],3);B(g,-6,-11,10,6,0);B(g,-3,-9,3,4,3);
 B(g,-13,-15,32,3,2);B(g,5,-12,2,12,2);P(g,[[-12,2],[8,2],[18,9],[-3,7]],2);
 B(g,-32,Math.floor((o.time||0)*15)%2?-12:-7,2,Math.floor((o.time||0)*15)%2?25:15,3);B(g,-30,-1,3,3,2);
 B(g,-12,7,2,5,3);B(g,7,7,2,5,3);B(g,-15,11,7,3,3);B(g,5,11,6,3,3)
};

Art.renderers.streetlight=g=>{B(g,-4,-100,8,100,3);B(g,-2,-96,2,94,1);B(g,-30,-100,34,6,3);B(g,-30,-94,18,6,2);B(g,-27,-93,12,3,0);B(g,-7,-4,14,4,3)};
Art.renderers.flowerpot=g=>{B(g,-11,-6,22,5,3);P(g,[[-9,-1],[9,-1],[6,11],[-6,11]],2);B(g,-4,0,2,8,0);B(g,-1,-17,2,11,3);P(g,[[0,-12],[-7,-17],[-8,-12],[-1,-8],[6,-18],[9,-14],[1,-8]],2)};
Art.renderers.shard=g=>{P(g,[[-4,-5],[4,-2],[0,5]],3);B(g,-1,-3,2,2,1)};
Art.renderers.drone=(g,o)=>{B(g,-10,-4,20,9,3);B(g,-6,-2,12,4,1);B(g,-2,1,4,5,3);B(g,-16,-3,7,3,2);B(g,9,-3,7,3,2);B(g,-20,-6,15,2,3);B(g,5,-6,15,2,3);if(Math.floor((o.time||0)*12)%2){B(g,-16,-8,7,1,2);B(g,9,-8,7,1,2)}B(g,-2,2,2,2,0)};

// New Sky sprites remain independently replaceable through overrides.js.
Art.renderers.planeShot=g=>{B(g,-6,-2,12,4,3);B(g,-8,-1,3,2,2);B(g,5,-1,3,2,0)};
Art.renderers.duck=(g,o)=>{
 // Small parachute, suspension cords, and the world's least concerned duck.
 P(g,[[-21,-27],[-17,-37],[-8,-43],[8,-43],[17,-37],[21,-27]],3);P(g,[[-17,-29],[-13,-36],[-6,-39],[6,-39],[13,-36],[17,-29]],1);B(g,-2,-40,4,12,2);
 g.strokeStyle=Palette[2];g.lineWidth=1;for(const x of [-19,0,19]){g.beginPath();g.moveTo(x,-27);g.lineTo(x<0?-6:6,-5);g.stroke()}
 B(g,-13,-2,22,11,3);B(g,-10,0,17,7,1);B(g,-3,2,9,5,2);B(g,4,-11,12,13,1);B(g,15,-5,9,4,3);B(g,5,-9,12,3,3);B(g,6,-7,4,3,3);B(g,12,-7,4,3,3);B(g,7,-8,2,1,0);B(g,-7,10,5,2,3);B(g,3,10,5,2,3)
};
Art.renderers.overpass=g=>{B(g,-23,0,6,65,3);B(g,17,0,6,65,3);B(g,-21,0,2,60,1);B(g,19,0,2,60,1);B(g,-36,61,72,47,3);B(g,-33,64,66,41,1);B(g,-30,67,60,35,3);B(g,-24,73,28,3,0);B(g,-24,80,20,2,1);P(g,[[13,90],[13,76],[8,81],[5,78],[15,69],[25,78],[22,81],[17,76],[17,90]],0);B(g,-22,91,9,3,0);B(g,-10,91,9,3,0)};
Art.renderers.falcon=g=>{P(g,[[16,-13],[10,-2],[17,2],[10,7],[3,2],[-10,12],[-7,3],[-16,3],[-6,-4],[0,-13],[3,-4]],3);P(g,[[2,-3],[-7,4],[3,3],[10,5]],2);B(g,-8,3,5,4,1);B(g,-9,5,2,1,3);P(g,[[-8,7],[-14,9],[-9,4]],3)};
Art.renderers.falconWarning=g=>{P(g,[[0,-11],[12,10],[-12,10]],3);B(g,-1,-4,3,8,0);B(g,-1,6,3,2,0);B(g,15,-2,9,2,3)};
