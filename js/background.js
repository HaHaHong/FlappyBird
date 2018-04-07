function Background(){
    this.image = game.R["bg_day"]; //自己的背景图
    this.x = 0; //图片的初始位置
}

//渲染背景图
Background.prototype.render = function(){
    //画一个矩形，补充天空的颜色
    game.ctx.save();
    game.ctx.fillStyle = "#4ec0ca";
    game.ctx.fillRect(0,0, game.canvas.width, game.canvas.height - 512);
    //为了不穿帮，绘制背景连续放3张图片实现无缝滚动，288,512分半是图片的宽和高
    game.ctx.drawImage(this.image, this.x , game.canvas.height - 512);
    game.ctx.drawImage(this.image, this.x + 288 , game.canvas.height - 512);
    game.ctx.drawImage(this.image, this.x + 288 * 2 , game.canvas.height - 512);
    game.ctx.restore();
}
//更新背景图，让背景移动
Background.prototype.update = function(){
    //背景左移动，小于背景的负宽度的时候，让x 回到0
    //当猫腻背景达到最左边，立刻拉回，JS基础时代的无缝滚动。
    this.x--;
    if(this.x < -288){
        this.x = 0;
    }
}