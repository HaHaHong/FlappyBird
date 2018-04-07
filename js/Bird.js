function Bird(){
    //所有鸟的图片
    this.image = [game.R["bird0_0"],game.R["bird0_1"],game.R["bird0_2"]];
    //位置，这里的x、y不是小鸟的左上角位置，而是小鸟的中心点
    this.x = game.canvas.width / 2 * 0.618;
    this.y = 100;

    this.dy = 0.2; //下降的速度增量，每帧的恒定变
    this.deg = 0; //旋转角度
    this.wing = 0;//拍打翅膀
}

//渲染小鸟
Bird.prototype.render = function(){
    //改变鸟的原点，x、y，进行旋转
    game.ctx.save();
    game.ctx.translate(this.x,this.y);
    game.ctx.rotate(this.deg);
    //之所以减去24此时是因为x、y是中心点的位置，减去宽度的一半、高度的一半
    game.ctx.drawImage(this.image[this.wing],-24,-24);
    game.ctx.restore();

    //为了方便测试，这里显示小鸟的坐标数值
    // game.ctx.fillStyle = "blue";
    // game.ctx.fillText(this.x1,this.x - 90, this.y);
    // game.ctx.fillText(this.x2,this.x + 30, this.y);
    // game.ctx.fillText(~~(this.y1),this.x - 30, this.y - 30);
    // game.ctx.fillText(~~(this.y2),this.x - 30, this.y + 40);
}
//更新小鸟
Bird.prototype.update = function(){
    //下降的增量0.88，变化的量也在变，这就是自由落体
    this.dy += 0.88;
    this.y += this.dy;
    //旋转的弧度增量
    this.deg += 0.06;

    //当y变化的时候（y是小鸟的中心点）
    //此时小鸟的x1、x2、y1、y2四个包围边也会边，以下是小鸟的盒子的包围包数据
    this.x1 = this.x - 17;
    this.x2 = this.x + 17;
    this.y1 = this.y - 12;
    this.y2 = this.y + 12;


    //每隔2帧拍打以下翅膀
    game.f % 2 == 0 && this.wing++;
    if(this.wing > 2){
        this.wing = 0;
    }
}
//小鸟飞
Bird.prototype.fly = function(){
    //小鸟只要有一个负的dy此时就会立即上飞，因为this.y += 一个数值
    //加的数字如果是负数，此时就是上飞，这个数值会影响蹦的高度
    this.dy = - 10;//小鸟向上飞
    this.deg = -1.28;
}