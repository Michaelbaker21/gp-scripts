(function(){
  var i=setInterval(function(){
    var w=document.getElementById('ba-slider');
    var b=document.getElementById('ba-before');
    if(!w||!b)return;
    clearInterval(i);

    b.style.setProperty('max-width','none','important');
    b.style.setProperty('width',w.offsetWidth+'px','important');

    var line=document.createElement('div');
    line.style.cssText='position:absolute;top:0;bottom:0;width:2px;border-left:2px dashed #f4c7d5;left:0;margin-left:'+Math.round(w.offsetWidth/2)+'px;transform:translateX(-50%);pointer-events:none;z-index:99;';

    var handle=document.createElement('div');
    handle.style.cssText='position:absolute;top:50%;left:0;margin-left:-27px;margin-top:-27px;width:54px;height:54px;border-radius:50%;background:#f4c7d5;display:flex;align-items:center;justify-content:center;';
    handle.innerHTML='<svg width="38" height="20" viewBox="0 0 38 20" fill="none"><path d="M11 3L4 10l7 7" stroke="#374171" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 3l7 7-7 7" stroke="#374171" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    line.appendChild(handle);
    w.appendChild(line);

    var pillB=document.createElement('div');
    pillB.style.cssText='position:absolute;bottom:16px;left:0;margin-left:16px;font-size:16px;font-weight:600;font-family:sans-serif;color:#374171;background:#f4c7d5;padding:12px 32px;border-radius:20px;cursor:default;z-index:99;';
    pillB.textContent='Before';
    w.appendChild(pillB);

    var pillA=document.createElement('div');
    pillA.style.cssText='position:absolute;bottom:16px;right:0;margin-right:16px;font-size:16px;font-weight:600;font-family:sans-serif;color:#374171;background:#f4c7d5;padding:12px 32px;border-radius:20px;cursor:default;z-index:99;';
    pillA.textContent='After';
    w.appendChild(pillA);

    var oldDiv=document.getElementById('ba-divider');
    if(oldDiv)oldDiv.style.setProperty('display','none','important');
    var oldPills=w.querySelectorAll('span');
    oldPills.forEach(function(p){p.style.setProperty('display','none','important');});

    var pw=w.offsetWidth;
    var a=false;

    function s(cx){
      var r=w.getBoundingClientRect();
      var p=Math.max(0,Math.min(100,(cx-r.left)/r.width*100));
      var ml=(r.width*p/100).toFixed(1);
      b.style.setProperty('clip-path','inset(0 '+(100-p).toFixed(1)+'% 0 0)','important');
      b.style.setProperty('-webkit-clip-path','inset(0 '+(100-p).toFixed(1)+'% 0 0)','important');
      line.style.marginLeft=ml+'px';
    }

    w.style.cursor='grab';
    w.addEventListener('pointerdown',function(e){a=true;w.style.cursor='grabbing';s(e.clientX);e.preventDefault();e.stopPropagation();});
    window.addEventListener('pointermove',function(e){if(!a)return;s(e.clientX);});
    window.addEventListener('pointerup',function(){a=false;w.style.cursor='grab';});
    window.addEventListener('pointercancel',function(){a=false;});
    window.addEventListener('resize',function(){
      pw=w.offsetWidth;
      b.style.setProperty('width',pw+'px','important');
      line.style.marginLeft=Math.round(pw/2)+'px';
    });

    function shimmy(){
      var start=Date.now();
      function tick(){
        var t=Math.min(1,(Date.now()-start)/1100);
        var ease=t<0.3?t/0.3*-3:t<0.6?(t-0.3)/0.3*6-3:(t-0.6)/0.4*-3+3;
        var p=50+ease;
        pw=w.offsetWidth;
        b.style.setProperty('clip-path','inset(0 '+(100-p).toFixed(1)+'% 0 0)','important');
        b.style.setProperty('-webkit-clip-path','inset(0 '+(100-p).toFixed(1)+'% 0 0)','important');
        line.style.marginLeft=(pw*p/100).toFixed(1)+'px';
        if(t<1)requestAnimationFrame(tick);
        else{
          b.style.setProperty('clip-path','inset(0 50% 0 0)','important');
          line.style.marginLeft=Math.round(pw/2)+'px';
        }
      }
      requestAnimationFrame(tick);
    }
    setTimeout(shimmy,1500);
    setInterval(shimmy,5000);
  },100);
})();
