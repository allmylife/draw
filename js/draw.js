function palette(cobj,canvas,copy)
{
	this.o=cobj;
	this.copy=copy;
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke";
	this.type="circle";
	this.lineWidth=1;
	this.fillStyle="orange";
	this.strokeStyle="orange";
	this.bnum=6;
	this.jnum=5;
	this.status=[];
}

palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		var sx=e.offsetX;
		var sy=e.offsetY;
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0)
			{	
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
			}
			var ex=e.offsetX;
			var ey=e.offsetY;
			that[that.type](sx,sy,ex,ey);
		}
		document.onmouseup=function(e)
		{
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}

}	
palette.prototype.line=function(x1,y1,x2,y2){
	this.init();
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
palette.prototype.rect=function(x1,y1,x2,y2){
	this.init();
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
	this.o.rect(x1-0.5,y1-0.5,w,h);
	this.o[this.style]();
	this.o.closePath();
}
palette.prototype.circle=function(x1,y1,x2,y2){
	this.init();
	var r=this._r(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o[this.style]();
	this.o.closePath();
}
palette.prototype._r=function(x1,y1,x2,y2){

	return  Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.init();
	this.o.beginPath();
	this.o.lineTo(x1-0.5,y1-0.5);
	this.o.lineTo(x1-0.5,y2-0.5);
	this.o.lineTo(x2-0.5,y2-0.5);
	this.o.closePath();
	this.o[this.style]();
}

palette.prototype.init=function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=this.lineWidth
}

palette.prototype.poly=function(x1,y1,x2,y2){
	this.init();
	var r=this._r(x1,y1,x2,y2);
	var ang=360/this.bnum;
	this.o.beginPath();
	for(var i=0;i<this.bnum;i++)
	{
		this.o.lineTo(x1+Math.sin(Math.PI/180*ang*i)*r,y1+Math.cos(Math.PI/180*ang*i)*r);
	}
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.polystar=function(x1,y1,x2,y2){
	this.init();
	var r=this._r(x1,y1,x2,y2);
	var r1=r*0.4;
	var n=this.jnum*2;
	var ang=360/n;
	this.o.beginPath();
	for(var i=0;i<n;i++)
	{
		if(i%2==0)
		{	
			this.o.lineTo(x1+Math.sin(Math.PI/180*ang*i)*r,y1+Math.cos(Math.PI/180*ang*i)*r);
		}else{
			this.o.lineTo(x1+Math.sin(Math.PI/180*ang*i)*r1,y1+Math.cos(Math.PI/180*ang*i)*r1);
		}//此处有问题，多角形
	}
	this.o.closePath();
	this.o[this.style]();
}

palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			var ex=e.offsetX;
			var ey=e.offsetY;
			that.o.lineTo(ex,ey);
			that.o.stroke();
			
		}
		document.onmouseup=function(e){
			that.o.closePath();
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}

palette.prototype.eraser=function(){
	var w=50;
	var that=this;
	
	this.copy.onmousedown=function(e){
		var sx=e.offsetX;
		var sy=e.offsetY;
		var a=document.createElement("div");
		a.style.cssText="width:+"+w+"px;height:"+w+"px;position:absolute;"
		
		document.onmousemove=function(e){
			var ex=e.offsetX;
			var ey=e.offsetY;
			a.style.left=(ex-w/2)+"px";
			a.style.top=(ey-w/2)+"px";
			that.o.clearRect(ex-w/2,ey-w/2,w,w);
			that.copy.parentNode.appendChild(a)
		}
		document.onmouseup=function(e){
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}

}