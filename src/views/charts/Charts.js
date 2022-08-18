import {
  Camera,
} from 'pixi-game-camera/pixi-game-camera.js';
import gsap, { Expo } from "gsap";



import * as PIXI from "pixi.js";
import loop1 from "./loops/loop1.mp3"
import bomb1 from "./loops/bomb1.wav"
import playcard from "./loops/playcard.mp3"


import platform from "./platform.png";
import bg_start from "./bg-start.png";
import playBtn from "./play.png";
import shopBtn from "./shop.png";
import book from "./gui/1.png";
import book_1 from "./gui/1-1.png";
import axe from "./gui/2.png";
import pan from "./gui/3.png";
import star from "./gui/star.png";
import coin from "./gui/coin.png";
import hp1 from "./Bar/hp1.png";
import hp2 from "./Bar/hp2.png";
import hp3 from "./Bar/hp3.png";
import hp4 from "./Bar/hp4.png";
import hp5 from "./Bar/hp5.png";
import hp6 from "./Bar/hp6.png";
import hp7 from "./Bar/hp7.png";

import medal from './gui/equip.png'
import wind from './gui/wind.png'
import water from './gui/water.png'
import fire from './gui/fire.png'
import backcard from './gui/backcard.png'
import deck from './gui/deck.png'
import special from './gui/sp.png'

import initial from './gui/init.png'
import playerdraw from './gui/draw.png'
import win1 from './gui/1win.png'
import win2 from './gui/2win.png'
import result from './gui/result.png'
import aura from './gui/aura.png'

import _atk1 from './gui/attack1.png'
import _atk2 from './gui/attack2.png'
import _spell from './gui/spell.png'
import _defend from './gui/defend.png'

import left from "./gui/Lbtn.png"
import right from "./gui/Rbtn.png"

import Dleft from "./gui/Lbtn1.png"
import Dright from "./gui/Rbtn1.png"
import po_1 from "./gui/potion1.png"
import po_2 from "./gui/potion2.png"
import po_3 from "./gui/potion3.png"

import modal from "./gui/modal.png"


let app, player, enimy, mc;
let item_axe, item_fire, item_pan;
let bullets = [];
let Effects = [];
let bulletSpeed = 10;
var keyCode = [];
let frames = [];
let bg;
let frames_d = [];
let frames_mc = [];
let frames_back = [];
let frames_lazy = [];
let frames_lazyb = [];
let healing = [];
let attacked2 = [];
let attacked1 = [];
//ที่ตั้งเวลาไว้เยอะเพราะตอนให้กด start จะจับเวลาตลอดทำให้เกมส์อาจจะเริ่มไปก่อนที่ผู้เล่นจะกด start พอกด start จะจับเวลาใหม่
let time = 10000000;
let hp_b, hp_p;
let count = 0;
let basicText;
let win;
let hp_1, hp_2, hp_3, hp_4, hp_5, hp_6, hp_def;
let wt, fr, wd, dc, bc, dc2, sp, sp2;
let random = Math.floor(Math.random() * 3);
let p1_card1, p1_card2, p1_card3, p2_card1, p2_card2, p2_card3;
let p1_card1_status, p1_card2_status, p1_card3_status, p2_card1_status, p2_card2_status, p2_card3_status, p1_status, p2_status;
let win_1, win_2, initiate, draw;
let ready = "";
let attack, spell, defend, atk1, atk2, attack2, spell2, defend2, modal_1, modal_2;
let lbtn, rbtn, lbtn2, rbtn2, item_1, item_2;
let dlbtn, drbtn, dlbtn2, drbtn2, ditem_1, ditem_2;
let potion1, potion2, potion3;
let atkstatus = 0;
let bg_s, play, shop;


// mock up ชื่ออาวุธ
let name1 = 'Two Hand Axe';
let amount1 = 1;
let name2 = 'Holy Sword';
let amount2 = 4;
let name3 = 'Rusted Hammer';
let amount3 = 3;
let dname1 = 'Holy Water';
let damount1 = 3;
let dname2 = 'Sleep Water';
let damount2 = 2;
let dname3 = 'Heal Water';
let damount3 = 5;

//ตัว text ชื่ออาวุธ กับ จำนวนที่มี
let text1_1 ,text1_2 ,text2_1, text2_2 ;

//แถบ text ประกาศผล และข้อมูลหลังจบเกมส์
let resu, text, text_2, text_3, text_4, text_5, star1, star2, coin1, coin2;


function randomCard() {
  random = Math.floor(Math.random() * 3);
  return random;
}


