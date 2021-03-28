
// 元件
class Cannon {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = ctx.width / 2;
        this.y = ctx.height - 50 / 2;
        this.color = 'pink';
        this.angle = 0;

    } // constructor

    reNew() {
        // 更新物件數據

        // 更新物件數據

        // 更新繪圖
        let ctx = gameArea.context;
        ctx.save(); //儲存canvas狀態
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height)
        ctx.restore(); //回復canvas狀態
    } // reNew

} //class connon

class Shells {
    constructor(width, height, x, y, color, speed) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = cannon1.angle * Math.PI / 180;

        // 碰撞檢定用的參數，構成物件邊緣的四個點
        // 這四個變數其實不需要寫在這邊
        // this.edgeLeft = this.y;
        // this.edgeRight = this.x + this.width
        // this.edgeTop = this.y;
        // this.edgeBottom = this.y + this.height

        // 目前用不到 fired
        this.fired = false;
        // 速度
        this.speed = speed;
        // 位移量
        this.move = 0;
        this.damage = 1;
    } // constructor

    reNew() {
        // 更新物件數據
        { //碰撞檢測用的參數
            this.edgeLeft = this.x;
            this.edgeRight = this.x + this.width
            this.edgeTop = this.y;
            this.edgeBottom = this.y + this.height
        }
        // 更新物件數據

        // 更新繪圖
        let ctx = gameArea.context;
        ctx.save(); //儲存canvas狀態 
        ctx.fillStyle = this.color;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        // ctx.translate為顯示的位置，非實際位置
        // 可以想做是投影在this.x, this.y這個座標上
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle);
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height)
        ctx.restore(); //回復canvas狀態

        // 執行碰撞檢定
        for (x of fish1) {
            this.hitCheck(x);
        }

    } // reNew

    // 碰撞檢測 
    hitCheck(otherObj) {

        // 檢測的項目並不是物件是否"已重疊"
        // 而是物件是否"沒重疊"，通過if就是沒重疊，未通過則是已重疊
        // let hit = true;
        if (
            (this.edgeLeft > otherObj.edgeRight) ||
            (this.edgeRight < otherObj.edgeLeft) ||
            (this.edgeTop > otherObj.edgeBottom) ||
            (this.edgeBottom < otherObj.edgeTop)
        ) {
            return
        } else {
            otherObj.hp = otherObj.hp - this.damage;
            console.log(otherObj.hp)
            // 我無法delete this，
            // 在想到能輕易的把這個物件刪除或null前，先把它瞬移到遙遠的地方了事
            this.y = -9999;
            if (otherObj.hp <= 0) {
                otherObj.hitResult();
            }
        }

    }// hitCheck

} // class shells

class fishes {
    constructor(x, y, s) {
        this.width = 50;
        this.height = 50;
        this.beginY = y
        this.x = x;
        this.y = y;
        // 使魚上下擺動
        this.swingY = Math.sin(this.x);
        this.color = 'blue';
        // 碰撞檢定用的參數，構成物件邊緣的四個點
        this.edgeLeft = this.x;
        this.edgeRight = this.x + this.width
        this.edgeTop = this.y;
        this.edgeBottom = this.y + this.height
        // this.angle = cannon1.angle;
        // this.fired = false;
        this.speed = s;
        this.hp = 1;

    } // constructor

    reNew() {
        // 更新物件數據
        { //碰撞檢測用的參數
            this.edgeLeft = this.x;
            this.edgeRight = this.x + this.width
            this.edgeTop = this.y;
            this.edgeBottom = this.y + this.height
        }

        // 更新物件數據

        // 更新繪圖
        let ctx = gameArea.context;
        ctx.save(); //儲存canvas狀態
        this.x += this.speed
        // if(this.y >= this.beginY+20 || this.y <= this.beginY-20){
        //     this.swingY= - this.swingY
        // }
        // Math.sin(this.x / a)*b
        // a影響擺動區間，數值越大區間就越大
        // b影響擺動時的速度，數值越大就擺得越快越高
        // y的高低點取決於有多少的擺動空間(a)以及擺動速度(b)
        this.swingY = Math.sin(this.x / 30) * 1.5;
        this.y += this.swingY
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore(); //回復canvas狀態
    } // reNew

    // 與砲彈碰撞的結果
    hitResult() {
        // 分數+1
        score1.text += 1;
        // 因為不知道怎麼刪除或改變this，所以把他瞬移走
        this.y = 9999;
    } // hitResult
} // fishes

class score {
    constructor() {

        this.x = 20;
        this.y = ctx.height - 20;
        this.color = 'white';
        // 得分
        this.text = 0;
        this.fontSize = "50px";
        this.fontFamily = 'Comic Sans MS'

    } // constructor

    reNew() {
        // 更新物件數據

        // 更新物件數據

        // 更新繪圖
        let ctx = gameArea.context;

        // 字體大小與字型
        ctx.font = this.fontSize + " " + this.fontFamily
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y)

    } // reNew
} // score



