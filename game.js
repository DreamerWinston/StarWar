

window.onload =initGame();

/**
 * 
 * 
 * 游戏加载
 * 
 * 
 */


// 加载元素资源
function loadSources(){

    // 游戏屏幕
    game_screen =document.getElementById('game_screen');


    loadBackGroundView();
    setSourceTimer();
    
    loadFirstPlayView();
 }

// 加载游戏
 function loadGame(){
    //  敌人数量
    enemyCount = 50;

    // 当前敌机数量
    currentPlaneCount =0;

    // 最大同屏飞机数
    maxPlaneCount =50;

    // 子弹数量
    bulletCount =50;

    // 敌机子弹数量
    enemyBulletCount =20;

    currentEBulletCount =0;

    // 飞机ID数组
    arrayID =new Array();

     //初始化敌机
     arrayEnemy =new Array();

     //初始化子弹
    arrayBullet =new Array();

    //初始化敌机子弹
    arrayEnemyBullet =new Array();


    // 当前分数
    currentScore =0;

    // 当前油量
    currentOil =0;

    // 油量
    arrayFuel =new Array();

    // 是否暂停
    isPause =false;

    //是否存活
    isAlive =true;
 }

 function musicShoot(){
    // var a =document.getElementById('shoot');
    var a =document.createElement('audio');
    a.src ="sound/shoot.mp3";
    a.play();
 }

 function musicDestory(){
    var a =document.createElement('audio');
    a.src ="sound/destroyed.mp3";
    a.play();
 }

     // 初始化游戏
 function initGame(){
    loadSources();
    loadGame();    
 }


//游戏开始 删除第一次的view
function startGame(){

    currentOil =15;
    game_screen.removeChild(getView('firstView'));

  
    loadScoreMenu();

    
    setTimer();

    createEnemy();
    createPlane();
    createBullet();
    createEnemyBullet();
    createfuel();

}

function setSourceTimer(){
    setInterval(moveBackGround,1);
}

function setTimer(){
    // 移动背景
 

    // 设置敌机
    var timerSetEnemy =setInterval(setEnemyPlane,1000);
// 敌机下落
  var timerEnemy = setInterval(enemyDown,20);   

//   回收敌机
  var timerReciveEnemy = setInterval(reciveEnemy,10);


  var timerBullet = setInterval(setBullet ,350);

  var timerUpBullet = setInterval(upBullet,1);

  var timerJudgeBullet = setInterval(judgeBullet,0.1);

var timerSetEnemyBullet = setInterval(setEnemyBullet,2350);
var timerUpEnemyBullet =  setInterval(upEnemyBullet,1);
var timerJudgeMyPlane  = setInterval(judgeMyPlane,0.1);
 var timerCheckOil = setInterval(checkOil ,1000);
 var timerDownFuel = setInterval(downFuel,1);
 var timerReciveFuel = setInterval(reciveFuel,1000);

 gametimer =[timerSetEnemy,timerEnemy,timerReciveEnemy,timerBullet,timerUpBullet,timerJudgeBullet,timerSetEnemyBullet,timerUpEnemyBullet,timerJudgeMyPlane,timerCheckOil,timerDownFuel,timerReciveFuel];
}

function stopTimer(){
    for (let index = 0; index < gametimer.length; index++) {
        const element = gametimer[index];
        clearInterval(element);
    }
}


/**
 * 
 * 个人工具类
 * 
 * 
 * 
 * 
 * 
 */

function addViewById(id){
    var view =document.createElement('div');
    view.id =id;
    return view;
}

function addViewByClass(className){
    var view =document.createElement('div');
    view.className =className;
    return view;
}

function addView(id,tag){
    var view =document.createElement(tag);
    view.id =id;
    return view;
}

function getView(id){
    var view =document.getElementById(id);
    return view;
}

function getScouce(name){
    var sources ={

    }

}



