// UTILITY FUNCTIONS to determind logics
//let lastKey // ohmygod instead of letting the code run fom up to down just go*ley* Lastkey
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
      rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
  }
  // WINNER BASED ON EITHER CLOCK OR HEALTH
  function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId) // what is cancelTimout
    document.querySelector('#displayText').style.display = 'flex' // đi cùng với align-items: center; justify-content: center; để CHÍNH GIỮA CANVAS
    if (player.health === enemy.health){
      console.log('tie') 
      document.querySelector('#displayText').innerHTML = 'Tie'
       // flex display only when the TIME RUN OUT
    } else if (player.health > enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 1 Wins yaes!!'
  
    } else if (enemy.health > player.health) {
      document.querySelector('#displayText').innerHTML = 'Player 2 Wins yaes!!'
    }
  
  }
  
  // CLOCK TIMER!
  
  let timer = 60  // change the clock here
  let timerId 
  function decreaseTimer(){
     // infinite loop = requestAnimationFrame(animate)
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer // innerHTML = cái số 10 á 
      //document.getElementById('timer').innerHTML = timer
    }
    if (timer === 0){
     determineWinner({player, enemy, timerId})
   }
  }
  