// Timers and star thresholds are seconds. Obstacles use top-left coordinates.
// Every level includes shielded targets marked bank:true: they require a bounce.
const wall=(x,y,w,h)=>({x,y,w,h,kind:'wall',hp:Infinity});
const crate=(x,y,w,h,hp=2)=>({x,y,w,h,kind:'crate',hp});
const mover=(x,y,w,h,amp=30,speed=1)=>({x,y,w,h,kind:'mover',hp:Infinity,amp,speed});
const target=(x,y,bank=false)=>({x,y,bank});
const LEVELS=[
 {name:'Around the corner',limit:40,stars:[12,24],targets:[target(350,75,true),target(400,185)],obstacles:[wall(230,80,22,145)]},
 {name:'Double bank',limit:40,stars:[13,25],targets:[target(355,60,true),target(400,145,true),target(330,215)],obstacles:[wall(235,66,22,154)]},
 {name:'Unpack the problem',limit:42,stars:[14,27],targets:[target(355,70,true),target(390,180,true),target(300,115)],obstacles:[wall(225,85,20,140),crate(280,91,40,48,3)]},
 {name:'Window of opportunity',limit:43,stars:[15,28],targets:[target(385,55,true),target(355,150,true),target(405,220)],obstacles:[mover(240,70,20,120,35,1.3),wall(320,100,18,95)]},
 {name:'Stacked against you',limit:45,stars:[17,30],targets:[target(360,55,true),target(400,120,true),target(355,210),target(290,175)],obstacles:[wall(220,85,20,145),crate(268,153,45,44,3),crate(336,33,48,44,3)]},
 {name:'Rush hour',limit:44,stars:[17,29],targets:[target(360,48,true),target(405,112,true),target(355,218,true),target(290,65)],obstacles:[mover(220,65,20,145,37,1.7),mover(320,100,18,90,47,1.1),crate(275,47,30,36,2)]},
 {name:'Heavy freight',limit:46,stars:[18,31],targets:[target(390,48,true),target(350,130,true),target(405,220,true),target(285,205),target(280,55)],obstacles:[wall(210,85,20,145),crate(325,105,49,50,4),mover(275,95,18,70,55,1.6)]},
 {name:'Moving day',limit:45,stars:[18,30],targets:[target(400,45,true),target(375,100,true),target(400,210,true),target(300,185),target(310,58)],obstacles:[mover(210,75,18,145,39,2),mover(325,80,18,110,40,1.7),crate(280,164,40,42,4)]},
 {name:'The narrow escape',limit:44,stars:[19,31],targets:[target(390,43,true),target(410,110,true),target(380,220,true),target(315,180,true),target(295,58)],obstacles:[wall(205,57,20,167),mover(265,85,18,95,48,2),crate(292,156,46,46,4),mover(350,100,18,80,53,1.8)]},
 {name:'Legend of the ledge',limit:45,stars:[20,32],targets:[target(405,43,true),target(398,112,true),target(400,221,true),target(315,52,true),target(310,208,true),target(350,150)],obstacles:[mover(205,65,20,155,36,2.3),mover(270,90,18,100,47,1.9),crate(328,128,44,44,5),crate(290,30,48,44,4),wall(355,72,18,48)]}
];