function frameContect(box0,box1){

    var x0 = parseInt(box0.style.left);
    var y0 = parseInt(box0.style.top);
    var width0 = parseInt(box0.clientWidth);
    var height0 = parseInt(box0.clientHeight);

    var x1 = parseInt(box1.style.left);
    var y1 = parseInt(box1.style.top);
    var width1 = parseInt(box1.clientWidth);
    var height1 = parseInt(box1.clientHeight);
    
    //第一个盒子左上角（x0,y0)在第二个盒子里
    if(x0 >= x1 && x0 <=x1+width1 && y0 >=y1 && y0 <=y1+height1)
    {
        return true;//碰上了
    }
    //第一个盒子右上角(x0+width0,y0)在第二个盒子里
    else if(x0+width0 >= x1 && x0+width0 <=x1+width1 && y0 >=y1 && y0 <=y1+height1)
    {
        return true;//碰上了
    }
    //第一个盒子左下角(x0,y0+height0)在第二个盒子里
    else if(x0 >= x1 && x0 <=x1+width1 && y0+height0 >=y1 && y0+height0 <=y1+height1)
    {
        return true;//碰上了
    }
    //第一个盒子右下角(x0+width0,y0+height0)在第二个盒子里
    else if(x0+width0 >= x1+width0 && x0 <=x1+width1 && y0+height0 >=y1 && y0+height0 <=y1+height1)
    {
        return true;//碰上了
    }
    return false;
}


function frameAnimation(enemyL,pics){

    var index=0;

    

    function run(){
        var url =pics[index];
        if(index >= pics.length){
            enemyL.reset();
            return;
        }

        enemyL.div.style.backgroundImage = 'url(' + url + ')';
        enemyL.div.style.backgroundRepeat = 'no-repeat'; 

        index++;
        oTimer =setTimeout(run,160);        
    }

    run();

}



/**
 * 星战游戏
 * 
 * 
 * 所需模块
 * 1.游戏背景
 * 2.游戏配置 -> 分数,敌机,速度等
 * 3.飞机模块 -> 我方飞机
 *         |
 *         ---> 敌方飞机
 * 4.游戏规则
 * 5.游戏声音
 * 6.游戏兼容性
 * 
 * 游戏流程
 * 1.页面加载
 * 2.游戏介绍+游戏开始按钮
 * 3.游戏进行中
 * 4.游戏暂停
 * 5.游戏结束
 * 
 */



 /**
  * 
  * 飞机模块
  * 
  */

function MyPlane(){

}

function planeAni(){
    var index =0;
    function run(){
        index =index==1?0:1;

        var url =myPlane.anis[index];
       
        myPlane.div.style.backgroundImage = 'url(' + url + ')';
        myPlane.div.style.backgroundRepeat = 'no-repeat'; 

        oTimer =setTimeout(run,160);     
        
    }
    if(isAlive){
        run();
    }
    
}
function MyBullet(id,type,div){
    this.id =id;
    this.type =type;
    this.div =div ;

    this.reset =function(){
        // screen.removeChild(this.div);
        this.type=0;
        this.div.style.left ='-50px';
        this.div.style.top ='-50px';

    }
}

function EnemyBullt(id,type,div){
    this.id =id;
    this.type =type;
    this.div =div ;

    this.reset =function(){
        // screen.removeChild(this.div);
        this.type=0;
        this.div.style.left ='-50px';
        this.div.style.top ='-50px';

    }
}

