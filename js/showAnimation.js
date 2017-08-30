/**
 * 将随机数显示出来
 * @param  {[type]} x   [description]
 * @param  {[type]} y   [description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function showNumberWithAnimation(x,y,num){
	var numberCell=$("#number-cell-"+x+"-"+y);
	numberCell.css("background-color",getNumberBackgroundColor(num));
	numberCell.css("color",getNumberColor(num));
	numberCell.css('font-size',getFontSize(pattern,num));
	// console.log(numberCell.css("font-size"));
	numberCell.text(setPattern(pattern,num));

	numberCell.animate({
		width:"80px",
		height:"80px",
		top:getPosTop(x,y),
		left:getPosLeft(x,y)
	},50);
}
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
	// console.log('animate');
}
/**
 * 更新分数
 * @param  {[type]} score [description]
 * @return {[type]}       [description]
 */
function updateScore(score){
	$("#score").text(score);
}