var width = 600;
var height =400;
var svg = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
	var mouseX,mouseY;
	svg.on("dblclick",function () {
		if(d3.select(".yuan").select("span").html()=="" ){
			mouseX=d3.mouse(this)[0];
			mouseY=d3.mouse(this)[1];
			d3.select(".yuan").select("span").html(mouseX+","+mouseY);
			svg.append("line")
				.attr("x1",0)
				.attr("y1",mouseY)
				.attr("x2",width)
				.attr("y2",mouseY)
				.attr("class","shuiping")
				.style('stroke','white')
				.style('stroke-width',4)
				.call(drag);
			svg.append("rect")
				.attr("x",0)
				.attr("y",mouseY+2)
				.attr("width",65)
				.attr("height",25)
				.attr("class","bgSp")
				.call(drag);
			svg.append("text")
				.attr("x",0)
				.attr("y",mouseY+20)
				.attr("class","fontext")
				.text("水平线")
				.call(drag);
			for(var i=1;i<=4;i++){
				svg.append("line")
					.attr("class","tous"+i)
					.attr("x1",0)
					.attr("y1",mouseY-(i+1)*20)
					.attr("x2",mouseX)
					.attr("y2",mouseY)
					.style('stroke', 'yellow')
					.style('stroke-width',3)
					.call(dragLine);
				svg.append("rect")
					.attr("x",0)
					.attr("y",mouseY-(i+1)*20+3)
					.attr("width",65)
					.attr("height",25)
					.attr("class","bg"+i)
					.call(dragLine);
				svg.append("text")
					.attr("x",0)
					.attr("y",mouseY-i*20)
					.attr("class","fontext"+i)
					.text("透视线"+i)
					.call(dragLine);
			}
			svg.append("image")
				.attr("class","yuandian")
				.attr("x",mouseX-10)
				.attr("y",mouseY-10)
				.attr("width",20)
				.attr("height",20)
				.attr("href","images/BeginPoint.png")
				.call(drag);
		}
	});
var drag = d3.behavior.drag().on("drag", dragmove);
function dragmove() {
	if(d3.event.x>0 && d3.event.y>0 && d3.event.x<width && d3.event.y<height){
		d3.select(".yuandian")
			.attr("x", d3.event.x-10 )
			.attr("y",d3.event.y-10 );
		d3.select(".shuiping")
			.attr("y1", d3.event.y )
			.attr("y2",d3.event.y );
		for(var j=1;j<=4;j++){
			d3.select(".tous"+j)
				.attr("x2", d3.event.x )
				.attr("y2",d3.event.y );
		}
		d3.select(".fontext")
			.attr("y",d3.event.y+20 );
		d3.select(".bgSp")
			.attr("y",d3.event.y+2 );
		d3.select(".yuan").select("span").html(d3.event.x+","+d3.event.y);
		tsHtml();
	}
	
}
var dragLine = d3.behavior.drag().on("drag", dragLinemove);
function dragLinemove() {
	var string=d3.select(this).attr("class");
	var num=string.substring(string.length-1,string.length);
	if(d3.event.x>0 && d3.event.y>0 && d3.event.x<width && d3.event.y<height){
		d3.select(".tous"+num)
			.attr("x1",d3.event.x)
			.attr("y1",d3.event.y );
		if(d3.event.x>0){
			d3.select(".fontext"+num)
				.attr("x", d3.event.x );
			d3.select(".bg"+num)
				.attr("x", d3.event.x );
		}
		if(d3.event.x<0){
			d3.select(".fontext"+num)
				.attr("x",0);
			d3.select(".bg"+num)
				.attr("x",0);
		}
		if(d3.event.x+55>width){
			d3.select(".fontext"+num)
				.attr("x",width-55 );
			d3.select(".bg"+num)
				.attr("x",width-55 );
		}
		if(d3.event.y-20<0 ){
			d3.select(".fontext"+num)
				.attr("y",15);
			d3.select(".bg"+num)
				.attr("y",0);
		}
		if(d3.event.y-20>0 ){
			d3.select(".fontext"+num)
				.attr("y",d3.event.y);
			d3.select(".bg"+num)
				.attr("y",d3.event.y-20);
		}
		if(d3.event.y-20>height ){
			d3.select(".fontext"+num)
				.attr("y",height-5);
			d3.select(".bg"+num)
				.attr("y",height-25);
		}
		tsHtml();
	}
}
function tsHtml() {
	d3.select(".ts1").select("span").html(d3.select(".tous1").attr("x1")+","+d3.select(".tous1").attr("y1"));
	d3.select(".ts2").select("span").html(d3.select(".tous2").attr("x1")+","+d3.select(".tous2").attr("y1"));
	d3.select(".ts3").select("span").html(d3.select(".tous3").attr("x1")+","+d3.select(".tous3").attr("y1"));
	d3.select(".ts4").select("span").html(d3.select(".tous4").attr("x1")+","+d3.select(".tous4").attr("y1"));
}
