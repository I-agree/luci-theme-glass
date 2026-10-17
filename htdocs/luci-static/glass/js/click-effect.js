/*! Glass Theme - Click Emoji Effect (Vanilla JS) */
(function() {
    'use strict';

    var chars = ['😀','😁','😂','😃','😄','😅','😆','😇','😈','😉','😊','😋','😌','😍','😎','😏','😐','😑','😒','😓','😔','😕','😖','😗','😘','😙','😚','😛','😜','😝','😞','😟','😠','😡','😢','😣','😤','😥','😦','😧','😨','😩','😪','😫','😬','😭','😮','😯','😰','😱','😲','😳','😴','😵','😶','😷'];

    // 提取创建单个表情的函数，方便复用
    function createEmoji(x, y, sizeBase, xr, yr) {
        var color = "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
        var id = Math.floor(Math.random() * chars.length);
        var n = Math.round(Math.random() * 10 + sizeBase);

        var el = document.createElement('b');
        el.textContent = chars[id];
        
        // 纯原生 CSS 样式替代 jQuery.css
        el.style.cssText = 'z-index:9999;color:' + color + ';top:' + y + 'px;left:' + x + 'px;position:fixed;font-size:' + n + 'px;pointer-events:none;user-select:none;-webkit-user-select:none;-ms-user-select:none;transition:all 1s ease-out;opacity:1;';
        
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
    }

    document.addEventListener('click', function(e) {
        // 排除 LuCI 界面中的交互元素，仅在点击空白区域时触发
        var target = e.target;
        if (target.closest && target.closest('a, button, input, select, textarea, label, .cbi-button, .cbi-value-field, .tabs, li')) {
            return;
        }

        var x = e.clientX;
        var y = e.clientY;

        // 生成随机的漂浮方向和距离
        var xr = Math.ceil(Math.random() * 400) - 200;
        var yr = Math.ceil(Math.random() * 400) - 200;

        // 1. 创建第一个表情（对应原代码 click 逻辑，sizeBase 为 26）
        createEmoji(x, y, 26, xr, yr);

        // 2. 创建第二个表情（对应原代码 mousemove 逻辑，sizeBase 为 16）
        // 位置偏移：左移 20px，上移 20px；漂浮方向取反以形成散开效果
        createEmoji(x - 20, y - 20, 16, -xr, -yr);
    });
})();
