

        // 當canvas比螢幕顯示範圍還大時，這個做法可以用滑鼠取得正確的canvas座標
            function getCursorPosition(canvas, event) {
                const rect = canvas.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top
                console.log("x: " + x + " y: " + y)
            }


            gameArea.canvas.addEventListener('mousedown', function (e) {
                getCursorPosition(gameArea.canvas, e)
            });


            // canvas被css改變大小後，這個做法可以用滑鼠取得正確的canvas座標
            gameArea.canvas.addEventListener('mousedown', function (e) {

                // 滑鼠在該元素上的座標，若canvas經過css改變大小
                // 這個座標與canvas的座標就會有誤差
                let mx = e.offsetX
                let my = e.offsetY

                //canvas顯示在螢幕上的width與height，並轉型為浮點數，因為大小不一定是整數
                let cw = parseFloat(getComputedStyle(gameArea.canvas).getPropertyValue('width'))
                let ch = parseFloat(getComputedStyle(gameArea.canvas).getPropertyValue('height'))

                // canvas的原始width與height，也代表著 像素 與 座標
                let pw = gameArea.canvas.width;
                let ph = gameArea.canvas.height;

                // 前面兩者的比值
                let xPercent = pw / cw;
                let yPercent = ph / ch;

                // 將滑鼠座標乘上比值，就可以得到canvas座標
                let cx = mx * xPercent;
                let cy = my * yPercent;


                console.log(cx);
                console.log(cy);


            });








            