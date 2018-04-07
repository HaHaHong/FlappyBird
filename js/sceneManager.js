function sceneManager(){
    //当前场景的编号
    this.smNumber = 3;
    //初始化场景编号
    this.init(3);
    this.bindEvent();
    this.isScore = false; //得分的锁
}
//init初始化场景方法
//不管什么时候来到这个场景，此时都有一个默认就位状态
//我们动画可以触重复的，但是这个函数不是每帧执行。
sceneManager.prototype.init = function(number){
    //init里只有一个初始化参数，不涉及运动
    switch(number){
        case 1:
            //1号场景：游戏封面 和 开始按钮
            this.background = new Background(); // 实例化background背景类
            this.land = new Land();//实例化Land大地类

            this.titleY = -48; //初始化title的位置
            this.titleYTarget = 120; //title要停留的位置

            this.buttonY = game.canvas.height + 70; //初始化button按钮的位置
            this.buttonYTarget = 370; //初始化button按钮的位置

            this.birdY = 170; //初始化小鸟的位置
            this.birdDirection = "down"; //小鸟上下运动的方向
            break;
        case 2:
            //教学场景
            this.background = new Background(); // 实例化background背景类
            this.land = new Land();//实例化Land大地类
            this.readyY = -62; //2号场景ready标题图片的初始位置
            this.readyYTarget = 130; //2号场景ready标题图片的停留的位置

            //tutorial的透明度初始值
            this.tutorialOpacity = 1;
            this.tutorialOpacityDirection = "down";
            break;
        case 3:
            // 3号：游戏的主场景
            this.background = new Background();// 实例化background背景类
            this.land = new Land();//实例化Land大地类
            this.bird = new Bird();//实例化Bird小鸟类
            break;
        case 4:
            this.background = new Background();// 实例化background背景类
            this.land = new Land();//实例化Land大地类
            //红色边框的图片的透明度
            this.bgopcity = 1;
            //小鸟落地死亡的爆炸动画初始图片序号
            this.boom = 0;
            break;
    }
}