window.onload = function () {
  app = new PIXI.Application(
    {
      width: 1500,
      height: 1000,
      backgroundColor: 0x000,
    }
  );
  document.body.appendChild(app.view);
  app.stage.interactive = true;


  //ตัวนำไฟล์ json อนิเมชั่นตัวละครเข้ามาในโปรแกรม ตำเข้าตรง Public/assests/icons
  app.loader
    .add("player", "assets/icons/raptor.json")
    .add("player-back", "assets/icons/raptor-back.json")
    .add("mc", "assets/icons/mc.json")
    .add("heal", "assets/icons/heal.json")
    .add("attacked", "assets/icons/attacked.json")
    .load(onAssetsLoaded)

  //ตั้งค่าพื้นหลัง
  bg = PIXI.Sprite.from(platform);
  bg.x = 50;
  bg.y = 50;
  app.stage.addChild(bg);


  // include the web-font loader script
  window.WebFontConfig = {
    google: {
      families: ['Otomanopee One', 'sans-serif']
    },
  };

  (function () {
    var wf = document.createElement('script');
    wf.src = (document.location.protocol === 'https:' ? 'https' : 'http')
      + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  }());

  //ตัวตั้งค่า style ต่าง ๆ ของ text
  let style = new PIXI.TextStyle({
    fontFamily: 'Otomanopee One',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#fc392b'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 8,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
    align: 'center',
  });


  let style2 = new PIXI.TextStyle({
    fontFamily: 'Otomanopee One',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#ff892e'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 8,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
    align: 'center',
  });

  let style3 = new PIXI.TextStyle({
    fontFamily: 'Otomanopee One',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#2eff58'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 8,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
    align: 'center',
  });

  let style4 = new PIXI.TextStyle({
    fontFamily: ['Arimo', 'sans-serif'],
    fontSize: 40,
    fill: ['#ffffff'],
    fontWeight: '700',
    boxShadow: "inset 0 2px 3px rgba(255,255,255,0.3), inset 0 -2px 3px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.9)",
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 2,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 3,
    wordWrap: true,
    wordWrapWidth: 400,
    lineJoin: 'round',
    align: 'center',
  });

  let style5 = new PIXI.TextStyle({
    fontFamily: ['Arimo', 'sans-serif'],
    fontSize: 18,
    fill: ['#ffffff'],
    fontWeight: '700',
    boxShadow: "inset 0 2px 3px rgba(255,255,255,0.3), inset 0 -2px 3px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.9)",
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 2,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 3,
    wordWrap: true,
    wordWrapWidth: 400,
    lineJoin: 'round',
    align: 'center',
  });

  let style7 = new PIXI.TextStyle({
    fontFamily: ['Arimo', 'sans-serif'],
    fontSize: 30,
    fill: ['green'], // gradient
    fontWeight: '700',
    stroke: '#ffffff',
    strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 400,
    lineJoin: 'round',
    align: 'center',
  });

  let style6 = new PIXI.TextStyle({
    fontFamily: ['Arimo', 'sans-serif'],
    fontSize: 30,
    fill: ['#000000'], // gradient
    fontWeight: '700',
    stroke: '#ffffff',
    strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 400,
    lineJoin: 'round',
    align: 'center',
  });

  //text แสดงหลังจบเกมส์ด้านบน ที่ไม่ได้อยู่ในตารางสรุปผล
  basicText = new PIXI.Text('Round 1', style);
  basicText.x = 660;
  basicText.y = 80;
  app.stage.addChild(basicText);
  basicText.visible = false;

  //กำหนด texture ที่จะใช้ก่อนที่จะเอาไปใส่ในการ์ด
  fr = new PIXI.Texture.from(fire);
  wt = new PIXI.Texture.from(water);
  wd = new PIXI.Texture.from(wind);
  bc = new PIXI.Texture.from(backcard);

  //การตั้งค่าเริ่มต้น และแสดงผล ให้กับการ์ดต่าง ๆ ของฝั่ง player ฝั่งซ้าย
  p1_card1 = new PIXI.Sprite.from(fr);
  p1_card1.x = 0;
  p1_card1.y = 500;
  p1_card1.width = 0;
  p1_card1.height = 0;
  p1_card1.buttonMode = true;
  p1_card1.interactive = true;
  p1_card1.on("mouseover", inCard);
  p1_card1.on("mouseout", outCard);
  p1_card1.on("pointerdown", clickCard1);
  p1_card1.tint = 0x595959;
  app.stage.addChild(p1_card1);

  p1_card2 = new PIXI.Sprite.from(wt);
  p1_card2.x = 0;
  p1_card2.y = 500;
  p1_card2.width = 0;
  p1_card2.height = 0;
  p1_card2.buttonMode = true;
  p1_card2.interactive = true;
  p1_card2.on("mouseover", inCard);
  p1_card2.on("mouseout", outCard);
  p1_card2.on("pointerdown", clickCard2);
  p1_card2.tint = 0x595959;
  app.stage.addChild(p1_card2);

  p1_card3 = new PIXI.Sprite.from(wd);
  p1_card3.x = 0;
  p1_card3.y = 500;
  p1_card3.width = 0;
  p1_card3.height = 0;
  p1_card3.buttonMode = true;
  p1_card3.interactive = true;
  p1_card3.on("mouseover", inCard);
  p1_card3.on("mouseout", outCard);
  p1_card3.on("pointerdown", clickCard3);
  p1_card3.tint = 0x595959;
  app.stage.addChild(p1_card3);

  p1_card1.visible = false;
  p1_card2.visible = false;
  p1_card3.visible = false;

  //ไอคอนหนังสือตรงมุมของทั้งสองฝ่ายเป็นสำรับไพ่
  dc = new PIXI.Sprite.from(deck);
  dc.x = 70;
  dc.y = 500;
  dc.scale.set(0.1);
  dc.interactive = true;
  dc.buttonMode = true;
  dc.on("pointerdown", dcdown);
  app.stage.addChild(dc);

  dc2 = new PIXI.Sprite.from(deck);
  dc2.x = 1270;
  dc2.y = 500;
  dc2.scale.set(0.1);
  dc2.interactive = true;
  dc2.buttonMode = true;
  dc2.on("pointerdown", dc2down);
  app.stage.addChild(dc2);

  //แถบพลังพิเศษของผู้เล่นอยู่ใต้พลังชีวิต
  sp = new PIXI.Sprite.from(special);
  sp.x = 110;
  sp.y = 140;
  sp.scale.set(0.1);
  sp.width = 350;
  app.stage.addChild(sp);

  sp2 = new PIXI.Sprite.from(special);
  sp2.x = 910;
  sp2.y = 140;
  sp2.scale.set(0.1);
  sp2.width = 350;
  app.stage.addChild(sp2);


  //การตั้งค่าเริ่มต้น และแสดงผล ให้กับการ์ดต่าง ๆ ของฝั่ง enimy ฝั่งขวา
  p2_card1 = new PIXI.Sprite.from(bc);
  p2_card1.x = 1250;
  p2_card1.y = 500;
  p2_card1.width = 0;
  p2_card1.height = 0;
  p2_card1.buttonMode = true;
  p2_card1.interactive = true;
  p2_card1.on("mouseover", inCard);
  p2_card1.on("mouseout", outCard);
  p2_card1.on("pointerdown", clickCard21);
  p2_card1.tint = 0x595959;
  app.stage.addChild(p2_card1);

  p2_card2 = new PIXI.Sprite.from(bc);
  p2_card2.x = 1250;
  p2_card2.y = 500;
  p2_card2.width = 0;
  p2_card2.height = 0;
  p2_card2.buttonMode = true;
  p2_card2.interactive = true;
  p2_card2.on("mouseover", inCard);
  p2_card2.on("mouseout", outCard);
  p2_card2.on("pointerdown", clickCard22);
  p2_card2.tint = 0x595959;
  app.stage.addChild(p2_card2);

  p2_card3 = new PIXI.Sprite.from(bc);
  p2_card3.x = 1250;
  p2_card3.y = 500;
  p2_card3.width = 0;
  p2_card3.height = 0;
  p2_card3.buttonMode = true;
  p2_card3.interactive = true;
  p2_card3.on("mouseover", inCard);
  p2_card3.on("mouseout", outCard);
  p2_card3.on("pointerdown", clickCard23);
  p2_card3.tint = 0x595959;
  app.stage.addChild(p2_card3);

  p2_card1.visible = false;
  p2_card2.visible = false;
  p2_card3.visible = false;

  //texture เลือดของผู้เล่น
  hp_def = new PIXI.Texture.from(hp1);
  hp_1 = new PIXI.Texture.from(hp2);
  hp_2 = new PIXI.Texture.from(hp3);
  hp_3 = new PIXI.Texture.from(hp4);
  hp_4 = new PIXI.Texture.from(hp5);
  hp_5 = new PIXI.Texture.from(hp6);
  hp_6 = new PIXI.Texture.from(hp7);

  //แถบเลือดของทั้งสองฝั่ง
  hp_p = new PIXI.Sprite.from(hp1);
  hp_p.scale.set(0.06);
  hp_p.x = 100
  hp_p.y = 70;

  hp_b = new PIXI.Sprite.from(hp1);
  hp_b.scale.set(0.06);
  hp_b.x = 900
  hp_b.y = 70;

  app.stage.addChild(hp_b);
  app.stage.addChild(hp_p);

  //การตั้งค่าให้กับแถบประกาศผลผู้ชนะหลังจากจบแต่ละเทิร์น
  initiate = new PIXI.Texture.from(initial);
  win_1 = new PIXI.Texture.from(win1);
  win_2 = new PIXI.Texture.from(win2);
  draw = new PIXI.Texture.from(playerdraw);

  win = new PIXI.Sprite.from(initiate);
  win.x = 450;
  win.y = 150;
  win.scale.set(0.5);
  app.stage.addChild(win);

  // texture ปุ่มโจมตี
  atk1 = new PIXI.Texture.from(_atk1);
  atk2 = new PIXI.Texture.from(_atk2);

  //แถบโจมตี (attack) การใช้เวทย์มนตร์(spell) การใช้ยา (defend) ของผู้เล่นทั้งสองฝ่าย
  attack = new PIXI.Sprite.from(atk2);
  attack.x = 100;
  attack.y = 270;
  attack.scale.set(0.1);
  attack.interactive = true;
  attack.visible = false
  attack.buttonMode = true;
  attack.on("pointerdown", attack_1);
  attack.on("mouseover", () => mouseIn(attack, 270))
  attack.on("mouseout", () => mouseOff(attack, 270))
  app.stage.addChild(attack);

  spell = new PIXI.Sprite.from(_spell);
  spell.x = 180;
  spell.y = 265;
  spell.scale.set(0.06);
  spell.interactive = true;
  spell.visible = false
  spell.buttonMode = true;
  spell.on("mouseover", () => mouseIn(spell, 265))
  spell.on("mouseout", () => mouseOff(spell, 265))
  app.stage.addChild(spell);

  defend = new PIXI.Sprite.from(_defend);
  defend.x = 260;
  defend.y = 260;
  defend.scale.set(0.1);
  defend.interactive = true;
  defend.visible = false
  defend.buttonMode = true;
  defend.on("pointerdown", defend_1);
  defend.on("mouseover", () => mouseIn(defend, 260))
  defend.on("mouseout", () => mouseOff(defend, 260))
  app.stage.addChild(defend);

  attack2 = new PIXI.Sprite.from(atk2);
  attack2.x = 1000;
  attack2.y = 270;
  attack2.scale.set(0.1);
  attack2.interactive = true;
  attack2.visible = false
  attack2.buttonMode = true;
  attack2.on("pointerdown", attack_2);
  attack2.on("mouseover", () => mouseIn(attack2, 270))
  attack2.on("mouseout", () => mouseOff(attack2, 270))
  app.stage.addChild(attack2);

  spell2 = new PIXI.Sprite.from(_spell);
  spell2.x = 1080;
  spell2.y = 265;
  spell2.scale.set(0.06);
  spell2.interactive = true;
  spell2.visible = false;
  spell2.buttonMode = true;
  spell2.on("mouseover", () => mouseIn(spell2, 265))
  spell2.on("mouseout", () => mouseOff(spell2, 265))
  app.stage.addChild(spell2);

  defend2 = new PIXI.Sprite.from(_defend);
  defend2.x = 1160;
  defend2.y = 260;
  defend2.scale.set(0.1);
  defend2.interactive = true;
  defend2.visible = false;
  defend2.on("pointerdown", defend_2);
  defend2.on("mouseover", () => mouseIn(defend2, 260))
  defend2.on("mouseout", () => mouseOff(defend2, 260))
  defend2.buttonMode = true;
  app.stage.addChild(defend2);

  //แถบหลังจากกดปุ่มโจมตี หรือใช้ยาจะมี modal อันนี้เด้งขึ้นมา
  modal_1 = new PIXI.Sprite.from(modal);
  modal_1.x = 80;
  modal_1.y = 160;
  modal_1.scale.set(0.8);
  modal_1.interactive = true;
  modal_1.visible = false;
  modal_1.buttonMode = true;
  app.stage.addChild(modal_1);

  modal_2 = new PIXI.Sprite.from(modal);
  modal_2.x = 950;
  modal_2.y = 160;
  modal_2.scale.set(0.8);
  modal_2.interactive = true;
  modal_2.visible = false;
  modal_2.buttonMode = true;
  app.stage.addChild(modal_2);

  //texture เริ่มต้นของอาวุธต่าง ๆ
  item_axe = new PIXI.Texture.from(axe);
  item_fire = new PIXI.Texture.from(book);
  item_pan = new PIXI.Texture.from(pan);

  //แถบแสดงผลการเลือกอาวุธ ปุ่มซ้าย ขวา
  lbtn = new PIXI.Sprite.from(left);
  lbtn.x = 100;
  lbtn.y = 320;
  lbtn.scale.set(0.09);
  lbtn.interactive = true;
  lbtn.on("pointerdown", left_1);
  lbtn.buttonMode = true;

  item_1 = new PIXI.Sprite.from(item_fire);
  item_1.x = 200;
  item_1.y = 300;
  item_1.scale.set(0.06);
  item_1.on("pointerdown", selected1);
  item_1.interactive = true;
  item_1.buttonMode = true;
  text1_1 = new PIXI.Text(name1, style2);
  text1_1.x = 150;
  text1_1.y = 240;
  text1_2 = new PIXI.Text("X   " + amount1, style3);
  text1_2.x = 200;
  text1_2.y = 460;

  rbtn = new PIXI.Sprite.from(right);
  rbtn.x = 340;
  rbtn.y = 320;
  rbtn.scale.set(0.09);
  rbtn.interactive = true;
  rbtn.on("pointerdown", right_1);
  rbtn.buttonMode = true;

  rbtn.visible = false;
  lbtn.visible = false;
  item_1.visible = false;
  text1_1.visible = false;
  text1_2.visible = false;

  app.stage.addChild(text1_1);
  app.stage.addChild(text1_2);
  app.stage.addChild(rbtn);
  app.stage.addChild(lbtn);
  app.stage.addChild(item_1);

  //แถบแสดงผลการเลือกอาวุธ ปุ่มซ้าย ขวา
  lbtn2 = new PIXI.Sprite.from(left);
  lbtn2.x = 960;
  lbtn2.y = 320;
  lbtn2.scale.set(0.09);
  lbtn2.interactive = true;
  lbtn2.on("pointerdown", left_2);
  lbtn2.buttonMode = true;

  item_2 = new PIXI.Sprite.from(item_fire);
  item_2.x = 1060;
  item_2.y = 300;
  item_2.scale.set(0.06);
  item_2.on("pointerdown", selected2);
  item_2.interactive = true;
  item_2.buttonMode = true;
  text2_1 = new PIXI.Text(name1, style2);
  text2_1.x = 1010;
  text2_1.y = 240;
  text2_2 = new PIXI.Text("X   " + amount1, style3);
  text2_2.x = 1060;
  text2_2.y = 460;

  rbtn2 = new PIXI.Sprite.from(right);
  rbtn2.x = 1200;
  rbtn2.y = 320;
  rbtn2.scale.set(0.09);
  rbtn2.on("pointerdown", right_2);
  rbtn2.interactive = true;
  rbtn2.buttonMode = true;

  rbtn2.visible = false;
  lbtn2.visible = false;
  item_2.visible = false;
  text2_1.visible = false;
  text2_2.visible = false;

  app.stage.addChild(text2_1);
  app.stage.addChild(text2_2);
  app.stage.addChild(rbtn2);
  app.stage.addChild(lbtn2);
  app.stage.addChild(item_2);

  //texture ยาต่าง ๆ
  potion1 = new PIXI.Texture.from(po_1);
  potion2 = new PIXI.Texture.from(po_2);
  potion3 = new PIXI.Texture.from(po_3);

  //แถบแสดงผลการเลือกยา ปุ่มซ้าย ขวา
  dlbtn = new PIXI.Sprite.from(Dleft);
  dlbtn.x = 100;
  dlbtn.y = 320;
  dlbtn.scale.set(0.09);
  dlbtn.interactive = true;
  dlbtn.on("pointerdown", dleft_1);
  dlbtn.buttonMode = true;

  ditem_1 = new PIXI.Sprite.from(potion1);
  ditem_1.x = 220;
  ditem_1.y = 300;
  ditem_1.scale.set(0.3);
  ditem_1.on("pointerdown", dselected1);
  ditem_1.interactive = true;
  ditem_1.buttonMode = true;

  drbtn = new PIXI.Sprite.from(Dright);
  drbtn.x = 340;
  drbtn.y = 320;
  drbtn.scale.set(0.09);
  drbtn.interactive = true;
  drbtn.on("pointerdown", dright_1);
  drbtn.buttonMode = true;

  drbtn.visible = false;
  dlbtn.visible = false;
  ditem_1.visible = false;

  app.stage.addChild(drbtn);
  app.stage.addChild(dlbtn);
  app.stage.addChild(ditem_1);

  //แถบแสดงผลการเลือกยา ปุ่มซ้าย ขวา
  dlbtn2 = new PIXI.Sprite.from(Dleft);
  dlbtn2.x = 960;
  dlbtn2.y = 320;
  dlbtn2.scale.set(0.09);
  dlbtn2.interactive = true;
  dlbtn2.on("pointerdown", dleft_2);
  dlbtn2.buttonMode = true;

  ditem_2 = new PIXI.Sprite.from(potion1);
  ditem_2.x = 1080;
  ditem_2.y = 300;
  ditem_2.scale.set(0.3);
  ditem_2.on("pointerdown", dselected2);
  ditem_2.interactive = true;
  ditem_2.buttonMode = true;

  drbtn2 = new PIXI.Sprite.from(Dright);
  drbtn2.x = 1200;
  drbtn2.y = 320;
  drbtn2.scale.set(0.09);
  drbtn2.on("pointerdown", dright_2);
  drbtn2.interactive = true;
  drbtn2.buttonMode = true;

  drbtn2.visible = false;
  dlbtn2.visible = false;
  ditem_2.visible = false;

  app.stage.addChild(drbtn2);
  app.stage.addChild(dlbtn2);
  app.stage.addChild(ditem_2);

  //ฟังก์ชันนับเวลาถอยหลัง
  setInterval(function () {
    if (time > 0) {
      time = time - 1;
      basicText.text = time;
      ready = 1;
    }
  }, 1000);

  //ตั้งค่าเริ่มต้น ตารางสรุปผลหลังจบการแข่งและองค์ประกอบ text ต่าง ๆ
  resu = PIXI.Sprite.from(result);
  resu.x = 520;
  resu.y = 140;
  resu.scale.set(0.16);
  app.stage.addChild(resu);
  resu.visible = false;

  text = new PIXI.Text('YOU WIN', style4);
  text.x = 590;
  text.y = 260;
  app.stage.addChild(text);
  text.visible = false;

  star1 = PIXI.Sprite.from(star);
  star1.x = 550;
  star1.y = 260;
  star1.scale.set(0.08);
  app.stage.addChild(star1);
  star1.visible = false;

  star2 = PIXI.Sprite.from(star);
  star2.x = 768;
  star2.y = 260;
  star2.scale.set(0.08);
  app.stage.addChild(star2);
  star2.visible = false;

  text_2 = new PIXI.Text('REWARD', style5);
  text_2.x = 640;
  text_2.y = 320;
  app.stage.addChild(text_2);
  text_2.visible = false;

  text_3 = new PIXI.Text('+20', style7);
  text_3.x = 650;
  text_3.y = 340;
  app.stage.addChild(text_3);
  text_3.visible = false;

  coin1 = PIXI.Sprite.from(coin);
  coin1.x = 600;
  coin1.y = 340;
  coin1.scale.set(0.08);
  app.stage.addChild(coin1);
  coin1.visible = false;

  text_4 = new PIXI.Text('YOUR COIN', style5);
  text_4.x = 630;
  text_4.y = 400;
  app.stage.addChild(text_4);
  text_4.visible = false;

  text_5 = new PIXI.Text('1020', style6);
  text_5.x = 650;
  text_5.y = 420;
  app.stage.addChild(text_5);
  text_5.visible = false;

  coin2 = PIXI.Sprite.from(coin);
  coin2.x = 600;
  coin2.y = 420;
  coin2.scale.set(0.08);
  app.stage.addChild(coin2);
  coin2.visible = false;

  //หน้าแสดงผลตอนก่อนกดเริ่มเกม
  bg_s = PIXI.Sprite.from(bg_start);
  bg_s.x = 50;
  bg_s.y = 50;
  bg_s.width = 1280;
  bg_s.height = 500;
  app.stage.addChild(bg_s);

  play = PIXI.Sprite.from(playBtn);
  play.x = 450;
  play.y = 380;
  play.scale.set(0.25);
  app.stage.addChild(play);
  play.interactive = true;
  play.on("mouseover", () => { play.tint = 0xffffff });
  play.on("mouseout", () => { play.tint = 0xebebeb });
  play.on("pointerdown", start);
  play.tint = 0xebebeb;
  play.buttonMode = true;

  shop = PIXI.Sprite.from(shopBtn);
  shop.x = 700;
  shop.y = 380;
  shop.scale.set(0.25);
  app.stage.addChild(shop);
  shop.interactive = true;
  shop.on("mouseover", () => { shop.tint = 0xffffff });
  shop.on("mouseout", () => { shop.tint = 0xebebeb });
  shop.on("pointerdown", () => { });
  shop.tint = 0xebebeb;
  shop.buttonMode = true;

}

