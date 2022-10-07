
document.addEventListener('DOMContentLoaded',() =>{

var boxArray=[]
for (let i=1; i<9;i++){
  var addr="images/B_"+i.toString()+".png"
  boxArray.push({
    name:i.toString(),
    img: addr
  })
}
boxArray=boxArray.concat(boxArray)
boxArray.sort( () =>.5 - Math.random())
const grid=document.querySelector('.grid')
const resultsShow=document.querySelector('#result')
const stat=document.querySelector('#stat')
const movesboard=document.querySelector('#moves')

var boxChosen=[]
var boxChosenID=[]
var boxsWon=[]
var boxsWonID=[]
var moves=0
movesboard.textContent=moves.toString()
resultsShow.textContent=0
stat.textContent='Click on a pair of boxes to start!'
function createBoard(){

for (let i=0; i<boxArray.length; i++){

  var box=document.createElement('img')
  box.setAttribute('src','images/blank.png')
  box.setAttribute('data-id',i)
  box.addEventListener('click',flipbox)
  grid.appendChild(box)
}
}
function checkForMatch(){
  var boxs=document.querySelectorAll('img')
  const optionOneID=boxChosenID[0]
  const optionTwoID=boxChosenID[1]
  if (boxChosen[1]===boxChosen[0] && optionOneID!=optionTwoID){
stat.textContent='Great, boxes matched!'

boxs[optionOneID].setAttribute('src','images/tick.png')
boxs[optionTwoID].setAttribute('src','images/tick.png')
boxsWon.push(boxChosen)
boxsWonID.push(optionOneID)
boxsWonID.push(optionTwoID)
} else{
  boxs[optionOneID].setAttribute('src','images/blank.png')
  boxs[optionTwoID].setAttribute('src','images/blank.png')
  stat.textContent='Sorry, they dont match! Try another pair.'
}
boxChosen=[]
boxChosenID=[]
resultsShow.textContent=boxsWon.length*2
if (boxsWon.length===boxArray.length/2){
  stat.textContent='Congrats, you solved the puzzle in '+ moves.toString()+ ' moves!';
}
}
function flipbox(){

var boxID=this.getAttribute('data-id')
if (containsObject(boxID,boxsWonID)==false){ // check if the box is not already in the won list
  moves=moves+1
  movesboard.textContent=moves.toString()
boxChosen.push(boxArray[boxID].name)
boxChosenID.push(boxID)
this.setAttribute('src',boxArray[boxID].img)
if (boxChosen.length==2){
  setTimeout(checkForMatch,300)
}}
}
createBoard()
})
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}
