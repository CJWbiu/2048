var board=new Array();
var it_man=['小白','实习生','程序猿','项目经理','架构师','技术经理','高级经理','技术总监','副总裁','CTO','CEO','人生巅峰','牛逼'];
var student=['幼儿园','小学','初中','高中','大学','研究生','硕士','博士','博士后','院士','人生巅峰','木鸡啊','牛逼'];
var score=0;
var pattern=0;
var hasConflicted=new Array();//限制格子碰撞次数
var viewWidth=window.screen.availWidth;
var viewHeight=window.screen.availHeight;

var startx=0;
var starty=0;
var endx=0;
var endy=0;


$(function(){
	newGame();
	$("#select").click(function(){
		$("#select_btn").slideDown();
	})
});
/**
 * 初始化游戏
 * @return {[type]} [description]
 */
function newGame(){
	
	//初始化棋盘
	init( );
	//在随机的格子里生成数字
	generateOneNumber();
	generateOneNumber();
}
/**
 * 初始化每个格子的位置和数组的值
 * @return {[type]} [description]
 */
function init(){
	$("#gameover").hide();
	$("#mask").hide();
	
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}

	//初始化数组
		for(var i=0;i<4;i++){
			board[i]=new Array();
			hasConflicted[i]=new Array();
			for(var j=0;j<4;j++){
				board[i][j]=0;
				hasConflicted[i][j]=false;//表示没有进行过碰撞
			}
		}

	updateBoardView();
	score=0;
	updateScore(score);
}
/**
 * 选择模式
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function select(num){
	$("#select_btn").slideUp();
	$("#select").html($("#btn-"+num).html());
	pattern=num;
	newGame();
	
}
/**
 * 添加显示数字的格子
 * @return {[type]} [description]
 */
function updateBoardView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell=$('#number-cell-'+i+'-'+j);

			//根据不同值做不同显示
			if(board[i][j]==0){//为0不显示
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+40);
				theNumberCell.css('left',getPosLeft(i,j)+40);
			}else{//显示并覆盖图形格子
				theNumberCell.css('width','80px');
				theNumberCell.css('height','80px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//根据不同数值产生不同背景颜色
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.css('font-size',getFontSize(pattern,board[i][j]));
				theNumberCell.text(setPattern(pattern,board[i][j]));//显示数值
			}

			hasConflicted[i][j]=false;//表示没有进行过碰撞
		}
	}
}
/**
 * 在随机的位置产生随机数
 * @return {[type]} [description]
 */
function generateOneNumber(){
	if(nospace(board)){//如果格子满了返回false
		return false;
	}
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));

	var times=0;
	//判断位置是否可用
	while(times<50){
		if(board[randx][randy]==0){
			break;
		}
		//不可用则产生新的随机数
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));

		times++;
	}
	//手动
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
		}
	}
	//随机一个数字2或4
	var randNumber=Math.random()<0.6?2:4;
	board[randx][randy]=randNumber;
	
	//在随机位置中显示随机数字
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}
/**
 * 绑定键盘事件
 * @return {[type]}                     
 */
$(document).keydown(function(e){
	// console.log(e.keyCode);
	switch(e.keyCode){
		case 37://left
			if(moveLeft()){//判断是否可移动
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
			break;
		case 38://up
			if(moveTop()){
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
			break;
		case 39://right
			if(moveRight()){//判断是否可移动
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
			break;
		default:
			break;
	}
})

document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
})
document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax=endx - startx;
	var deltay=endy - starty;

if(Math.abs(deltax)< 0.3*viewWidth && Math.abs(deltay) < 0.3*viewWidth){
	return;
}

	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			//right
			if(moveRight()){//判断是否可移动
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
		}else{
			//left
			if(moveLeft()){//判断是否可移动
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
		}
	}else{
		//Y
		if(deltay > 0){
			//down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
		}else{
			//up
			if(moveTop()){
				setTimeout("generateOneNumber()",210);//生成一个新随机数
				setTimeout("isGameover()",300);//判断游戏是否可以继续
			}
		}
	}
})

/**
 * 判断游戏是否还能继续
 * @return {Boolean} [description]
 */
function isGameover(){
	if(nospace(board) && !nomove(board)){
		// console.log(nomove(board));
		gameover();
	}
}
/**
 * 游戏结束
 * @return {[type]} [description]
 */
function gameover(){
	$("#mask").show('fast');
	$("#gameover").show();
}
/**
 * 判断是否可以向左移动
 * @return {[type]} [description]
 */
function moveLeft(){
	if(!canMoveLeft(board)){
		console.log('no L');
		return false;
	}
	//moveleft
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				//从最左边开始判断是否可移动
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//移走数字并清零
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
/**
 * 判断是否可以向右移动
 * @return {[type]} [description]
 */
function moveRight(){
	if(!canMoveRight(board)){
		// console.log('no R');
		return false;
	}

	//moveright
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				//从最右边开始判断是否可移动
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//移走数字并清零
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveTop(){
	if(!canMoveTop(board)){
		return false;
	}
	//moveTop
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){

				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockVertical(j,k,i,board)){

						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]*=2;
						board[i][j]=0;
						//add score
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	//moveDown
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){

				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockVertical(j,i,k,board)){

						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]*=2;
						board[i][j]=0;
						//add score
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j];
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
