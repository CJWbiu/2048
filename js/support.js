
/*
 *获取Y轴位置
 */
function getPosTop(i,j){
	return 16+i*96;
}
/*
 *获取X轴位置
 */
function getPosLeft(i,j){
	return 16+j*96;
}
/*
 *获取不同数字的背景
 */
function getNumberBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}
function getFontSize(pat,num){

	if(pat==0){
		// console.log(0);
		switch(num){
			case 2:
			case 4:
			case 8:return "48px";break;
			case 16:
			case 32:
			case 64:return "45px";break;
			case 128:
			case 256:
			case 512:return "40px";break;
			case 1024:
			case 2048:
			case 4096:
			case 8192:return "33px";break;
		}
		return "10px";
	}
	if(pat==1){
		// console.log(1);
		switch(num){
			case 2:return "30px";break;
			case 4:
			case 8:return "20px";break;
			case 16:return "15px";break;
			case 32:return "20px";break;
			case 64:
			case 128:
			case 256:return "15px";break;
			case 512:return "20px";break;
			case 1024:
			case 2048:return "30px";break;
			case 4096:return "15px";break;
			case 8192:return "30px";break;
		}
		return "10px";
	}
	if(pat==2){
		// console.log(2);
		switch(num){
			case 2:return "20px";break;
			case 4:
			case 8:
			case 16:
			case 32:return "30px";break;
			case 64:return "20px";break;
			case 128:
			case 256:return "30px";break;
			case 512:return "20px";break;
			case 1024:return "30px";break;
			case 2048:return "15px";break;
			case 4096:return "20px";break;
			case 8192:return "30px";break;
		}
		return "10px";
	}
}
/*
 *获取不同数字的字体颜色
 */
function getNumberColor(num){
	if(num<=4){
		return "#776e65";
	}
	return "white";
}
/*
 *判断格子是否填满
 */
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]===0){
				return false;
			}
		}
	}
	return true;
}
/*
 *判断格子是否能向左移
 */
function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){//最左边的不需考虑
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]){//成立条件：左边一个为0或与自身相等
					return true;
				}	
			}
		}
	}
	return false;
}
/**
 * 判断能否右移
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 */
function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){//最右边的不需考虑
			if(board[i][j]!=0){
				// console.log(i+','+j);
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]){//成立条件：右边一个为0或与自身相等
					return true;
				}	
			}
		}
	}
	return false;
}
/**
 * 判断是否能向上移动
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 */
function canMoveTop(board){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
/**
 * 判断是否能向下移动
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 */
function canMoveDown(board){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
/**
 * 判断是否有阻碍
 * @param  {[type]} row   [description]
 * @param  {[type]} col1  [description]
 * @param  {[type]} col2  [description]
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 */
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}
/**
 * 判断竖直方向是否有障碍
 * @param  {[type]} col   [description]
 * @param  {[type]} row1  [description]
 * @param  {[type]} row2  [description]
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 */
function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	// console.log('no block');
	return true;
}
/**
 * 判断是否可移动
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 */
function nomove(board){
	if(canMoveLeft(board) ||
		canMoveRight(board) ||
		canMoveTop(board) ||
		canMoveDown(board)){
		// console.log('left:'+canMoveLeft(board)+',right:'+canMoveRight(board)+',up:'+canMoveTop(board)+',down:'+canMoveDown(board));
		return true;
	}
	return false;
}
function setPattern(num,board){
	if(num==0){
		return board;
	}else if(num==1){
		switch(board){
			case 2:return it_man[0];break;
			case 4:return it_man[1];break;
			case 8:return it_man[2];break;
			case 16:return it_man[3];break;
			case 32:return it_man[4];break;
			case 64:return it_man[5];break;
			case 128:return it_man[6];break;
			case 256:return it_man[7];break;
			case 512:return it_man[8];break;
			case 1024:return it_man[9];break;
			case 2048:return it_man[10];break;
			case 4096:return it_man[11];break;
			case 8192:return it_man[12];break;
		}
		return 0;
	}else if(num==2){
		switch(board){
			case 2:return student[0];break;
			case 4:return student[1];break;
			case 8:return student[2];break;
			case 16:return student[3];break;
			case 32:return student[4];break;
			case 64:return student[5];break;
			case 128:return student[6];break;
			case 256:return student[7];break;
			case 512:return student[8];break;
			case 1024:return student[9];break;
			case 2048:return student[10];break;
			case 4096:return student[11];break;
			case 8192:return student[12];break;
		}
		return 0;
	}
}