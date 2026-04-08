(function(){
  var i=setInterval(function(){
    var w=document.getElementById('ba-slider');
    var b=document.getElementById('ba-before');
    var d=document.getElementById('ba-divider');
    if(!w||!b||!d)return;
    clearInterval(i);
    b.style.setProperty('max-width','none','important');
    b.style.setProperty('width',w.offsetWidth+'px','important');
    d.style.setProperty('left','0','important');
    d.style.setProperty('margin-left',(w.offsetWidth/2)+'px','important');
    window.addEventListener('resize',function(){
      var pw=w.offsetWidth;
      b.style.setProperty('width',pw+'px','important');
      d.style.setProperty('margin-left',(pw/2)+'px','important');
    });
    var a=false;
    function s(cx){
      var r=w.getBoundingClientRect();
      var p=Math.max(0,Math.min(100,(cx-r.left)/r.width*100));
      var right=(100-p).toFixed(1);
      b.style.setProperty('clip-path','inset(0 '+right+'% 0 0)','important');
      b.style.setProperty('-webkit-clip-path','inset(0 '+right+'% 0 0)','important');
      d.style.setProperty('margin-left',(r.width*p/100).toFixed(1)+'px','important');
    }
    w.style.cursor='grab';
    w.addEventListener('pointerdown',function(e){
      a=true;
      w.style.cursor='grabbing';
      s(e.clientX);
      e.preventDefault();
      e.stopPropagation();
    });
    window.addEventListener('pointermove',function(e){if(!a)return;s(e.clientX);});
    window.addEventListener('pointerup',function(){a=false;w.style.cursor='grab';});
    window.addEventListener('pointercancel',function(){a=false;});
    function shimmy(){
      var start=Date.now();
      function tick(){
        var t=Math.min(1,(Date.now()-start)/1100);
        var ease=t<0.3?t/0.3*-3:t<0.6?(t-0.3)/0.3*6-3:(t-0.6)/0.4*-3+3;
        var p=50+ease;
        var pw=w.offsetWidth;
        b.style.setProperty('clip-path','inset(0 '+(100-p).toFixed(1)+'% 0 0)','important');
        b.style.setProperty('-webkit-clip-path','inset(0 '+(100-p).toFixed(1)+'% 0 0)','important');
        d.style.setProperty('margin-left',(pw*p/100).toFixed(1)+'px','important');
        if(t<1)requestAnimationFrame(tick);
        else{
          b.style.setProperty('clip-path','inset(0 50% 0 0)','important');
          d.style.setProperty('margin-left',(pw/2)+'px','important');
        }
      }
      requestAnimationFrame(tick);
    }
    setTimeout(shimmy,1500);
    setInterval(shimmy,5000);
  },100);
})();
