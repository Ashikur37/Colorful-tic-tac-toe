		turn=0;
			running=true;
			gdata=[];
			colors=["green","red","yellow","orange","pink","aqua"];
			p1color=colors[0];
			p2color=colors[1];
			color=p1color;
			changable=true;
			changecolor=(id)=>{
				if(changable)
				{
					v=document.getElementById(id).value;
				document.getElementById(id+"s").style.backgroundColor=colors[v];
				document.getElementById(id+"s").style.display="inline-block";
				if(id.split("cp")[1]=="1")
					p1color=colors[v];
				else
					p2color=colors[v];
				color=p1color;
				}
			}
			for(i=0;i<9;i++)
			{
				gdata.push("n"+i);
			}
		index=0;
		result=(x,y,z)=>{
			if(gdata[x]==gdata[y]&&gdata[y]==gdata[z])
				return true;
			else
				return false;
		}
		finish=(v)=>{
			running=false;
				if(v==9)
					document.getElementById("status").innerHTML="Draw!!!!<br>";
				else if(p1color==gdata[v])
				{
					document.getElementById("status").innerHTML="Winner is player 1<br>";
					document.getElementById("status").style.color=p1color;
				}
				else
				{
					document.getElementById("status").innerHTML="Winner is player 2<br>";
					document.getElementById("status").style.color=p2color;
				}
				b=document.createElement("button");
				b.innerHTML="Restart";
				b.setAttribute("onclick","location.reload()");
				document.getElementById("status").appendChild(b);
		}
		check=()=>
			{
				if(result(0,1,2))
					finish(0);
				else if(result(3,4,5))
					finish(3);
				else if(result(6,7,8))
					finish(6);
				else if(result(0,3,6))
					finish(0);
				else if(result(1,4,7))
					finish(1);
				else if(result(2,5,8))
					finish(2);
				else if(result(0,4,8))
					finish(0);
				else if(result(2,4,6))	
					finish(2);
				else if(turn==9)
					finish(9);
			}
		fire=(id)=>{
			if(!running)
				return;
			if(p1color==p2color)
			{
				document.getElementById("status").innerHTML="Color must be different<br>Player 1 turn";
			}
			else
			{
				changable=false;

				ind=parseInt(id.split("i")[1]);
				if(gdata[ind].length==2)
				{ 
				document.getElementById(id).style.backgroundColor=color;
				gdata[ind]=color;
					if(color==p1color)
					{
						color=p2color;
					document.getElementById("status").innerHTML="Player 2 turn";
					}
			else
				{
					color=p1color;
						document.getElementById("status").innerHTML="Player 1 turn";
					
				}
				
				}
				turn++;
				check();
			}	
		}
		for(j=0;j<3;j++)
		{  d=s=document.createElement("div");
			for(i=0;i<3;i++)
		{
			s=document.createElement("div");
			s.style.borderColor="black";
			s.style.borderStyle="solid";
			s.style.borderWidth="2px";
			s.style.width="100px";
			s.style.height="100px";
			s.style.display="inline-block";
			s.id="i"+index;
			s.setAttribute("onclick","fire(this.id)");
			d.appendChild(s);
			index++;
		}
		if(j>0)
		d.style.marginTop="-8px";
		document.getElementById("board").appendChild(d);
		}