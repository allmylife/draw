$(function(){
	var canvas=null;
	var copy=null;
	$(".add").click(function(){
		var cw=prompt("width","800");
		var ch=prompt("height","500");
		var canvas=$("<canvas>").attr({width:cw,height:ch}).css({border:'1px solid red',margin:'20px 0 0 20px'});
		var copy=$("<div class=copy>").css({width:cw,height:ch,position:'absolute',top:0,left:0});
		$(".huabu").css({width:cw,height:ch,position:'relative'}).append(canvas).append(copy);
		pat(canvas,copy);

	})
	function pat(canvas,copy){
		//.getContext("2d")是DOM的方法，此处的canvas是jquery对象，取下标[0]就可以
		var pal=new palette(canvas[0].getContext("2d"),canvas[0],copy[0]);
		var divs=$(".left>div");
		divs.click(function(){
			var attr=$(this).attr('role');
			if(attr==undefined)
			{
				return;
			}
			if(attr=="line"||attr=="rect"||attr=="circle"||attr=="triangle")
			{
				pal.type=attr;
				pal.draw();
			}
			if(attr=="poly")
			{
				var num=prompt("请输入边数","5");
				pal.bnum=num;
				pal.type=attr;
				pal.draw();
			}
			if(attr=="polystar")
			{
				var num=prompt("请输入边数","5");
				pal.jnum=num;
				pal.type=attr;
				pal.draw();
			}

			if(attr=="fill")
			{
				
				pal.style=attr;
				var input=$(this).find("input");
				input.change(function(){
					pal.fillStyle=input.val();
				
				})
			
			}
			if(attr=="stroke")
			{
				pal.style=attr;
				var input=$(this).find("input");
				input.change(function(){
					pal.strokeStyle=input.val();
				})
				
			}

			

			if(attr=="pencil")
			{
				pal.pencil();
			}
		})

		$(".range").change(function(){
			console.log(this.value)
			pal.lineWidth=this.value;
		})
		var shu=[];

		$(".reset").click(function(){
			if(pal.status.length>1)
			{
				shu.push(pal.status[pal.status.length-1]);
				pal.status.pop();
				pal.o.putImageData(pal.status[pal.status.length-1],0,0,0,0,pal.width,pal.height);
			}else if(pal.status.length==1)
			{
				shu.push(pal.status[0]);
				pal.status.pop();
				pal.o.clearRect(0,0,pal.width,pal.height);
			}else{
				alert("不能再撤销了！")
			}
		})

		$(".save").click(function(){
			var a=canvas[0].toDataURL();
			location.href = a.replace('image/png','image/octet-stream');
		})


	}


})