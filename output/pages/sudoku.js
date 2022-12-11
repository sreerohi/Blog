var puzzle = [
	[0,0,7,4,9,1,6,0,5],
	[2,0,0,0,6,0,3,0,9],
	[0,0,0,0,0,7,0,1,0],
	[0,5,8,6,0,0,0,0,4],
	[0,0,3,0,0,0,0,9,0],
	[0,0,6,2,0,0,1,8,7],
	[9,0,4,0,7,0,0,0,2],
	[6,7,0,8,3,0,0,0,0],
	[8,1,0,0,4,5,0,0,0]
];
// var puzzle_sol = [
// 	[0,0,7,4,9,1,6,0,5],
// 	[2,0,0,0,6,0,3,0,9],
// 	[0,0,0,0,0,7,0,1,0],
// 	[0,5,8,6,0,0,0,0,4],
// 	[0,0,3,0,0,0,0,9,0],
// 	[0,0,6,2,0,0,1,8,7],
// 	[9,0,4,0,7,0,0,0,2],
// 	[6,7,0,8,3,0,0,0,0],
// 	[8,1,0,0,4,5,0,0,0]
// ];

var puzzle = [
	[5,3,0,0,7,0,0,0,0],
	[6,0,0,1,9,5,0,0,0],
	[0,9,8,0,0,0,0,6,0],
	[8,0,0,0,6,0,0,0,3],
	[4,0,0,8,0,3,0,0,1],
	[7,0,0,0,2,0,0,0,6],
	[0,6,0,0,0,0,2,8,0],
	[0,0,0,4,1,9,0,0,5],
	[0,0,0,0,8,0,0,7,9]
];

var puzzle_sol = [
	[5,3,0,0,7,0,0,0,0],
	[6,0,0,1,9,5,0,0,0],
	[0,9,8,0,0,0,0,6,0],
	[8,0,0,0,6,0,0,0,3],
	[4,0,0,8,0,3,0,0,1],
	[7,0,0,0,2,0,0,0,6],
	[0,6,0,0,0,0,2,8,0],
	[0,0,0,4,1,9,0,0,5],
	[0,0,0,0,8,0,0,7,9]
];



var selectedNumberHover = null;
var selectedNumberClick = null;

window.onload =  function(){
	loadBoard();
	loadDigits();
	loadButtons();
}

function loadDigits(){
	h = document.body;
	for (let i =1; i <=10;  i++){
		let obj = document.createElement("div");
		obj.classList.add("numberPick") ;
		if(i!=10)
			obj.innerText = i;
		obj.addEventListener("click", digitsPickClick);
		obj.addEventListener("mouseover", digitsPickHover);
		obj.addEventListener("mouseleave", digitsPickLeave);
		document.getElementById("digits").appendChild(obj);
	}

}

function loadBoard(){
	h = document.getElementById("board");
	for (let i =0; i <9;  i++){
		for (let j = 0; j < 9; j++){
			let obj = document.createElement("div");
			obj.classList.add("numberBoard") ;
			obj.addEventListener("click", numberBoardClick);
			obj.id = i.toString() + "-"+ j.toString();
			if(i==2 || i== 5 )
				obj.style.borderBottom = "1px solid black";
			if(j==2 || j== 5 )
				obj.style.borderRight = "1px solid black";

			//filling board values
			num = puzzle[i][j]
			if(num != 0){
				obj.innerText = num.toString();
				obj.style.background = "whitesmoke";
			}
			h.appendChild(obj);
		}
	}
}

function loadButtons(){
	reset = document.getElementById("reset-button");
	reset.addEventListener("click", resetFunc);
	solveButton = document.getElementById("solve-button");
	solveButton.addEventListener("click", solve);
}

function resetFunc(){
	for (let i =0; i <9;  i++){
		for (let j = 0; j < 9; j++){
			obj = document.getElementById(i.toString() + "-" + j.toString());
			// console.log(obj.id)
			num = puzzle[i][j]
			if(num != 0){
				obj.innerText = num.toString();
				obj.style.background = "whitesmoke";
			}
			else if (num == 0) {
				obj.innerText = "";
			}
		}
	
	}
	if(selectedNumberClick != null)
		selectedNumberClick.classList.remove("selectedNumberPick");
}

function digitsPickHover(){
	if(selectedNumberHover != null && selectedNumberHover!= selectedNumberClick){
		selectedNumberHover.classList.remove("selectedNumberPick");
	}
	selectedNumberHover = this;
	selectedNumberHover.classList.add("selectedNumberPick");
	
}

function digitsPickClick(){
	if(selectedNumberClick != null){
		selectedNumberClick.classList.remove("selectedNumberPick");
	}
	selectedNumberClick = this;
	selectedNumberClick.classList.add("selectedNumberPick");
	
}

function digitsPickLeave(){
	if(selectedNumberHover != null && selectedNumberHover!= selectedNumberClick){
		selectedNumberHover.classList.remove("selectedNumberPick");
	}
	
}

function numberBoardClick(){
	if(selectedNumberClick!= null)
		this.innerText = selectedNumberClick.innerText;
}

function solve(){

	solve_sudoku();
}

function valid(num, a , b){
	// console.log("called")
	for(let i =0; i<9; i++){
		if(puzzle_sol[i][b] == num)
			return 0;
	}

	for (let j = 0 ; j < 9; j++){
		if(puzzle_sol[a][j] == num)
			return 0;
	}
	let x0 = Math.floor(a/3) * 3;
	let y0 = Math.floor(b/3) * 3;

	for (let i = 0; i <3; i ++){
		for (let j = 0; j < 3; j ++){
			if(puzzle_sol[x0 + i][y0 + j] ==  num)
				return 0;
		}
	}
	return 1;
}

function solve_sudoku(){
	for (let i =0; i < 9 ; i++){
		for (let j = 0 ; j < 9 ; j++){
			// console.log(i,j)
			if(puzzle_sol[i][j] == 0){
				for( let num = 1; num <=9; num ++){
					let v = valid(num, i, j);
					// console.log(i,j,num,v)
					if(v==1){
						puzzle_sol[i][j] = num;
						// console.log(puzzle_sol);
						solve_sudoku();
						// console.log("returned")
						puzzle_sol[i][j] = 0;
					}
				}
				return;
			}
		}

	}
	console.log("Here");
	for (let i =0; i <9;  i++){
		for (let j = 0; j < 9; j++){
			obj = document.getElementById(i.toString() + "-" + j.toString());
			// console.log(obj.id)
			if(puzzle[i][j] == 0){
				num = puzzle_sol[i][j]
				obj.innerText = num.toString();
				obj.style.color = "green";
			}
			
		}
	
	}
	return;
}