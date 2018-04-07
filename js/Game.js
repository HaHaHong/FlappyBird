function Game(){
    this.init(); //初始化资源
    this.pipeArr = []; //管子数组，存储所有的管子
    //this.bindEvent(); //监听鼠标事件
    this.score = 0;
}
Game.prototype.init = function(){
    //得到画布
    this.canvas = document.querySelector("canvas");
    //得到2d上下文
    this.ctx = this.canvas.getContext("2d");
    //第二步：创建资源
    this.R = {
        "bg_day" : "images/bg_day.png",
        "land" : "images/land.png",
        "pipe_down" : "images/pipe_down.png",
        "pipe_up" : "images/pipe_up.png",
        "bird0_0" : "images/bird0_0.png",
        "bird0_1" : "images/bird0_1.png",
        "bird0_2" : "images/bird0_2.png",
        "bird1_0" : "images/bird1_0.png",
        "bird1_1" : "images/bird1_1.png",
        "bird1_2" : "images/bird1_2.png",
        "title" : "images/title.png",
        "button_play" : "images/button_play.png",
        "text_ready" : "images/text_ready.png",
        "tutorial" : "images/tutorial.png",
        "gameoverbg" : "images/gameoverbg.png",
        "b0" : "images/b0.png",
        "b1" : "images/b1.png",
        "b2" : "images/b2.png",
        "b3" : "images/b3.png",
        "b4" : "images/b4.png",
        "b5" : "images/b5.png",
        "b6" : "images/b6.png",
        "b7" : "images/b7.png",
        "b8" : "images/b8.png",
        "b9" : "images/b9.png",
        "b10" : "images/b10.png",
        "b11" : "images/b11.png",
    }

    var self = this;//备份this
    var length = Object.keys(this.R).length; //所有资源图片的总数，使用了ES6的语法
    var count = 0; //已经加载完毕的图片的个数

    //遍历R对象中的所有图片
    for(var k in this.R){
        var image = new Image(); //创建img对象
        image.src = this.R[k]; //设置图片路径
        this.R[k] = image; //把资源的字符串变为真img对象

        //当图片加载成功后，进入游戏
        image.onload = function(){
            count++;
            //清屏
            self.clear();
            //显示提示用户文本
            self.ctx.save(); //保存状态
            self.ctx.font = "18px 微软雅黑";
            self.ctx.fillStyle = "blue";
            self.ctx.textAlign = "center";
            self.ctx.fillText(`加载中${count} / ${length}`, self.canvas.width / 2, 100);
            self.ctx.restore(); //恢复上一次保存的状态

            //当已经加载完毕的图片个数等于了总数，此时调用回调函数
            if(count == length){
                self.start(); //加载完成后。可以开始游戏了。
            }
        }
    }
}

//清屏方法
Game.prototype.clear = function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

//游戏开始的主循环
Game.prototype.start = function(){
    var self = this;
    // 实例化background背景类
    // this.background = new Background();
    // //实例化Land大地类
    // this.land = new Land();
    // //实例化Bird小鸟类
    // this.bird = new Bird();

    //实例化场景管理器
    this.sm = new sceneManager();

    this.f = 0; //帧编号初始值
    this.timer = setInterval(function(){
        self.f ++;
        //清屏
        self.clear();

        //渲染场景管理器
        self.sm.render();

        //渲染 和 更新background背景类
        // self.background.render();
        // self.background.update();

        // // 每隔100帧，实例化一根管子类
        // self.f % 120 == 0 && new Pipe();
        // //渲染 和 更新 所有Pipe类的管子
        // for(var i = 0;i < self.pipeArr.length; i++){
        //     self.pipeArr[i].render();
        //     self.pipeArr[i].update();
        // }

        // //渲染 和 更新Land大地类
        // self.land.render();
        // self.land.update();

        // //渲染 和 更新小鸟类
        // self.bird.render();
        // self.bird.update();

        //显示帧编号
        self.ctx.font = "16px 微软雅黑";
        self.ctx.fillStyle = "#fff";
        self.ctx.fillText('帧编号：'+self.f,10,30);
        self.ctx.fillText(self.sm.smNumber+'号场景',10,60);
        self.ctx.fillText("得分："+ self.score,10,90);
    },20);
}

//监听鼠标事件
// Game.prototype.bindEvent = function(){
//     var self = this;
//     this.canvas.onmousedown = function(){
//         self.bird.fly(); //点击鼠标小鸟飞的方法
//     }
// }