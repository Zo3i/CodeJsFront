var str = `. . . BMBD.   .   .   . . . . .   .   . . .       . . . . . :MBMB   .
 .   B.  Lg.         . . . .         .         . .   .     vM: .YB
   .B5.   gg  . .       .   . . . . .         .   . . . .  M:    MB.
 vMMi  .  IB                 . .     . . . .   . . .   .   B .   .7BM.
dg. .     Lgs .     .               .     .     . .   .   gM. .   . :M
sB . .     .MB:    .   .    .25BgBgBgBDBUs   .   .     .LBU  .      :B
..BbQPBM5   ..BMi .     ..RMBus.: . . :.1IBMP .     . ugQ     BMBhRZB
   . : .bBi    7MB     jMBr: . . : : . . . isBgi . .:Bg. . .UBv  :   .
          Bgr   .:BP  BK:   . . . . . . . .   7gQ .MB   . KMZ .   .
   .     . iMB..   iMBi. :.i.i.i.i.i.i.i.i.i.: .UBM.    rBb  . . .
.            .BD. .1BEBMBMBMBgBMBgBMBMBgBMBgBMBgQgB.  rMB   . .
 .   .     . . igbEBIE2D2gID2g2g5DIDIDIDIgIDID2DUEPB7BZ.       .     .
  . .     . rrhLRMBXMXRKQKRXMXRKRXRXQKMXRXRXRXRKMSMPBMPYSi: . .     .
   . .   XMBhS:i         .       .           . . . .   riPEBg7   . . .
    . . .MBSE5MKDgBSQbQXZLUr17PSQPBbQPQ2K71r2YghBbQ5BbgXMIZPBP  . .
       . .       B2. .   .:ji:     .   . irj..      Mi .     .     . .
    . .         .UB    .BMBgBMB2      .gBMBgBMB     B   . .     . . .
 . .           . ig   :BMBgBgBMBg  . .gBMBMBgBgB   ig    .     . .
.     .       .   Bu  BgBMBgBMBMB    sBMBMBMBMBML  MZ
 .             .   B .7BMBgBMBMBg  . :MBMBMBgBMB  YB         .       .
. . .   . . . .    :B .1BgBMBMBM. .   JMBMBMBgB..rB .   . .   .   . .
       . . .   .    :B:  IDBMQ:  uMBM:  rBMBhv  SB       .   .   . .
  .   .       .       BK  . .   :gBMBM  .     :Md           .   .   .
                     ..BMg..   . BMBM5 .    :BMB . .       . .   . .
. .           . .   vMQ  dB5gr: .       ivR5B.  Bg:         .       .
     .   .        :BM.   B.. PM21dUBJdJPg:  P1   vgB               . .
. .       . .   :MB..   vMB1vIB   :M    BiU2BM: .  rBh  .   .       .
   .   .   .   Bg7   .iBMB   BMPXQZBSB5Zg5   BMB..   hMD . .     .
      .     .bBi.   rgB  MEi.ZB   .M    B:.rBM :Bg. .  IBL  .
   .       gMK    .BMi   B 7jBgBdgMB5REBgQLiiB   UMQ     BMu   .   . .
  .     .YBI. . .gB:     M2     . . . . .   BX     uB1.   .gB:.   .
   srs:IMB .   QMU     . .Mh     .     .   Bg  . .   Qg2    .BMv:u77
 2Bu27dP.   .jBU.   .      SBKJ..   . ..IZB7  .     . .MB:  . 7bh755B:
MR .   .   vMQ   .   .       rsQdBgBMBdM7:              .BM.         B
BM. .   . BM.       .                 .   .       . . .   iMY       iM
 vMB5    .gM   .                 .             .   .     . B:  . .ZBg.
  . Br.   BY  . .   . .       .         . . .              gR    gB
   . Bri:QU  .     . .   .       .   .                      MX.iIB    `
console.log(str);
console.log('%c     ONEPIECE     ', 'background: #000; color: #fff;font-size:60px;ont-family:Georgia');
console.log("%c 点击页面键盘输入stop停止音乐,x继续","font-size:25px;color:red","\n");
document.addEventListener("keydown", function(event) {
  if (event.keyCode != 123) {
    return false;
  }
  var max = 10;
  // Create  player
  var player = document.createElement("audio");
  player.id = "What's_up_man";
  player.style = "display:none";
  player.volume = 1;
  if (document.getElementById("What's_up_man") != null) {
    console.log("有了")
    document.getElementById("What's_up_man").play();
  } else {
    console.log("创建")
    document.body.appendChild(player);
    player.src = "https://zxx.im/BoystyLe.mp3";
    player.now = 0;
    player.play();
  }
})

document.addEventListener("keydown", function(event) {
  if (event.keyCode != 88 ) {
    return false;
  }
  document.getElementById("What's_up_man").play();
})



var changeIcon = function(){
  var link = document.head.querySelector("link");
  link.href = "../img/o.ico";
}
function titleInfo()
{
  const OriginTitle = document.title;
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      document.title = '哎呀，浏览器崩溃啦!';
      document.getElementById("icon").href="../static/image//o.ico";
    } else {
      document.title = '又好了嘻嘻：)';
      document.getElementById("icon").href="../static/image/f.ico";
      setTimeout(function() { document.title = "Xcoding";
      }, 3000);
      setTimeout(function() {document.getElementById("icon").href="../static/image/icon.jpg";}, 3000);
    } });
}
titleInfo();


// 音乐停止
var Konami = {};
(function(d, e) {
  var f = d.sequence = function() {
    var b = Array.prototype.slice.call(arguments),
      c = 0;
    return function(a) {
      a = a || e.event;
      a = a.keyCode || a.which || a;
      if (a === b[c] || a === b[c = 0]) a = b[++c],
      "function" === typeof a && (a(), c = 0)
    }
  };
  d.code = function(b) {
    return f(83  , 84  , 79  , 80  , b)
  }
})(Konami, window);

$(document).on('keyup',
  Konami.code(function() {
    document.getElementById("What's_up_man").pause()
  })
);