//ฟังก์ชั่นเรื่มต้นหลังกดปุ่ม start
var times = 3
function start() {
  var audio = new Audio(loop1);
  audio.play();
  audio.volume = 0.0;
  audio.loop = 1;

  var loop = setInterval(repeat, 600);
  function repeat() {
    times--;
    if (times === 0) {
      clearInterval(loop);
    }

    var audio2 = new Audio(playcard);
    audio2.play();
    audio2.volume = 1;

  }
  enimy.textures = attacked2;
  enimy.scale.set(0.25);
  enimy.loop = false;
  enimy.animationSpeed = 0.6;
  enimy.play()

  setTimeout(function () {
    enimy.textures = frames_d;
    enimy.scale.set(0.5);
    enimy.loop = true;
    enimy.play()
    enimy.animationSpeed = 0.8;

  }, 100);

  //ตั้งค่าแจกการ์ดตอนเริ่มเกม
  setTimeout(function () {
    dcdown();
    dc2down();
  }, 1000);
  play.visible = false;
  shop.visible = false;
  player.visible = true;
  enimy.visible = true;
  basicText.visible = true;
  time = 10;

  //อนิเมชั่นการ์ด ฝั่งผู้เล่น
  const wiggleTween = new gsap.timeline({ paused: true })
    .to(bg_s, { duration: 0.5, y: -500, ease: "rough" })
    .to(p1_card1, { duration: 0.5, x: 100, y: 220, width: 80, height: 100, ease: "slow" })
    .to(p1_card2, { duration: 0.5, x: 200, y: 220, width: 80, height: 100, ease: "slow" })
    .to(p1_card3, { duration: 0.5, x: 300, y: 220, width: 80, height: 100, ease: "slow" })
    ;
  wiggleTween.restart();

  //อนิเมชั่นการ์ด ฝั่งศัตรู
  const wiggleTween1 = new gsap.timeline({ paused: true })
    .to(bg_s, { duration: 0.5, y: -500, ease: "rough", stagger: 0.1 })
    .to(p2_card3, { duration: 0.5, x: 1150, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    .to(p2_card2, { duration: 0.5, x: 1050, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    .to(p2_card1, { duration: 0.5, x: 950, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    ;
  wiggleTween1.restart();
}

//ฟังก์ชั่นเวลาเอาเมาส์ไปชี้ที่ปุ่มต่าง ๆ โจมตี ใช้ยา ใช้เวทย์มนตร์
let mouse;
function mouseIn(mo, value) {
  mouse = new gsap.timeline({ paused: true })
  mouse.to(mo, { duration: 0.5, y: value - 15, yoyo: true, ease: "rough", stagger: 0.1, repeat: -1 });
  mouse.to(mo, { duration: 0.5, y: value, yoyo: true, ease: "rough", stagger: 0.1, repeat: -1 });
  mouse.restart();
}

function mouseOff(mo, value) {
  mo.y = value;
  mouse.pause();
}

let hl, au, au2;
function onAssetsLoaded() {
  //walk

  for (let i = 0; i < 65; i++) {
    if (i < 10) {
      frames.push(PIXI.Texture.from(`raptor-pro-walk_0${i}.png`));
    }
    else {
      frames.push(PIXI.Texture.from(`raptor-pro-walk_${i}.png`));
    }
  }

  //enimy
  for (let i = 0; i < 31; i++) {
    if (i < 10) {
      frames_d.push(PIXI.Texture.from(`dragon-ess-flying_0${i}.png`));
    }
    else {
      frames_d.push(PIXI.Texture.from(`dragon-ess-flying_${i}.png`));
    }
  }

  //explode
  for (let i = 0; i < 28; i++) {
    frames_mc.push(PIXI.Texture.from(`Explosion_Sequence_A ${i}.png`));
  }

  //healing
  for (let i = 1; i < 21; i++) {
    healing.push(PIXI.Texture.from(`B${i}.png`));
  }

  //walk-back
  for (let i = 0; i < 12; i++) {
    if (i < 10) {
      frames_back.push(PIXI.Texture.from(`raptor-pro-walk_0${i} - Copy.png`));
    }
    else {
      frames_back.push(PIXI.Texture.from(`raptor-pro-walk_${i} - Copy.png`));
    }
  }
  //lazy
  for (let i = 0; i < 21; i++) {
    if (i < 10) {
      frames_lazy.push(PIXI.Texture.from(`raptor-pro-roar_0${i}.png`));
    }
    else {
      frames_lazy.push(PIXI.Texture.from(`raptor-pro-roar_${i}.png`));
    }
  }
  for (let i = 0; i < 21; i++) {
    if (i < 10) {
      frames_lazyb.push(PIXI.Texture.from(`raptor-pro-roar_0${i} - Copy.png`));
    }
    else {
      frames_lazyb.push(PIXI.Texture.from(`raptor-pro-roar_${i} - Copy.png`));
    }
  }
  // being attacked
  for (let i = 0; i < 18; i++) {
    if (i < 10) {
      attacked2.push(PIXI.Texture.from(`d_0${i}.png`));
    }
    else {
      attacked2.push(PIXI.Texture.from(`d_${i}.png`));
    }
  }
  for (let i = 4; i < 14; i++) {
    if (i < 10) {
      attacked1.push(PIXI.Texture.from(`dra_0${i}.png`));
    }
    else {
      attacked1.push(PIXI.Texture.from(`dra_${i}.png`));
    }
  }


  const camera = new Camera();
  player = new PIXI.AnimatedSprite(frames_lazy);
  player.x = 70;
  player.y = 320;
  player.scale.set(0.3);
  player.visible = false;
  player.animationSpeed = 0.25;
  player.play()

  enimy = new PIXI.AnimatedSprite(frames_d);
  enimy.x = 1000;
  enimy.y = 300;
  enimy.scale.set(0.5);
  enimy.interactive = true;
  enimy.buttonMode = true;
  // enimy.on("pointerdown", reset);
  enimy.animationSpeed = 0.8;
  enimy.visible = false;
  enimy.play();
  //

  app.stage.addChild(enimy);
  app.stage.addChild(player);

  au = PIXI.Sprite.from(aura);
  au.x = 130;
  au.y = 320;
  au.scale.set(0.3);
  au.visible = false;
  app.stage.addChild(au);

  au2 = PIXI.Sprite.from(aura);
  au2.x = 1005;
  au2.y = 310;
  au2.scale.set(0.35);
  au2.visible = false;
  app.stage.addChild(au2);



  // const mildShake = new Shake(enimy, 3, 5000);
  // camera.effect(mildShake);
  app.ticker.add(gameLoop);
}

//ฟังก์ชั่นเวลากดใช้อาวุธ
function selected1() {
  var audio = new Audio(bomb1);
  audio.play();
  audio.volume = 0.2;
  audio.currentTime = 0.7;

  //การเพิ่มลดอีกฝั่งหลังจากใช้อาวุธ
  atkstatus += 1;
  damage2 += 1;
  fireBullet(1, item_1.texture);
  setTimeout(function () {
    au2.visible = false
    updateHp2(damage2);
    enimy.textures = attacked2;
    enimy.scale.set(0.26);
    enimy.loop = false;
    enimy.animationSpeed = 0.5;
    enimy.play()
  }, 1350);

  //แสดงผลการโดนโจมตีของฝั่งตรงข้าม
  setTimeout(function () {
    enimy.textures = frames_d;
    enimy.scale.set(0.5);
    enimy.loop = true;
    enimy.play()
    enimy.animationSpeed = 0.8;

  }, 2050);


  rbtn.visible = false;
  lbtn.visible = false;
  item_1.visible = false;
  modal_1.visible = false;
  player.visible = true;
  attack.visible = false;
  spell.visible = false;
  text1_1.visible = false;
  text1_2.visible = false;
}

//ฟังก์ชั่นแสดงผลเลือดลด เพื่ม
function updateHp1(damage1) {
  if (damage1 < 0) {
    damage1 = 0;
  }
  console.log(damage1);
  if (damage1 == 0) {
    hp_p.texture = hp_def;
  }
  else if (damage1 == 1) {
    hp_p.texture = hp_1;
  }
  else if (damage1 == 2) {
    hp_p.texture = hp_2;
  }
  else if (damage1 == 3) {
    hp_p.texture = hp_3;
  }
  else if (damage1 == 4) {
    hp_p.texture = hp_4;
  }
  else if (damage1 == 5) {
    hp_p.texture = hp_5;
  }
  else if (damage1 == 6) {
    hp_p.texture = hp_6;
  }
}

//ฟังก์ชั่นแสดงผลเลือดลด เพื่ม
function updateHp2(damage2) {
  if (damage2 < 0) {
    damage2 = 0;
  }
  console.log(damage2);
  if (damage2 == 0) {
    hp_b.texture = hp_def;
  }
  else if (damage2 == 1) {
    hp_b.texture = hp_1;
  }
  else if (damage2 == 2) {
    hp_b.texture = hp_2;
  }
  else if (damage2 == 3) {
    hp_b.texture = hp_3;
  }
  else if (damage2 == 4) {
    hp_b.texture = hp_4;
  }
  else if (damage2 == 5) {
    hp_b.texture = hp_5;
  }
  else if (damage2 == 6) {
    hp_b.texture = hp_6;
  }
}

//ฟังก์ชั่นเวลากดใช้อาวุธ
function selected2() {
  var audio = new Audio(bomb1);
  audio.play();
  audio.volume = 0.2;
  audio.currentTime = 0.7;

  //การเพิ่มลดอีกฝั่งหลังจากใช้อาวุธ
  damage1 += 1;
  atkstatus += 1;
  fireBullet(2, item_2.texture);
  setTimeout(function () {
    updateHp1(damage1);
    au.visible = false
    player.textures = attacked1;
    player.scale.set(0.15);
    player.animationSpeed = 0.25;
    player.loop = false;
    player.play()

  }, 1450);

  //แสดงผลการโดนโจมตีของฝั่งตรงข้าม
  setTimeout(function () {
    player.textures = frames_lazy;
    player.scale.set(0.3);
    player.loop = true;
    player.play()
    player.animationSpeed = 0.2;
  }, 1850);

  rbtn2.visible = false;
  lbtn2.visible = false;
  item_2.visible = false;
  modal_2.visible = false;
  enimy.visible = true;
  attack2.visible = false;
  spell2.visible = false;
  text2_1.visible = false;
  text2_2.visible = false;

}

//ฟังก์ชันหลังกดปุ่มโจมตี
function attack_1() {
  rbtn.visible = true;
  lbtn.visible = true;
  item_1.visible = true;
  modal_1.visible = true;
  player.visible = false;
  text1_1.visible = true;
  text1_2.visible = true;
  r = 0;
  text1_1.text = name1;
  text1_2.text = "X   " + amount1;
  text1_1.x = 140;

}

function attack_2() {
  rbtn2.visible = true;
  lbtn2.visible = true;
  item_2.visible = true;
  modal_2.visible = true;
  enimy.visible = false;
  text2_1.visible = true;
  text2_2.visible = true;
  r2 = 0;
  text2_1.text = name1;
  text2_2.text = "X   " + amount1;
  text2_1.x = 1000;
}

//ฟังก์ชันหลังกดปุ่มเลือกยา
function defend_1() {
  drbtn.visible = true;
  dlbtn.visible = true;
  ditem_1.visible = true;
  modal_1.visible = true;
  player.visible = false;
  text1_1.visible = true;
  text1_2.visible = true;
  dr = 0;
  text1_1.text = dname1;
  text1_1.x = 150;
  text1_2.text = "X   " + damount1;
}

function defend_2() {
  drbtn2.visible = true;
  dlbtn2.visible = true;
  ditem_2.visible = true;
  modal_2.visible = true;
  enimy.visible = false;
  text2_1.visible = true;
  text2_2.visible = true;
  dr2 = 0;
  text2_1.text = dname1;
  text2_1.x = 1010;
  text2_2.text = "X   " + damount1;
}

//ฟังก์ชันปุ่มเลื่อนซ้ายขวาของอาวุธ
let r = 0;
function left_1() {
  r -= 1;
  const wiggleTween = new gsap.timeline({ paused: true })
  wiggleTween.from(item_1, { duration: 0.1, x: "200", ease: "rough" });
  wiggleTween.to(item_1, { duration: 0.1, x: "150", ease: "rough" });
  wiggleTween.restart();
  setTimeout(function () {
    const wiggleTween1 = new gsap.timeline({ paused: true })
    if (r <= -1) {
      r = 2;
      if (r == 0) {
        item_1.texture = item_fire;
        text1_1.text = name1;
        text1_1.x = 105;
        text1_2.text = "X   " + amount1;
        item_1.x = 250;
        wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
      }
      else if (r == 1) {
        item_1.texture = item_pan;
        text1_1.text = name2;
        text1_1.x = 150;
        text1_2.text = "X   " + amount2;
        item_1.x = 250;
        wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
      }
      else if (r == 2) {
        item_1.texture = item_axe;
        text1_1.text = name3;
        text1_1.x = 110;
        text1_2.text = "X   " + amount3;
        item_1.x = 250;
        wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
      }
    }
    else {
      if (r == 0) {
        item_1.texture = item_fire;
        text1_1.text = name1;
        text1_1.x = 108;
        text1_2.text = "X   " + amount1;
        item_1.x = 250;
        wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
      }
      else if (r == 1) {
        item_1.texture = item_pan;
        text1_1.text = name2;
        text1_1.x = 150;
        text1_2.text = "X   " + amount2;
        item_1.x = 250;
        wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
      }
      else if (r == 2) {
        item_1.texture = item_axe;
        text1_1.text = name3;
        text1_1.x = 110;
        text1_2.text = "X   " + amount3;
        item_1.x = 250;
        wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
      }
    }
    wiggleTween1.restart();
  }, 300);

}

function right_1() {
  const wiggleTween = new gsap.timeline({ paused: true })
  wiggleTween.from(item_1, { duration: 0.1, x: "200", ease: "rough" });
  wiggleTween.to(item_1, { duration: 0.1, x: "250", ease: "rough" });
  wiggleTween.restart();
  r += 1;
  if (r >= 3) {
    r = 0;
  }
  setTimeout(function () {
    const wiggleTween1 = new gsap.timeline({ paused: true })
    if (r == 0) {
      item_1.texture = item_fire;
      text1_1.text = name1;
      text1_1.x = 108;
      text1_2.text = "X   " + amount1;
      item_1.x = 150;
      wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });

    }
    else if (r == 1) {
      item_1.texture = item_pan;
      text1_1.text = name2;
      text1_1.x = 150;
      text1_2.text = "X   " + amount2;
      item_1.x = 150;
      wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });

    }
    else if (r == 2) {
      item_1.texture = item_axe;
      text1_1.text = name3;
      text1_1.x = 110;
      text1_2.text = "X   " + amount3;
      item_1.x = 150;
      wiggleTween1.to(item_1, { duration: 0.4, x: "200", ease: "back.out" });
    }
    wiggleTween1.restart();
  }, 300);

}

let r2 = 0;
function right_2() {
  const wiggleTween = new gsap.timeline({ paused: true })
  wiggleTween.from(item_2, { duration: 0.1, x: "1060", ease: "rough" });
  wiggleTween.to(item_2, { duration: 0.1, x: "1110", ease: "rough" });
  wiggleTween.restart();
  r2 += 1;
  if (r2 >= 3) {
    r2 = 0;
  }
  setTimeout(function () {
    const wiggleTween1 = new gsap.timeline({ paused: true })
    if (r2 == 0) {
      item_2.texture = item_fire;
      text2_1.text = name1;
      text2_1.x = 1000;
      text2_2.text = "X   " + amount1;
      item_2.x = 1010;
      wiggleTween1.to(item_2, { duration: 0.4, x: "1060", ease: "back.out" });

    }
    else if (r2 == 1) {
      item_2.texture = item_pan;
      text2_1.text = name2;
      text2_1.x = 1010;
      text2_2.text = "X   " + amount2;
      item_2.x = 1010;
      wiggleTween1.to(item_2, { duration: 0.4, x: "1060", ease: "back.out" });

    }
    else if (r2 == 2) {
      item_2.texture = item_axe;
      text2_1.text = name3;
      text2_1.x = 990;
      text2_2.text = "X   " + amount3;
      item_2.x = 1010;
      wiggleTween1.to(item_2, { duration: 0.4, x: "1060", ease: "back.out" });
    }
    wiggleTween1.restart();
  }, 300);
}

function left_2() {
  const wiggleTween = new gsap.timeline({ paused: true })
  wiggleTween.from(item_2, { duration: 0.1, x: "1060", ease: "rough" });
  wiggleTween.to(item_2, { duration: 0.1, x: "1010", ease: "rough" });
  wiggleTween.restart();
  setTimeout(function () {
    const wiggleTween1 = new gsap.timeline({ paused: true })
    r2 -= 1;
    if (r2 <= -1) {
      r2 = 2;
    }
    if (r2 == 0) {
      item_2.texture = item_fire;
      text2_1.text = name1;
      text2_2.text = "X   " + amount1;
      item_2.x = 1110;
      wiggleTween1.to(item_2, { duration: 0.4, x: "1060", ease: "back.out" });
    }
    else if (r2 == 1) {
      item_2.texture = item_pan;
      text2_1.text = name2;
      text2_2.text = "X   " + amount2;
      item_2.x = 1110;
      wiggleTween1.to(item_2, { duration: 0.4, x: "1060", ease: "back.out" });
    }
    else if (r2 == 2) {
      item_2.texture = item_axe;
      text2_1.text = name3;
      text2_2.text = "X   " + amount3;
      item_2.x = 1110;
      wiggleTween1.to(item_2, { duration: 0.4, x: "1060", ease: "back.out" });
    }
    wiggleTween1.restart();
  }, 300);
}

//ฟังก์ชั่นเวลากดใช้ยา
function dselected1() {
  drbtn.visible = false;
  dlbtn.visible = false;
  ditem_1.visible = false;
  modal_1.visible = false;
  player.visible = true;
  attack.visible = false;
  spell.visible = false;
  text1_1.visible = false;
  text1_2.visible = false;
  defend.visible = false;
  if (dr == 0) {
    au.visible = true;
    damage1 -= 1;
  }
  else {
    damage1 -= 1;
    setTimeout(function () {
      updateHp1(damage1);
    }, 300);
    summonHeal(1)
  }
}

function dselected2() {

  drbtn2.visible = false;
  dlbtn2.visible = false;
  ditem_2.visible = false;
  modal_2.visible = false;
  enimy.visible = true;
  attack2.visible = false;
  spell2.visible = false;
  text2_1.visible = false;
  text2_2.visible = false;
  defend2.visible = false;

  if (dr2 == 0) {
    au2.visible = true;
    damage2 -= 1;
  }
  else {
    damage2 -= 1;
    setTimeout(function () {
      updateHp2(damage2);
    }, 300);
    summonHeal(2)
  }
}

//ฟังก์ชันปุ่มเลื่อนซ้ายขวาของยา
let dr = 0;
function dleft_1() {
  dr -= 1;
  if (dr <= -1) {
    dr = 2;
  }
  if (dr == 0) {
    ditem_1.texture = potion1;
    text1_1.text = dname1;
    text1_2.text = "X   " + damount1;
  }
  else if (dr == 1) {
    ditem_1.texture = potion2;
    text1_1.text = dname2;
    text1_2.text = "X   " + damount2;
  }
  else if (dr == 2) {
    ditem_1.texture = potion3;
    text1_1.text = dname3;
    text1_2.text = "X   " + damount3;
  }

}

function dright_1() {
  dr += 1;

  if (dr >= 3) {
    dr = 0;
  }
  if (dr == 0) {
    ditem_1.texture = potion1;
    text1_1.text = dname1;
    text1_2.text = "X   " + damount1;
  }
  else if (dr == 1) {
    ditem_1.texture = potion2;
    text1_1.text = dname2;
    text1_2.text = "X   " + damount2;
  }
  else if (dr == 2) {
    ditem_1.texture = potion3;
    text1_1.text = dname3;
    text1_2.text = "X   " + damount3;
  }
}

let dr2 = 0;
function dright_2() {
  dr2 += 1;
  if (dr2 >= 3) {
    dr2 = 0;
  }
  if (dr2 == 0) {
    ditem_2.texture = potion1;
    text2_1.text = dname1;
    text2_2.text = "X   " + damount1;
  }
  else if (dr2 == 1) {
    ditem_2.texture = potion2;
    text2_1.text = dname2;
    text2_2.text = "X   " + damount2;
  }
  else if (dr2 == 2) {
    ditem_2.texture = potion3;
    text2_1.text = dname3;
    text2_2.text = "X   " + damount3;
  }
}

function dleft_2() {
  dr2 -= 1;
  if (dr2 <= -1) {
    dr2 = 2;
  }
  if (dr2 == 0) {
    ditem_2.texture = potion1;
    text1_1.text = dname1;
    text1_2.text = "X   " + damount1;
  }
  else if (dr2 == 1) {
    ditem_2.texture = potion2;
    text1_1.text = dname2;
    text1_2.text = "X   " + damount2;
  }
  else if (dr2 == 2) {
    ditem_2.texture = potion3;
    text1_1.text = dname3;
    text1_2.text = "X   " + damount3;
  }
}


//ฟังก์ชันเวลาเอาเมาส์ไปชี้ที่การ์ด
function inCard() {
  // if (this.x <= 460) {
  //   if (this.x < 460) {
  //     this.width = 120;
  //     this.height = 140;

  //   }
  // }
  // else {
  //   if (this.x > 725) {
  //     this.width = 120;
  //     this.height = 140;
  //   }
  // }

  this.tint = 0xFFFFFF;

}

function outCard() {
  if (this.x <= 460) {
    if (this.x < 350) {
      // this.width = 80;
      // this.height = 100;
      this.tint = 0x595959;
    }

  }
  else {
    if (this.x > 825) {
      // this.width = 80;
      // this.height = 100;
      this.tint = 0x595959;
    }
  }


}

//ฟังก์ชันแสดงผลและตั้งค่า ต่าง ๆ หลังเลือกการ์ดฝั่ง Player
function clickCard1() {
  p1_card2.x = 200;
  p1_card2.y = 220;
  p1_card2.width = 80;
  p1_card2.height = 100;

  p1_card3.x = 300;
  p1_card3.y = 220;
  p1_card3.width = 80;
  p1_card3.height = 100;

  this.x = 460
  this.width = 200;
  this.height = 300;

  p1_card3.tint = 0x595959;
  p1_card2.tint = 0x595959;

  p1_status = p1_card1_status;

  const wiggleTween = gsap
    .from(p1_card1, { duration: 0.5, width: 100, height: 120, x: 351, ease: "back", paused: true, stagger: 0.1 }
    );
  wiggleTween.restart();

}

function clickCard2() {
  p1_card1.x = 100;
  p1_card1.y = 220;
  p1_card1.width = 80;
  p1_card1.height = 100;

  p1_card3.x = 300;
  p1_card3.y = 220;
  p1_card3.width = 80;
  p1_card3.height = 100;

  this.x = 460
  this.width = 200;
  this.height = 300;

  p1_card3.tint = 0x595959;
  p1_card1.tint = 0x595959;
  p1_status = p1_card2_status;
  const wiggleTween = gsap
    .from(p1_card2, { duration: 0.5, width: 100, height: 120, x: 351, ease: "back", paused: true, stagger: 0.1 }
    );
  wiggleTween.restart();

}

function clickCard3() {
  p1_card1.x = 100;
  p1_card1.y = 220;
  p1_card1.width = 80;
  p1_card1.height = 100;

  p1_card2.x = 200;
  p1_card2.y = 220;
  p1_card2.width = 80;
  p1_card2.height = 100;

  this.x = 460
  this.width = 200;
  this.height = 300;

  p1_card1.tint = 0x595959;
  p1_card2.tint = 0x595959;
  p1_status = p1_card3_status;

  const wiggleTween = gsap
    .from(p1_card3, { duration: 0.5, width: 100, height: 120, x: 351, ease: "back", paused: true, stagger: 0.1 }
    );
  wiggleTween.restart();


}

//ฟังก์ชันแสดงผลและตั้งค่า ต่าง ๆ หลังเลือกการ์ดฝั่ง enimy
function clickCard21() {
  this.x = 725
  this.width = 200;
  this.height = 300;

  p2_card2.x = 1050;
  p2_card2.y = 220;
  p2_card2.width = 80;
  p2_card2.height = 100;

  p2_card3.x = 1150;
  p2_card3.y = 220;
  p2_card3.width = 80;
  p2_card3.height = 100;
  p2_card3.tint = 0x595959;
  p2_card2.tint = 0x595959;

  p2_status = p2_card1_status;
  const wiggleTween = gsap
    .from(p2_card1, { duration: 0.5, width: 100, height: 120, x: 826, ease: "back", paused: true, stagger: 0.1 }
    );
  wiggleTween.restart();


}

function clickCard22() {
  this.x = 725
  this.width = 200;
  this.height = 300;

  p2_card1.x = 950;
  p2_card1.y = 220;
  p2_card1.width = 80;
  p2_card1.height = 100;

  p2_card3.x = 1150;
  p2_card3.y = 220;
  p2_card3.width = 80;
  p2_card3.height = 100;

  p2_card3.tint = 0x595959;
  p2_card1.tint = 0x595959;
  p2_status = p2_card2_status;

  const wiggleTween = gsap
    .from(p2_card2, { duration: 0.5, width: 100, height: 120, x: 826, ease: "back", paused: true, stagger: 0.1 }
    );
  wiggleTween.restart();
}

function clickCard23() {
  this.x = 725
  this.width = 200;
  this.height = 300;

  p2_card2.x = 1050;
  p2_card2.y = 220;
  p2_card2.width = 80;
  p2_card2.height = 100;

  p2_card1.x = 950;
  p2_card1.y = 220;
  p2_card1.width = 80;
  p2_card1.height = 100;

  p2_card1.tint = 0x595959;
  p2_card2.tint = 0x595959;
  p2_status = p2_card3_status;

  const wiggleTween = gsap
    .from(p2_card3, { duration: 0.5, width: 100, height: 120, x: 826, ease: "back", paused: true, stagger: 0.1 }
    );
  wiggleTween.restart();

}

//ฟังก์ชันการสุ่มการ์ดต่าง ๆ และนำมาแสดงผล
let d2 = 0
let old2 = -1;
function dc2down() {
  if (d2 == 0) {
    for (let i = 0; i < 3; i++) {
      random = randomCard();
      if (i == 0) {
        if (random == 0) {
          p2_card1_status = 0;
        }
        if (random == 1) {
          p2_card1_status = 1;
        }
        if (random == 2) {
          p2_card1_status = 2;
        }
        old2 = random;
      }
      if (i == 0) {

      }
      else if (old2 == random) {
        i--;
      }
      else {
        if (i == 1) {
          if (random == 0) {
            p2_card2_status = 0;
          }
          if (random == 1) {
            p2_card2_status = 1;
          }
          if (random == 2) {
            p2_card2_status = 2;
          }

        }
        else if (i == 2) {
          if (random == 0) {
            p2_card3_status = 0;
          }
          if (random == 1) {
            p2_card3_status = 1;
          }
          if (random == 2) {
            p2_card3_status = 2;
          }
        }
      }
    }
    p2_card1.visible = true;
    p2_card2.visible = true;
    p2_card3.visible = true;
    d2 = 1;
  }
  else {
    p2_card1.visible = false;
    p2_card2.visible = false;
    p2_card3.visible = false;
    d2 = 0;
  }
}

let d = 0
let old = -1;
function dcdown() {
  if (d == 0) {
    for (let i = 0; i < 3; i++) {
      random = randomCard();
      if (i == 0) {
        if (random == 0) {
          p1_card1.texture = fr;
          p1_card1_status = 0;
        }

        if (random == 1) {
          p1_card1.texture = wd;
          p1_card1_status = 1;
        }
        if (random == 2) {
          p1_card1.texture = wt;
          p1_card1_status = 2;
        }
        old = random;
      }
      if (i == 0) {

      }
      else if (old == random) {
        i--;
      }
      else {
        if (i == 1) {
          if (random == 0) {
            p1_card2.texture = fr;
            p1_card2_status = 0;
          }
          if (random == 1) {
            p1_card2.texture = wd;
            p1_card2_status = 1;
          }
          if (random == 2) {
            p1_card2.texture = wt;
            p1_card2_status = 2;
          }
        }
        else if (i == 2) {
          if (random == 0) {
            p1_card3.texture = fr;
            p1_card3_status = 0;
          }
          if (random == 1) {
            p1_card3.texture = wd;
            p1_card3_status = 1;
          }
          if (random == 2) {
            p1_card3.texture = wt;
            p1_card3_status = 2;
          }
        }
      }
    }
    p1_card1.visible = true;
    p1_card2.visible = true;
    p1_card3.visible = true;
    d = 1;
  }
  else {
    p1_card1.visible = false;
    p1_card2.visible = false;
    p1_card3.visible = false;
    d = 0;
  }
}

//ฟังก์ชันตั้งค่าใหม่หลังจบตา
var plays = 3;
function reset() {
  var loop = setInterval(repeat, 500);
  function repeat() {
    plays--;
    if (plays === 0) {
      clearInterval(loop);
    }

    var audio2 = new Audio(playcard);
    audio2.play();
    audio2.volume = 1;
  }
  repeat();



  time = 10;
  atkstatus = 0;
  attack.visible = false;
  defend.visible = false;
  spell.visible = false;
  attack2.visible = false;
  defend2.visible = false;
  spell2.visible = false;
  modal_1.visible = false;
  player.visible = true;
  modal_2.visible = false;
  enimy.visible = true;

  p1_card1.visible = true;
  p1_card2.visible = true;
  p1_card3.visible = true;
  p2_card1.visible = true;
  p2_card2.visible = true;
  p2_card3.visible = true;
  fade = 1;
  fade2 = 1;

  text2_1.visible = false;
  text2_2.visible = false;
  text1_1.visible = false;
  text1_2.visible = false;

  drbtn.visible = false;
  dlbtn.visible = false;
  ditem_1.visible = false;

  drbtn2.visible = false;
  dlbtn2.visible = false;
  ditem_2.visible = false;

  rbtn.visible = false;
  lbtn.visible = false;
  item_1.visible = false;
  item_1.texture = item_fire;

  rbtn2.visible = false;
  lbtn2.visible = false;
  item_2.visible = false;
  item_2.texture = item_fire;

  p1_card1.x = 0;
  p1_card1.y = 500;
  p1_card1.width = 0;
  p1_card1.height = 0;
  p1_card1.tint = 0x595959;

  p1_card2.x = 0;
  p1_card2.y = 500;
  p1_card2.width = 0;
  p1_card2.height = 0;
  p1_card2.tint = 0x595959;

  p1_card3.x = 0;
  p1_card3.y = 500;
  p1_card3.width = 0;
  p1_card3.height = 0;
  p1_card3.tint = 0x595959;

  p2_card1.x = 1250;
  p2_card1.y = 500;
  p2_card1.width = 0;
  p2_card1.height = 0;
  p2_card1.tint = 0x595959;

  p2_card2.x = 1250;
  p2_card2.y = 500;
  p2_card2.width = 0;
  p2_card2.height = 0;
  p2_card2.tint = 0x595959;

  p2_card3.x = 1250;
  p2_card3.y = 500;
  p2_card3.width = 0;
  p2_card3.height = 0;
  p2_card3.tint = 0x595959;

  const wiggleTween = new gsap.timeline({ paused: true })
    .to(p1_card1, { duration: 0.8, x: 100, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    .to(p1_card2, { duration: 0.5, x: 200, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    .to(p1_card3, { duration: 0.5, x: 300, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    ;
  wiggleTween.restart();

  const wiggleTween1 = new gsap.timeline({ paused: true })
    .to(p2_card3, { duration: 0.8, x: 1150, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    .to(p2_card2, { duration: 0.5, x: 1050, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    .to(p2_card1, { duration: 0.5, x: 950, y: 220, width: 80, height: 100, ease: "slow", stagger: 0.1 })
    ;
  wiggleTween1.restart();

  p1_card1.visible = true;
  p1_card2.visible = true;
  p1_card3.visible = true;

  p2_card1.texture = bc;
  p2_card2.texture = bc;
  p2_card3.texture = bc;


  p2_card1.visible = true;
  p2_card2.visible = true;
  p2_card3.visible = true;

  p1_card1.interactive = true;
  p1_card2.interactive = true;
  p1_card3.interactive = true;

  win.texture = initiate;

  dcdown();
  dc2down();

  setTimeout(function () {
    dcdown();
    dc2down();
  }, 500);

}

//ฟังก์ชั่น loop game หรือการแสดง flowต่าง ๆ ของเกม
function gameLoop(delta) {
  updateGame(delta);
  updateBullets(delta);
}

//ฟังก์ชันดำเนินการต่าง ๆ ของเกมการเช็คค่าต่าง ๆ การประกาศผู้ชนะ การจบเกมจะอยู่ในฟังก์ชั่นนี้ทั้งหมด
let damage1 = 0;
let damage2 = 0;
let fade = 1;
let fade2 = 1;
function updateGame() {
  var myVar, myVar2;
  //เช็คว่า เช็คตำแหน่งการ์ดว่าผู้เล่นเลือกการ์ดใบไหน และเช็คว่าเลือดหมดหรือยังถ้ายังแสดงผลต่าง ๆ
  if (time == 0 && damage1 < 6 && damage2 < 6) {
    dc.interactive = false;
    dc2.interactive = false;
    if (p1_card1.x == 460) {
      p1_card2.visible = false;
      p1_card3.visible = false;
      p1_card1.tint = 0xFFFFFF;
      p1_card1.interactive = false;
      if (fade == 1) {
        myVar = setTimeout(function () {
          p1_card1.visible = false;
        }, 1200);
        fade = 0;
      }

    }
    else if (p1_card2.x == 460) {
      p1_card1.visible = false;
      p1_card3.visible = false;
      p1_card2.tint = 0xFFFFFF;
      p1_card2.interactive = false;
      if (fade == 1) {
        myVar = setTimeout(function () {
          p1_card2.visible = false;
        }, 1200);
        fade = 0;
      }
    }
    else if (p1_card3.x == 460) {
      p1_card1.visible = false;
      p1_card2.visible = false;
      p1_card3.tint = 0xFFFFFF;
      p1_card3.interactive = false;
      if (fade == 1) {
        myVar = setTimeout(function () {
          p1_card3.visible = false;
        }, 1200);
        fade = 0;
      }
    }
    else if (p1_card1.x != 460 && p1_card2.x != 460 && p1_card3.x != 460) {
      p1_card2.visible = false;
      p1_card3.visible = false;
      p1_card1.x = 460
      p1_card1.width = 200;
      p1_card1.height = 300;
      p1_status = p1_card1_status;
      p1_card1.tint = 0xFFFFFF;
      if (fade == 1) {
        myVar = setTimeout(function () {
          p1_card1.visible = false;
        }, 1200);
        fade = 0;
      }
    }
    if (p2_card1.x == 725) {
      p2_card2.visible = false;
      p2_card3.visible = false;
      if (p2_status == 0) {
        p2_card1.texture = fr;
      }
      if (p2_status == 1) {
        p2_card1.texture = wd;
      }
      if (p2_status == 2) {
        p2_card1.texture = wt;
      }
      p2_card1.tint = 0xFFFFFF;
      if (fade2 == 1) {
        myVar2 = setTimeout(function () {
          p2_card1.visible = false;
        }, 1200);
        fade2 = 0;
      }
    }
    else if (p2_card2.x == 725) {
      p2_card3.visible = false;
      p2_card1.visible = false;
      if (p2_status == 0) {
        p2_card2.texture = fr;
      }
      if (p2_status == 1) {
        p2_card2.texture = wd;
      }
      if (p2_status == 2) {
        p2_card2.texture = wt;
      }
      p2_card2.tint = 0xFFFFFF;
      if (fade2 == 1) {
        myVar2 = setTimeout(function () {
          p2_card2.visible = false;
        }, 1200);
        fade2 = 0;
      }
    }
    else if (p2_card3.x == 725) {
      p2_card1.visible = false;
      p2_card2.visible = false;
      if (p2_status == 0) {
        p2_card3.texture = fr;
      }
      if (p2_status == 1) {
        p2_card3.texture = wd;
      }
      if (p2_status == 2) {
        p2_card3.texture = wt;
      }
      p2_card3.tint = 0xFFFFFF;
      if (fade2 == 1) {
        myVar2 = setTimeout(function () {
          p2_card3.visible = false;
        }, 1200);
        fade2 = 0;
      }
    }
    else if (p2_card1.x != 725 && p2_card2.x != 725 && p2_card3.x != 725) {
      p2_card2.visible = false;
      p2_card3.visible = false;

      p2_card1.x = 725
      p2_card1.width = 200;
      p2_card1.height = 300;
      p2_status = p2_card1_status;
      if (p2_status == 0) {
        p2_card1.texture = fr;
      }
      if (p2_status == 1) {
        p2_card1.texture = wd;
      }
      if (p2_status == 2) {
        p2_card1.texture = wt;
      }
      p2_card1.tint = 0xFFFFFF;
      if (fade2 == 1) {
        myVar2 = setTimeout(function () {
          p2_card1.visible = false;
        }, 1200);
        fade2 = 0;
      }
    }
    if ((p1_status == 0 && p2_status == 1 && win.texture != win_1)
      || (p1_status == 1 && p2_status == 2 && win.texture != win_1)
      || (p1_status == 2 && p2_status == 0 && win.texture != win_1)
    ) {
      win.texture = win_1;
      win.x = 450;
      attack.visible = true;
      spell.visible = true;
      spell2.visible = true;
      defend2.visible = true;
    }
    else if (p1_status == p2_status && win.texture != draw) {
      win.texture = draw;
      win.x = 370;
      attack.visible = true;
      spell.visible = true;
      attack2.visible = true;
      spell2.visible = true;
    }
    if ((p2_status == 0 && p1_status == 1 && win.texture != win_2)
      || (p2_status == 1 && p1_status == 2 && win.texture != win_2)
      || (p2_status == 2 && p1_status == 0 && win.texture != win_2)
    ) {
      win.texture = win_2;
      win.x = 450;
      spell.visible = true;
      attack2.visible = true;
      spell2.visible = true;
      defend.visible = true;
    }

    //เคลียร์ผลต่าง ๆ แล้วรีเซ็ทหน้าจอหลังจบแต่ละตา
    if ((atkstatus == 1 && win.texture == win_2) || (atkstatus == 1 && win.texture == win_1)) {
      if (ready == 1 && damage1 < 6 && damage2 < 6) {
        clearTimeout(myVar);
        clearTimeout(myVar2);
        setTimeout(function () {
          reset();
        }, 1700);
        plays = 3;
        ready = 0;
      }
    }
    else if (win.texture == draw) {
      if (atkstatus == 2) {
        if (ready == 1 && damage1 < 6 && damage2 < 6) {
          clearTimeout(myVar);
          clearTimeout(myVar2);
          setTimeout(function () {
            reset();
          }, 1700);
          plays = 3;
          ready = 0;
        }
      }
    }

  }

  //ถ้าเลือดหมดจะแสดงผลผู้ชนะ และหยุดทุก loop แสดงผลเฉพาะที่จำเป็น
  if (damage2 >= 6 || damage1 >= 6) {
    setTimeout(function () {
      p1_card1.visible = false;
      p1_card2.visible = false;
      p1_card3.visible = false;
      p2_card1.visible = false;
      p2_card2.visible = false;
      p2_card3.visible = false;
      spell.visible = false;
      attack2.visible = false;
      attack2.visible = false;
      spell2.visible = false;
      defend.visible = false;
      defend2.visible = false;

      resu.visible = true;
      text.visible = true;
      star1.visible = true;
      star2.visible = true;
      text_2.visible = true;
      text_3.visible = true;
      coin1.visible = true;
      text_4.visible = true;
      text_5.visible = true;
      coin2.visible = true;

      win.visible = false;
      if (damage2 >= 6 && damage1 >= 6) {
        basicText.text = 'DRAW';
        basicText.x = 640;
        text.text = 'YOU DRAW';
        text_3.text = '+0';
        text_5.text = '1000';
      }
      else if (damage2 >= 6 && damage1 < 6) {
        basicText.text = 'Player1 WIN!';
        text.text = 'YOU WIN';
        text_3.text = '+20';
        text_5.text = '1020';
        basicText.x = 570;
      }
      else if (damage1 >= 6 && damage2 < 6) {
        basicText.text = 'Player2 WIN!';
        text.text = 'YOU LOSE';
        text_3.text = '-20';
        text_5.text = '980';
        basicText.x = 570;
      }
    }, 1700);
  }

}

//ฟังก์ชันการโจมตี เอฟเฟคต่าง ๆ
let update = 0;
function fireBullet(value, texture) {
  let bullet = createBullet(value, texture);
  bullets.push(bullet);
  let effect = createEffect(value);
  Effects.push(effect);
  update = value;
}

//ฟังก์ชันเอฟเฟค เพิ่มเลือดต่าง ๆ
let heals = [];
function summonHeal(value) {
  let heal = createHeal(value);
  heals.push(heal);
}

//ฟังก์ชันการแสดงผลการโจมตี
function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    //ฝั่งผู้เล่น
    if (update == 1) {
      if (bullets[i].position.x < enimy.x + 100) {
        Effects[i].stop();
      }
      if (bullets[i].position.x < enimy.x + 300) {
        bullets[i].position.x += bullets[i].speed;
        bullets[i].rotation += 0.2;
      }

      if (bullets[i].position.x >= enimy.x + 70) {
        Effects[i].visible = true;
        Effects[i].play();
        bullets[i].visible = false;
      }

      if (bullets[i].position.x >= enimy.x + 300) {
        for (let j = 0; j < bullets.length; j++) {
          Effects[j].visible = false;
        }
      }
    }
    //ฝั่ง enimy
    else if (update == 2) {
      if (bullets[i].position.x > player.x - 100) {
        Effects[i].stop();
      }
      if (bullets[i].position.x > player.x - 200) {
        bullets[i].position.x -= bullets[i].speed;
        bullets[i].rotation -= 0.2;
      }

      if (bullets[i].position.x <= player.x + 130) {
        Effects[i].visible = true;
        Effects[i].play();
        bullets[i].visible = false;

      }

      //clear effect ที่หลงเหลือ
      if (bullets[i].position.x < player.x - 100) {
        for (let j = 0; j < bullets.length; j++) {
          Effects[j].visible = false;
        }
      }
    }
  }
}
//ฟังก์ชันการตั้งค่าการโจมตี
function createBullet(value, texture) {
  let bullet
  if (value == 1) {
    bullet = new PIXI.Sprite.from(book);
    bullet.texture = texture;
    bullet.scale.set(0.05);
    bullet.anchor.set(0.3);
    bullet.x = player.x + 190;
    bullet.y = player.y + 80;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);
    count += 1;
  }
  else if (value == 2) {
    bullet = new PIXI.Sprite.from(book_1);
    bullet.scale.set(0.05);
    bullet.texture = texture;
    bullet.anchor.set(0.3);
    bullet.x = 1050;
    bullet.y = enimy.y + 80;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);
    count += 1;
  }

  return bullet;
}

//ฟังก์ชันการตั้งค่าการแสดงผลเอฟเฟคต่าง ๆ
function createEffect(value) {
  mc = new PIXI.AnimatedSprite(frames_mc);
  if (value == 1) {
    mc.x = 1020;
    mc.y = 340;
  }
  else if (value == 2) {
    mc.x = 120;
    mc.y = 330;
  }
  mc.scale.set(0.6);
  mc.animationSpeed = 0.8;
  mc.loop = false;
  mc.play();
  app.stage.addChild(mc);

  return mc;

}

//ฟังก์ชันการตั้งค่าฮีล
function createHeal(value) {

  hl = new PIXI.AnimatedSprite(healing);
  if (value == 1) {
    hl.x = 100;
    hl.y = 250;
  }
  else if (value == 2) {
    hl.x = 990;
    hl.y = 250;
  }
  hl.animationSpeed = 0.2;
  hl.height = 250;
  hl.width = 200;
  hl.loop = false;
  hl.play()
  app.stage.addChild(hl);


  return hl;

}