function EnemyPlane(name,type){
    var localType =['enemy','enemy_m','enemy_boss','aestroid_brown','aestroid_dark','aestroid_gray_2','aestroid_gray'];
    var scoreType =[5,5,5,10,10,10,10];
    var health =[1,1,1,2,2,2,2];
    var eclassName=localType[type];

    
    this.id ='enemy'+eclassName+name;
    this.num =name;
    this.modelType =type;
    this.health =health[type];
    this.score =scoreType[type];
    var bool =vaildateID(this.id);
    if(!bool)return -1;
    // 如果敌机已存在 则返回-1;

    this.pointX =0;
    this.pointY =0;
    // 坐标

    
    

    this.type =0;
    //0为未显示已收回,1为正在游戏中,2为动画中.



    this.create =function (){
        
        this.div= document.createElement('div');
        // console.log(enemy);
        // console.log(1);

        this.div.className =eclassName;
        this.div.id =this.id;

        arrayEnemy.push(this);
        arrayID.push(this.id);

    }

    this.reset =function (){

        var left =document.documentElement.clientWidth+Math.floor(Math.random()*(document.documentElement.clientWidth));
        this.div.style.left = left +'px' ;

        var top =100+Math.floor(Math.random()*(document.documentElement.clientHeight-200));
        this.div.style.top = top+'px' ;
        this.type=1;
        this.changeType(this.modelType);
        
    }

    this.changeType =function(type){
        var localType =['enemy','enemy_m','enemy_boss','aestroid_brown','aestroid_dark','aestroid_gray_2','aestroid_gray'];
        var eclassName=localType[type];
        this.div.className =eclassName;
        this.modelType =type;
        
        switch (type) {
            case 0:
              {
                this.div.style.height='45px';
                this.div.style.width='30px';
                this.div.style.backgroundImage = "url('images/diji.png')";
              }  
                break;
                case 1:
                {
                    this.div.style.height='85px';
                this.div.style.width='98px';
                this.div.style.backgroundImage = "url('images/enemy1.png')";

                }
                break;
                case 2:
                {
                    this.div.style.height='120px';
                this.div.style.width='200px';
                this.div.style.backgroundImage = "url('images/enemy2_n1.png')";

                }
                break;
        
            default:
            {

                this.div.style.height='100px';
                this.div.style.width='100px';
                var ra =Math.floor(Math.random()*3);

                this.div.style.backgroundImage ="url('images/"+['aestroid_brown','aestroid_dark','aestroid_gray_2','aestroid_gray'][ra]+".png')";

            }
                break;
        }
    }


    this.boom =function(){
        
        this.type =0;
        this.reset();
    }

    this.pics =function (){

        switch (this.modelType) {
            case 0:
                {
                    return ['images/bz1.png','images/bz2.png','images/bz3.png','images/bz4.png','images/bz5.png']
                }
                break;
                case 1:
                {
                    return ['images/enemy1_down1.png','images/enemy1_down2.png','images/enemy1_down3.png','images/enemy1_down4.png']
                }
                break;
                case 2:
                {
                    return ['images/enemy2_down1.png','images/enemy2_down2.png','images/enemy2_down3.png','images/enemy2_down4.png','images/enemy2_down5.png','images/enemy2_down6.png']
                }
                break;
        

                
            default:
            {
                return ['images/bz3.png'];
            }
                break;
        }
    }
}



 /**
  * 
  * 飞机模块
  * 
  */



  
function loadFirstPlayView(){
    var firstView =addViewById('firstView');

    firstView.appendChild(instructionsView());
    firstView.appendChild(logoView()); 
    logoPlay();
    
    game_screen.appendChild(firstView);
}

function instructionsView(){
    var instructView =addViewById('instructView');


    var instruct=`如何玩星战。

    1.使用屏幕上的敏感区域移动飞船；
    2.计时器呈现的时间过期了；
    3.燃料计数器显示剩余燃料；
    4.在飞行过程中，飞船需要摧毁太空中的小行星和敌舰；
    5.你可以拍摄按空格键；
    6.如果宇宙飞船撞上小行星或其他宇宙飞船，你将失去15个点的燃料；
    7.敌人的飞船需要一个射击才能被摧毁，你将得到5分的敌人被摧毁；
    8.小行星需要2次射击才能被摧毁，你将得到每颗小行星被摧毁的10分；
    9.如果你摧毁了一艘友好的宇宙飞船，你会损失10分；
    10.在飞行过程中，飞船需要在太空中收集燃料；
    11.你可以暂停游戏点击一个按钮暂停，或按字母“p”；
    12.超越一切限度；太空之战与星战锦标赛.。
    
    How to Play Star Battle.

    1. Move the spaceship using the sensible areas in the screen;
    2. The timer present the time lapsed;
    3. The fuel counter show the remain fuel;
    4. During the flight, the spaceship needs to destroy the asteroids and enemy spaceships that are presented in the space;
    5. You can shoot pressing Space Bar;
    6. If the spaceship hits a asteroid or another spaceship, you lose 15 points of fuel;
    7. Enemy spaceship needs 1 shot to be destroyed, you will get 5 points for each enemy destroyed;
    8. Asteroid needs 2 shots to be destroyed, you will get 10 points for each asteroid destroyed;
    9. If you destroy a friendly spaceship, you lose 10 points;
    10. During the flight, the spaceship needs to collect fuel in the space;
    11. You can pause the game clicking in a button pause, or pressing the letter "p";
    12. Go beyond all limits;
    Battle in Space with Star Battle Championship...`;

    instructView.innerText =instruct;

    instructView.appendChild(btnPlay());

    return instructView;

}