//场景渲染方法
sceneManager.prototype.render = function(){
    //这里才是真正的渲染和更新方法，这里可以写动画，因为game类里面render次方法。
    switch(this.smNumber){
        case 1:
            //渲染 和 更新background背景类
            this.background.render();
            this.background.update();
            //渲染 和 更新Land大地类
            this.land.render();
            this.land.update();

            //渲染title
            game.ctx.drawImage(game.R["title"],(game.canvas.width - 178) / 2, this.titleY);
            //渲染button按钮
            game.ctx.drawImage(game.R["button_play"],(game.canvas.width - 116) / 2, this.buttonY);
            //渲染小鸟
            game.ctx.drawImage(game.R["bird1_2"],(game.canvas.width - 48) / 2, this.birdY);

            //title要下降运动
            this.titleY+=2;
            if(this.titleY > this.titleYTarget){
                this.titleY = this.titleYTarget;
            }

            //title要下降运动
            this.buttonY -= 5;
            if(this.buttonY < this.buttonYTarget){
                this.buttonY = this.buttonYTarget;
            }
            //小鸟不停的上下运动

            if(this.birdDirection == "down"){
                this.birdY+=2;
                if(this.birdY > 250){
                    this.birdDirection = "up";
                }
            }else if(this.birdDirection == "up"){
                this.birdY-=2;
                if(this.birdY < 180){
                    this.birdDirection = "down";
                }
            }
            break;
        case 2:
             //渲染 和 更新background背景类
            this.background.render();
            this.background.update();
            //渲染 和 更新Land大地类
            this.land.render();
            this.land.update();

            //渲染ready标题图片
            game.ctx.drawImage(game.R["text_ready"],(game.canvas.width - 196) / 2, this.readyY);
            //ready标题要下降运动
            this.readyY+=5;
            if(this.readyY > this.readyYTarget){
                this.readyY = this.readyYTarget;
            }

            //让一物体闪烁
            game.ctx.save();
            if(this.tutorialOpacityDirection == "down"){
                this.tutorialOpacity-= 0.03;
                if(this.tutorialOpacity <= 0.05){
                    this.tutorialOpacityDirection = "up";
                }
            }else if(this.tutorialOpacityDirection == "up"){
                this.tutorialOpacity += 0.03;
                if(this.tutorialOpacity >= 1){
                    this.tutorialOpacityDirection = "down";
                }
            }
            //globalAlpha改变透明度API
            game.ctx.globalAlpha = this.tutorialOpacity;
            //渲染tutorial图片
            game.ctx.drawImage(game.R["tutorial"],(game.canvas.width - 114) / 2, 250);
            game.ctx.restore();

            game.ctx.drawImage(game.R["bird0_0"],100 , 170);
            break;
        case 3:
            //渲染 和 更新background背景类
            this.background.render();
            this.background.update();

            // 每隔100帧，实例化一根管子类
            game.f % 100 == 0 && new Pipe();
            //渲染 和 更新 所有Pipe类的管子
            for(var i = 0;i < game.pipeArr.length; i++){
                game.pipeArr[i].render();
                game.pipeArr[i].update();
            }

            //渲染 和 更新Land大地类
            this.land.render();
            this.land.update();

            //渲染 和 更新小鸟类
            this.bird.render();
            this.bird.update();

            break;
        case 4:
            //让所有物体静止，只渲染不更新（update不用调用了）
            this.background.render();
            //渲染 和 更新 所有Pipe类的管子
            for(var i = 0;i < game.pipeArr.length; i++){
                game.pipeArr[i].render();
            }

            this.land.render();
            this.bird.render();
            document.getElementById("down").play();
            //让鸟的Y值，急速减少
            this.bird.y += 20;
            this.bird.deg += 0.5;
            //保证鸟头朝下
            if(this.bird.deg > 1.57){
                this.bird.deg = 1.57
            }
            //撞击地面产生爆炸动画
            if(this.bird.y > game.canvas.height - 112){
                this.bird.y = game.canvas.height - 112 - 15;
                //每个2帧换一张图
                game.f % 2 == 0 && this.boom++;
                if(this.boom >= 11){
                    this.boom = 11;
                    //死亡后，重新回到一号场景开始游戏
                    this.smNumber = 1;
                    this.init(1);
                    //清空管子数组
                    game.pipeArr = [];
                }
                game.ctx.drawImage(game.R["b"+this.boom],this.bird.x-50, this.bird.y-100);
            }

            //渲染红色图片边框
            this.bgopcity -= 0.03;
            if(this.bgopcity < 0){
                this.bgopcity = 0;
            }

            game.ctx.save();
            game.ctx.globalAlpha = this.bgopcity;
            game.ctx.drawImage(game.R["gameoverbg"],0,0, game.canvas.width,game.canvas.height);
            game.ctx.restore();
            break;
    }
}

//监听鼠标事件
sceneManager.prototype.bindEvent = function(){
    var self = this;
    //添加监听，要根据当前是几号场景，触发相对应的场景事件。
    game.canvas.onmousedown = function(event){
        var x = event.offsetX;
        var y = event.offsetY;
        switch(self.smNumber){
            case 1:
                var left = (game.canvas.width -116) / 2
                var right = (game.canvas.width -116) / 2 + 116;
                var up = self.buttonYTarget;
                var down = self.buttonYTarget + 60;
                if(x >= left && x <= right && y >= up && y <= down){
                    //点击按钮进入2号场景
                    self.smNumber = 2;
                    self.init(2);
                }
                break;
            case 2:
                var left = (game.canvas.width -114) / 2
                var right = (game.canvas.width -114) / 2 + 116;
                var up = 250;
                var down = 350;
                if(x >= left && x <= right && y >= up && y <= down){
                    //点击按钮进入3号场景
                    self.smNumber = 3;
                    self.init(3);
                }

                break;
            case 3:
                document.getElementById("fly").play();
                self.bird.fly(); //点击鼠标小鸟飞的方法
                break;
        }
    }

     game.canvas.addEventListener("keydown",function(event){
        console.log(event.keyCode);
        switch(self.smNumber){
            case 1:
                break;
            case 2:
                break;
            case 3:
                if(event.keyCode == 32){
                    document.getElementById("fly").play();
                    self.bird.fly(); //点击鼠标小鸟飞的方法
                }
                break;
        }
    },true);
    game.canvas.focus();
}