;Snake = (function(){
    var Snake = function(node){
        this.node = node;
        this.snakeWrap;
        this.foodWrap;
        this.time = 400;
        this.bodyArr = [
            {x : 0,y:0},
            {x : 0,y:20},
            {x : 0,y:40},
            {x : 0,y:60}, 
            {x : 0,y:80},
            {x : 0,y:100}   
        ];
        this.dir = 'DOWN';
        this.init();
        
    }
    Snake.prototype = {
        init : function(){
            var config,
             _self = this;
            config = this.getConfig();
            this.setConfig(config);
            this.initSnake();
            this.run();
            this.bindEvent();
            this.createFood();
            
        },
        
        run : function(){
            var _self = this;
            setInterval(function(){
                _self.move();
               /**如何改变this.time */
            },this.time);
            
        },

        bindEvent : function(){
            var _self = this;
            addEvent(document,'keydown',_self.changeDir.bind(_self));
        },

        changeDir : function(e){
            var e = e || window.event,
                tar = e.target || e.srcElement,
                code = e.keyCode; 
                /**e.keyCode是保存当前按键的上下左右键的值
                左：37 
                上：38
                右：39
                下：40
                 */
                this.setDir(code);
        },

        setDir : function(code){
            switch(code){
                case 37:
                if(this.dir !== 'LEFT' && this.dir !== 'RIGHT'){
                    this.dir = 'LEFT';
                }
                break;
                case 39:
                if(this.dir !== 'LEFT' && this.dir !== 'RIGHT'){
                    this.dir = 'RIGHT';
                }
                break;
                case 38:
                if(this.dir !== 'UP'&& this.dir !== 'DOWN'){
                    this.dir = 'UP';
                }
                break;
                case 40:
                if(this.dir !== 'UP'&& this.dir !== 'DOWN'){
                    this.dir = 'DOWN';
                }
                break;
            }
        },

        getConfig : function(){
            return JSON.parse(this.node.getAttribute('data-config'));
        },

        setConfig : function(elem){
            this.snakeWrap = document.getElementsByClassName(elem.snakeWrap)[0];
            this.foodWrap = document.getElementsByClassName(elem.foodWrap)[0];
            this.wrap = document.getElementsByClassName(elem.wrap)[0];
        },

        initSnake : function(){
            var arr = this.bodyArr,
                arrLen = arr.length,
                frag = document.createDocumentFragment(),
                item,
                snakeBody;
                for(var i = 0;i < arrLen;i++){
                    item = arr[i];
                    snakeBody = document.createElement('li');
                    snakeBody.className = i === arrLen - 1 /** 让数组的最末尾那个做头部*/
                                           ? 'snakeBody snakeHead'
                                           : 'snakeBody';
                    snakeBody.style.left = item.x + 'px';
                    snakeBody.style.top = item.y + 'px';
                    frag.appendChild(snakeBody);
                }
                this.snakeWrap.appendChild(frag);
        },

        createFood : function(){
            var food = document.createElement('li');
                food.className = 'food';
                food.style.left = this.createFoodPostion()*20 + 'px';
                food.style.top = this.createFoodPostion()*20 + 'px';
                this.foodWrap.appendChild(food);
        },

        removeFood : function(elem){
            elem.remove();
        },

        createFoodPostion : function(){
            return  Math.floor(Math.random()*500/20);/** 除以20可以以20的倍数出现（38/20 = 1）*/
        },

        eatFood : function(arr){
            var snakeHeadX = arr[arr.length - 1].x,
                snakeHeadY = arr[arr.length - 1].y,
                snakeFirstBodyX = arr[arr.length - 2].x,
                snakeFirstBodyY = arr[arr.length - 2].y,
                snakeLastBodyX = arr[0].x,
                snakeLastBodyY = arr[0].y,
                snakePenultBodyX = arr[1].x,
                snakePenultBodyY = arr[1].y,
                food = findElementChildNode(this.foodWrap)[0],
                foodX = getStyle(food,'left'),
                foodY = getStyle(food,'top');
                this.time -= 100;
                if(this.time <= 100){
                    this.time = 100;
                }
                if(snakeHeadX === foodX && snakeHeadY === foodY){
                    /**当蛇的头部与食物重合时 */
                    this.removeFood(food);
                    this.createFood();
                    /**增加身体长度 */
                    if(snakeLastBodyY == snakePenultBodyY){
                        /**从左或者右边开吃 */
                        y = snakeLastBodyY
                        /**左边 */
                      if(snakePenultBodyX > snakeLastBodyX){
                            x = snakeLastBodyX -20;
                        }
                         /**右边 */
                      else if(snakePenultBodyX < snakeLastBodyX){
                            x = snakeLastBodyX + 20;
                        }
                        else{

                        }
                    }
                    if(snakePenultBodyX == snakeLastBodyX){
                        /**从上或者下边开吃 */
                        x = snakeLastBodyX
                        /**下 */
                        if(snakePenultBodyY > snakeLastBodyY){
                            y = snakeLastBodyY -20;
                        }
                        /**上 */
                        else if(snakePenultBodyY < snakeLastBodyY){
                            y = snakeLastBodyY + 20;
                        }
                        else{

                        }
                    }
                    console.log(x);
                    console.log(y);
                    arr.unshift({x,y});
                    /*
                        用这种方式会导致末尾如果和进入的方向不对造成的创建的不对
                    if(snakeHeadY == snakeFirstBodyY){
                        /**从左或者右边开吃 */
                  /*      y = snakeHeadY
                        /**左边 */
                    /*    if(snakeHeadX > snakeFirstBodyX){
                            x = snakeLastBodyX -20;
                        }
                         /**右边 */
                      /*   else if(snakeHeadX < snakeFirstBodyX){
                            x = snakeLastBodyX + 20;
                        }
                        else{

                        }
                    }
                    if(snakeHeadY == snakeFirstBodyY){
                        /**从上或者下边开吃 */
                  /*      x = snakeHeadX
                        /**下 */
                    /*    if(snakeHeadY > snakeFirstBodyY){
                            y = snakeLastBodyY -20;
                        }
                        /**上 */
                    /*    else if(snakeHeadY < snakeFirstBodyY){
                            y = snakeLastBodyY + 20;
                        }
                        else{

                        }
                    }
                    arr.unshift({x,y});
                    */
                }
        },

        removeSnake : function(){
            /** 因为initSnake（）其实是重新创建一条蛇，故如果想做出让其移动的效果
             * ，就是先将原来的蛇删除，再以新的坐标点（移动20px）去创建一条蛇*/
            var bodys = findElementChildNode(this.snakeWrap),
                bodyLen = bodys.length;
                while(bodyLen>0){
                    if(bodys[0]){
                        findElementChildNode(this.snakeWrap)[0].remove();
                        //bodys[0].remove;/** 为什么这个不行？*/
                        bodyLen--;
                    }
                }
                /*
                while(bodyLen>0){
                    if(bodys[0]){
                        bodys[0].remove();
                    }
                }*/

        },

        move : function(){
            var arr = this.bodyArr,
                arrLen = arr.length,
                snakeHeadWidth =  getStyle(findElementChildNode(this.snakeWrap)[0],'width'),
                snakeHeadHeight = getStyle(findElementChildNode(this.snakeWrap)[0],'height'),
                borderWidth = getStyle(this.snakeWrap,'width'),
                borderHeight = getStyle(this.snakeWrap,'height'),
                head;
                for(var i = 0; i < arrLen; i++){
                    if(arrLen - 1 == i){
                        head = arr[i];
                        switch(this.dir){
                            case 'LEFT':
                                if(head.x <= 0){
                                    head.x = borderWidth - snakeHeadWidth ;
                                }
                                else{
                                    head.x -= 20;
                                }
                                break;
                            case 'RIGHT':
                                if(head.x >= borderWidth - snakeHeadWidth){
                                    head.x = 0;
                                }
                                else{
                                    head.x += 20;
                                }
                                break;
                            case 'UP':
                                if(head.y <= 0){
                                    head.y = borderHeight - snakeHeadHeight;
                                }
                                else{
                                    head.y -= 20;
                                }
                                break;
                            case 'DOWN':
                                if(head.y >= borderHeight - snakeHeadHeight){
                                    head.y = 0;
                                }
                                else{
                                    head.y += 20;
                                }
                                break;
                            default:
                                break;
                        }
                    }else{
                        arr[i].x = arr[i+1].x;
                        arr[i].y = arr[i+1].y;

                    }
                    
                }
                this.removeSnake();
                this.initSnake(); 
                this.eatFood(arr);
        }
    }
    return Snake;
})();
new Snake(document.getElementsByClassName('wrap')[0]);