function logoView(){
     logoView =addViewById('logoView');
    logoView.style.left=document.documentElement.clientWidth/2+120 +'px';
    logoView.style.top ='20px';
    return logoView;
}

function logoPlay(){
    var index =0;
    function run(){
        index =index==1?0:1;
        var url =['logo/logo-01.png','logo/logo-02.png'][index];
         logo =logoView;

        logo.style.backgroundImage = 'url(' + url + ')';
        logo.style.backgroundRepeat = 'no-repeat'; 
 
        oTimer =setTimeout(run,320);     
        
    }
 
    run();
   
}

function btnPlay(){
    var btnPlay =addView('btnPlay','button');
    btnPlay.innerText ='开始游戏'
    btnPlay.className ='btn btn-info';
    btnPlay.style.left =300-40+'px';
    btnPlay.style.top ='650px';
    btnPlay.onclick =startGame;
    return btnPlay;
}

function loadBackGroundView(){
    backGround1 =document.createElement('div');

    backGround1.className='background';
    backGround1.style.top='0px';
    backGround1.style.left='0px';


    game_screen.appendChild(backGround1);

    backGround2 =document.createElement('div');

    backGround2.className='background';
    backGround2.style.top='0px';
    backGround2.style.left=document.documentElement.clientWidth;
    game_screen.appendChild(backGround2);
}

function moveBackGround(){


    var topX = parseFloat(backGround1.style.left);
        topX-=0.9;
        backGround1.style.left =topX + 'px';

        if(parseInt(backGround1.style.left)<-document.documentElement.clientWidth){
            backGround1.style.left=document.documentElement.clientWidth;
        }
        var topX2 = parseFloat(backGround2.style.left);
        topX2-=0.9;
        backGround2.style.left =topX2 + 'px';

        if(parseInt(backGround2.style.left)<-document.documentElement.clientWidth){
            backGround2.style.left=document.documentElement.clientWidth;
        }

}

function loadScoreMenu(){
    menu ={};
    menu.div =addViewById('score_menu');

    menu.score =addViewById('menu_score');
    menu.score.innerText ="得分:0";

    menu.oil =addViewById('menu_oil');
    menu.oil.innerText ="燃料:15秒";

    menu.pause =addViewById('menu_pause');
    menu.pause.onclick=function(){

        isPause =!isPause;

        menu.pause.style.backgroundImage =isPause? "url('images/game_resume_nor.png')": "url('images/game_pause_nor.png')";

        isPause?stopTimer():setTimer();
    }



    menu.mute =addViewById('menu_mute');
    menu.mute.innerText ="静音";



    var  views =[ menu.score , menu.oil, menu.mute,menu.pause];

    for (let index = 0; index < views.length; index++) {
        const element = views[index];
        element.style.left  =index *300 +20+'px';
        element.style.top ='20px';
        element.style.display ='inline';
        element.style.fontSize ='30px';


        menu.div.appendChild(element);
    }

    menu.pause.style.left =document.documentElement.clientWidth-90+'px';
    menu.mute.style.left =document.documentElement.clientWidth-380+'px';

    game_screen.appendChild(menu.div);
}

function createEnemy(){
    for (let index = 0; index < enemyCount; index++) {
        var enemy =new EnemyPlane(index,0);

        enemy.create();
    }
}

// 设置敌机

