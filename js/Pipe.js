function Pipe(){
    //两根管子，一根向上，一根向下
    this.pipeDown = game.R["pipe_down"];  //上面管子
    this.pipeUp = game.R["pipe_up"];     //下面管子

    this.pipeDownHeight = _.random(50,300); //上面管子的高度（因）随机一个高度
    this.kongge = 130; //上下管子之间的间隙（因）
    //下面管子的高度随之而定了（果），高度-大地的高 - 上管子高度 - 间隙
    this.pipeUpHeight = game.canvas.height - this.pipeDownHeight - this.kongge;
    this.x = game.canvas.width; //管子的初始位置，让它初始在屏幕外面
    game.pipeArr.push(this); //将所有管子类，放入数组
}

//渲染管子方法
Pipe.prototype.render = function(){
    //渲染上管子
    game.ctx.drawImage(this.pipeDown, 0,400 - this.pipeDownHeight, 52, this.pipeDownHeight,this.x ,0,52, this.pipeDownHeight);

    //渲染下管子
    game.ctx.drawImage(this.pipeUp, 0,0 , 52, this.pipeUpHeight,this.x ,this.pipeDownHeight + this.kongge,52, this.pipeUpHeight);


     //为了方便测试，这里显示小鸟的坐标数值
    // game.ctx.fillStyle = "blue";
    // game.ctx.fillText(this.x1,this.x - 30, this.pipeDownHeight + this.kongge / 2);
    // game.ctx.fillText(this.x2,this.x + 60, this.pipeDownHeight + this.kongge / 2);
    // game.ctx.fillText(~~(this.y1),this.x, this.pipeDownHeight + 10);
    // game.ctx.fillText(~~(this.y2),this.x, this.pipeDownHeight + this.kongge);
}
//更新管子方法，让管子出现
Pipe.prototype.update = function(){
    this.x -= 2; //更新管子（让管子移动）

    //管子的包围边
    this.x1 = this.x;
    this.x2 = this.x + 52;
    this.y1 = this.pipeDownHeight;
    this.y2 = this.pipeDownHeight + this.kongge;

    //碰撞检测，写在管子类的原因，是因为写在小鸟类里面需要循环遍历管子
    if(game.sm.bird.x2 > this.x1 && game.sm.bird.x1 < this.x2 && (game.sm.bird.y1 < this.y1 || game.sm.bird.y2 > this.y2) || game.sm.bird.y2 > game.canvas.height - 112){
        //clearInterval(game.timer); //碰撞后停止游戏
        //alert("Game over！");
        //死亡之后，进去场景4，小鸟下坠
        game.sm.smNumber = 4;
        game.sm.init(4);
        document.getElementById("die").play();
    }else if(!this.isScore && game.sm.bird.x1 > this.x2){
        this.isScore = true;
        game.score++;
        document.getElementById("score").play();
    }

    if(this.x < -300){
        this.goDie(); //删除管子
    }
}

//自杀方法
Pipe.prototype.goDie = function(){
    //释放数组（删除超出了画面的管子）
    game.pipeArr = _.without(game.pipeArr,this);
}