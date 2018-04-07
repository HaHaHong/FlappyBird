function Land(){
    this.image = game.R["land"]; //自己的背景图
    this.x = 0; //图片的初始位置
}

//渲染大地
Land.prototype.render = function(){
    //336、112是图片的宽度、高度
    game.ctx.drawImage(this.image, this.x, game.canvas.height - 112);
    game.ctx.drawImage(this.image, this.x + 336, game.canvas.height - 112);
    game.ctx.drawImage(this.image, this.x + 336 * 2, game.canvas.height - 112);
}
//更新大地，让大地移动
Land.prototype.update = function(){
    this.x -= 2;
    if(this.x < -336){
        this.x = 0;
    }
}