function setEnemyPlane(){
    for (let index = 0; index < arrayEnemy.length; index++) {
        // const enemy = arrayEnemy[index];


        if (currentPlaneCount==maxPlaneCount){
            break;
        }
        var enemy =arrayEnemy[index];

        if(enemy.type==1)continue;

        if (currentPlaneCount%12 ==0){
            setEnemy_m();   
        }else if (currentPlaneCount%16 ==0){
            setEnemy_Boss();
        }else{
            enemy.changeType(0);
        }

        if(currentPlaneCount%9==0){

            var ra =2+Math.floor(Math.random()*3);

            enemy.changeType(ra);

        }

        
        enemy.reset();
        game_screen.appendChild(enemy.div);
        currentPlaneCount +=1;

    }

    function setEnemy_m(){
        enemy.changeType(1);
    }

    function setEnemy_Boss(){
        enemy.changeType(2);
    }
}



// 敌机下落

function enemyDown(){

  

    for (let index = 0; index < arrayEnemy.length; index++) {

        var enemy =arrayEnemy[index];
        if(enemy.type!=1){continue;}
        var topX = parseFloat(enemy.div.style.left);
        
        switch (enemy.modelType) {
            case 0:
                {
                    topX-=1+enemy.num*0.1;
                }
                break;
                case 1:
                {
                    topX-=4;
                }
                break;
                case 2:
                {
                    topX-=6;   
                }
                break;
        
            default:
            {
                topX-=8;   
            }
                break;
        }

        enemy.div.style.left =topX + 'px';

    }
}
//回收飞机

function reciveEnemy(){
    for (let index = 0; index < arrayEnemy.length; index++) {

        var enemy =arrayEnemy[index];


        if(parseInt(enemy.div.style.left)<-50){

            enemy.type=0;
            enemy.reset();
        }

    }

    
}

function vaildateID(name){
    for (let index = 0; index < arrayID.length; index++) {
        const tmpID = arrayID[index];
 
      if(tmpID ==name){
         return false;
      }
      
    }
    return true;
 }
 


function createPlane(){
    myPlane={};
   var planeDiv =document.createElement('div');
   myPlane.div =planeDiv;
   myPlane.div.id ='plane';
   myPlane.className='plane';

   // plane.style.left ='200px';
   // plane.style.top ='200px';
   myPlane.div.style.left=100+'px';
   myPlane.div.style.top =(document.documentElement.clientHeight-90)/2 +'px';

   myPlane.pics =function(){return ['images/bz3.png','images/bz4.png','images/bz5.png'];};

   myPlane.anis=['images/plane1.png','images/plane2.png'];
   

   myPlane.reset=function(){

   }

   game_screen.appendChild(myPlane.div);
   var drag = planeDiv;

               //点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
               drag.onmousedown = function(e) {
                   var e = e || window.event; //兼容ie浏览器
                   var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
                   var diffY = e.clientY - drag.offsetTop;

                   /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
                    解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
                    可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
                    限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/
                   if(typeof drag.setCapture!='undefined'){
                       drag.setCapture();
                   }
                   document.onmousemove = function(e) {
                       var e = e || window.event; //兼容ie浏览器
                       var left=e.clientX-diffX;
                       var top=e.clientY-diffY;

                       //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                       if(left<0){
                           //left=0;
                       }else if(left >window.innerWidth-drag.offsetWidth){
                           left = window.innerWidth-drag.offsetWidth;
                           //left = window.innerWidth;
                       }
                       if(top<0){
                           //top=0;
                       }else if(top >window.innerHeight-drag.offsetHeight){
                           top = window.innerHeight-drag.offsetHeight;
                           //top = window.innerHeight;
                       }

                       //移动时重新得到物体的距离，解决拖动时出现晃动的现象
                       drag.style.left = left+ 'px';
                       drag.style.top = top + 'px';
                   };
                   document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动
                       this.onmousemove = null;
                       this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

                       //修复低版本ie bug
                       if(typeof drag.releaseCapture!='undefined'){
                           drag.releaseCapture();
                       }
                   };
               };

               planeAni();
}




