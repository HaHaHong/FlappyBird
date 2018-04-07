# FlappyBird
development of canvas games 
游戏结构:
游戏中采用中介者模式，Game类统领全局，负责读取资源，设置游戏主循环（定时器），维护各种演员的实例，也就说所有的演员都是Game类new出来的。
游戏项目以外部的语句就一条
var game = new Game()
其他所有语句都在Game类。
需要的类：
Game类：中介者
Brid类：小鸟类，这个类是单例的，实例化一次
Pipe类：管子类
Land类：大地类
background类：背景类
<canvas id="canvas" width="414" height="650"></canvas>
<script type="text/javascript" src="js/underscore-min.js"></script>
<script type="text/javascript" src="js/Game.js"></script>
<script type="text/javascript" src="js/Background.js"></script>
<script type="text/javascript" src="js/Land.js"></script>
<script type="text/javascript" src="js/Pipe.js"></script>
<script type="text/javascript" src="js/Bird.js"></script>
<script type="text/javascript">
var game = new Game();
</script>
