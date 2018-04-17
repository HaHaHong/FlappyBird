# FlappyBird
### development of canvas games
#### 一、游戏结构:
游戏中采用中介者模式，Game类统领全局，负责读取资源，设置游戏主循环（定时器），维护各种演员的实例，也就说所有的演员都是Game类new出来的。
游戏项目以外部的语句就一条
***var game = new Game()***
其他所有语句都在Game类。<br/>
#### 需要的类：
 * Game类：中介者<br/>
 * Brid类：小鸟类，这个类是单例的，实例化一次<br/>
 * Pipe类：管子类<br/>
 * Land类：大地类<br/>
 * background类：背景类<br/>
 ```
<canvas id="canvas" width="414" height="650"></canvas><br />
<script type="text/javascript" src="js/underscore-min.js"></script><br /> 
<script type="text/javascript" src="js/Game.js"></script><br /> 
<script type="text/javascript" src="js/Background.js"></script><br /> 
<script type="text/javascript" src="js/Land.js"></script><br /> 
<script type="text/javascript" src="js/Pipe.js"></script><br /> 
<script type="text/javascript" src="js/Bird.js"></script><br /> 
<script type="text/javascript"><br /> 
   var game = new Game();<br /> 
</script>
```
----------------------
#### 二、碰撞检测:
小鸟的碰撞检测使用AABB盒的方法，就是把小鸟看做一个矩形，去判断有没有碰到。<br /> 
AABB盒，轴对齐包围也称为矩形盒。 [包围球碰撞检测方法学习的一个网站](https://www.cnblogs.com/lyggqm/p/5386174.html/)<br /> 
碰撞检测的逻辑图：<br /> 
![](C:\Users\Administrator\Desktop\图片.jpg)
碰撞检测写在管子身上，因为管子有很多，只需要检测有没有碰撞那唯一的一只小鸟，没有for循环。<br /> 
如果写在鸟身上，此时要用for循环循环所有的管子，一一检测。<br /> 

------------------------ 