function createBullet(){
    for (let index = 0; index < bulletCount; index++) {
     var bullet = document.createElement('div');
     bullet.className='plane_bullet';
     
    
     var bulletID ='bulletID'+index;
     var bullet1 =new MyBullet(bulletID,0,bullet);
 
     arrayBullet.push(bullet1);
 
        
    }
 }
function createEnemyBullet(){
    for (let index = 0; index < enemyBulletCount; index++) {
        var bullet = document.createElement('div');
        bullet.className='enemy_bullet';
        
       
        var bulletID ='enemyBulletID'+index;
        var bullet1 =new EnemyBullt(bulletID,0,bullet);
    
        arrayEnemyBullet.push(bullet1);
    
           
       }
}

 
 function setBullet(){
     for (let index = 0; index < arrayBullet.length; index++) {
      const bullet = arrayBullet[index];
 
         if(bullet.type==1)continue;
 
     var plane =document.getElementById('plane');
     var planeX = plane.style.left;
     var planeY =  plane.style.top;
 
     bullet.div.style.left =parseInt(planeX)+70+'px';
     bullet.div.style.top =parseInt(planeY)+30+'px';


     bullet.type=1;
     game_screen.appendChild(bullet.div);
     musicShoot();
     break;
     }
 }

 function setEnemyBullet(){

    for (let ind= 0; ind< arrayEnemy.length; ind++) {
       
        if(currentEBulletCount>=enemyBulletCount)break;

        var enemy = arrayEnemy[ind];
        
        if(enemy.type!=1)continue;

               var planeX = enemy.div.style.left;
               var planeY =  enemy.div.style.top;
        
        for (let index = 0; index < arrayEnemyBullet.length; index++) {
            const bullet = arrayEnemyBullet[index];
       
               if(bullet.type==1)continue;
            
               
           bullet.div.style.left =parseInt(planeX)+20+'px';
           bullet.div.style.top =parseInt(planeY)+20+'px';

           bullet.type=1;
           currentEBulletCount+=1;

           game_screen.appendChild(bullet.div);
           break;
           }
        
    }
   
}

function upEnemyBullet(){
    for (let index = 0; index < arrayEnemyBullet.length; index++) {
        const bullet = arrayEnemyBullet[index];
        
        if(parseFloat(bullet.div.style.left)<0){
            bullet.reset();
            currentEBulletCount-=1;
        }

        if(bullet.type==1){
            var topX = parseFloat(bullet.div.style.left);
                    topX-=1.5;
                    bullet.div.style.left =topX + 'px';
        }
       
    }
}
 
 function upBullet(){
     for (let index = 0; index < arrayBullet.length; index++) {
         const bullet = arrayBullet[index];
         
         if(parseFloat(bullet.div.style.left)>document.documentElement.clientWidth+50){
             bullet.reset();
         }
 
         if(bullet.type==1){
             var topX = parseFloat(bullet.div.style.left);
                     topX+=1.5;
                     bullet.div.style.left =topX + 'px';
         }
        
     }
 }


//判断子弹
function judgeBullet(){


    for (const key in arrayEnemy) {
        if (arrayEnemy.hasOwnProperty(key)) {
            const enemyP = arrayEnemy[key];
            if(enemyP.type!=1)continue;
            
            for (const key2 in arrayBullet) {
                if (arrayBullet.hasOwnProperty(key2)) {
                    const bullet = arrayBullet[key2];
                    
                    if(bullet.type!=1)continue;
                    if(frameContect(enemyP.div,bullet.div)||frameContect(bullet.div,enemyP.div)){
                        
                        enemyHealthCount(enemyP);
                        bullet.reset();
                        
                    }




                }
            }


            
        }
    }

}

function enemyHealthCount(enemyP){

    enemyP.health-=1;
    if(enemyP.health>0){return;}

    enemyP.type=2;
    frameAnimation(enemyP,enemyP.pics());
    refreshScore(enemyP.score);
    musicDestory();
}

