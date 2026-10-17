/*! Glass Theme - Click Emoji Effect (Vanilla JS) */
(function() {
    'use strict';

    var chars = ['😀','😁','😂','😃','😄','😅','😆','😇','😈','😉','😊','😋','😌','😍','😎','😏','😐','😑','😒','😓','😔','😕','😖','😗','😘','😙','😚','😛','😜','😝','😞','😟','😠','😡','😢','😣','😤','😥','😦','😧','😨','😩','😪','😫','😬','😭','😮','😯','😰','😱','😲','😳','😴','😵','😶','😷'];

    document.addEventListener('click', function(e) {
        // 排除 LuCI 界面中的交互元素，仅在点击空白区域时触发
        var target = e.target;
        if (target.closest && target.closest('a, button, input, select, textarea, label, .cbi-button, .cbi-value-field, .tabs, li')) {
            return;
        }

        var color = "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
        var id = Math.floor(Math.random() * chars.length);
        var xr = Math.ceil(Math.random() * 400) - 200;
        var yr = Math.ceil(Math.random() * 400) - 200;
        var n = Math.round(Math.random() * 10 + 26);
        
        // 使用 pageX/pageY 获取相对于整个文档的绝对坐标
        var x = e.pageX;
        var y = e.pageY;

        var el = document.createElement('b');
        el.textContent = chars[id];
        
        // 纯原生 CSS 样式替代 jQuery.css()
        el.style.cssText = 'z-index:9999;color:' + color + ';top:' + y + 'px;left:' + x + 'px;position:absolute;font-size:' + n + 'px;pointer-events:none;user-select:none;-webkit-user-select:none;-ms-user-select:none;transition:all 1s ease-out;opacity:1;';
        
        document.body.appendChild(el);

        // 使用 requestAnimationFrame 确保初始样式渲染后再执行位移动画（替代 jQuery.animate）
        requestAnimationFrame(function() {
            el.style.top = (y + yr) + 'px';
            el.style.left = (x + xr) + 'px';
            el.style.opacity = '0';
        });

        // 动画结束后移除 DOM 节点（替代 jQuery.remove）
        setTimeout(function() {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }, 1000);
    });
})();