//判断自己
function judgeMyPlane(){

    var isBoom =false;
    for (const key in arrayEnemy) {
        if (arrayEnemy.hasOwnProperty(key)) {
            const enemyP = arrayEnemy[key];
            if(enemyP.type!=1)continue;
            

            if(frameContect(enemyP.div,myPlane.div)||frameContect(myPlane.div,enemyP.div)){

                enemyP.reset();
                frameAnimation(enemyP,enemyP.pics());
                
                isBoom=true;
                refreshScore(-15);
                currentOil-=15;
            }

            
        }
    }

    for (const key in arrayEnemyBullet) {
        if (arrayEnemyBullet.hasOwnProperty(key)) {
            const enemyB = arrayEnemyBullet[key];
            if(enemyB.type!=1)continue;
            

            if(frameContect(enemyB.div,myPlane.div)||frameContect(myPlane.div,enemyB.div)){

                enemyB.reset();
                isBoom=true;
                refreshScore(-15);
                currentOil-=15;

            }

            
        }
    }

    for (const key in arrayFuel) {
        if (arrayFuel.hasOwnProperty(key)) {
            const fuel = arrayFuel[key];
            // if(fuel.type!=1)continue;
            

            if(frameContect(fuel.div,myPlane.div)||frameContect(myPlane.div,fuel.div)){

                currentOil+=15;
                fuel.reset();

            }

            
        }
    }

    if(isBoom){ frameAnimation(myPlane,myPlane.pics());}

}

function checkOil(){
    currentOil -=1;


    menu.oil.innerText ="燃料:"+currentOil+"秒";

    if(currentOil<=0){
        gameover();
    }

}

function refreshScore(addScore){
    currentScore += addScore;
    menu.score.innerText ="得分:"+currentScore+"分";
}

function gameover(){
    isAlive =false;
    stopTimer();
    clearAll();
    loadRecordView();
}


function clearAll(){

    

    for (const key in game_screen.childNodes) {
        if (game_screen.childNodes.hasOwnProperty(key)) {
            const element = game_screen.childNodes[key];
            
            if(element.className ==='background'){continue;}
            console.log(element.className);
            element.style.top ='-50px';
            element.style.left ='-50px';
            game_screen.removeChild(element);
        }
    }
}

function loadRecordView(){

    record ={};
    record.div =addViewById('recordView');

    record.title =addViewById('record_title');
    record.title.innerText ="游戏结束";

    record.replay =addView('record_replay','button');
    record.replay.className='btn btn-info';
    record.replay.innerText="重新开始";
    record.replay.style.left='0px';
    record.replay.style.top='0px';
    record.replay.style.width='80px';
    record.replay.onclick =function(){
        document.location.reload();
    }

    record.div.appendChild(record.title);
    record.div.appendChild(record.replay);

    game_screen.appendChild(record.div);
}


/**
 * 
 * 燃料
 * 
 */

function fuel(){

   var fuel ={};
    fuel.div =addViewByClass('fuel');

    fuel.div.style.left =Math.floor(Math.random()*document.documentElement.clientWidth)+'px';
    fuel.div.style.top = -Math.floor(Math.random()*document.documentElement.clientHeight)+'px';;

    fuel.reset =function(){
        this.div.style.left =Math.floor(Math.random()*document.documentElement.clientWidth)+'px';
        this.div.style.top = -Math.floor(Math.random()*document.documentElement.clientHeight)+'px';;
    }

    return fuel;
}

function createfuel(){
    for (let index = 0; index < 3; index++) {
        var fu =new fuel();
        arrayFuel.push(fu);
        game_screen.appendChild(fu.div);
    }
}

function downFuel(){
    for (let index = 0; index < arrayFuel.length; index++) {
        const fuel = arrayFuel[index];

        var topY =parseFloat(fuel.div.style.top);
        topY+=1.5;
        console.log(topY);
        fuel.div.style.top =topY +'px';
         
    }
}

function reciveFuel(){
    for (let index = 0; index < arrayFuel.length; index++) {
        const element = arrayFuel[index];
        if(parseInt(element.div.style.top)>document.documentElement.clientHeight){
            element.div.style.top=-Math.floor(Math.random()*document.documentElement.clientHeight)+'px';
            element.div.style.left= Math.floor(Math.random()*document.documentElement.clientWidth)+'px';
        }
        
    }
}