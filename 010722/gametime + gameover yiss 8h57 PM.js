const canvas = document.querySelector('canvas') //querySelector = select ELEMENTS from HTML 

//const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7 // downward acceleration as we go down

class Sprite{ // DECONSTRUCTING! wrapping arguments position and velocity so the order doenst matter CLEANER AND MORE MANAGABLE!
   constructor({position, velocity, color = 'red', offset}){ // define a Function within a Class, define a property with a Sprite 
       this.position = position  //create a new constant of Sprite prefixed by -this. 
       this.velocity = velocity
       this.width = 50
       this.height = 150
       this.lastKey
       this.attackBox = { //GIVE property here!!follow the player around
        position: {
          x: this.position.x, // SHADOW parentposition?
          y: this.position.y
        },
        offset, // = "offset: offset," alone
        width: 100,
        height: 50,
       }
       this.color = color
       this.isAttacking
       this.health = 100
   }

  

   draw(){
      c.fillStyle = this.color
      c.fillRect(this.position.x, this.position.y, this.width, this.height) // pass position from Spirte from player to draw, this.position.x
      // attack box
      if (this.isAttacking) { // help to only visible when Space = attack is 'keydown'
      c.fillStyle = 'green'
      c.fillRect(
        this.attackBox.position.x, 
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height
        )
      //}
    }
  }

   update(){
       this.draw() //refercing the above
       // "this.velocity.y += gravity " instead of this line of code here and update every single frame put it in canvas.height constraints
       this.attackBox.position.x = this.position.x + this.attackBox.offset.x
       this.attackBox.position.y = this.position.y
       this.position.x += this.velocity.x 
       this.position.y += this.velocity.y
   // if phần đầu cục + phần dài cục + phần cuối cùng đụng thành
       if(this.position.y  + this.height + this.velocity.y >= canvas.height){ //prevent falling through the canvas
         this.velocity.y = 0 
       } 
       else this.velocity.y += gravity
    }

    attack() {
      this.isAttacking = true // only in a PERIOD OF TIME LMAO
      setTimeout(() => {
          this.isAttacking = false
      }, 100)

    }
}

const player = new Sprite({ //create a new object from this Claass (object oriented) following this this.position and this.velocity
    position: {
      x: 0,
      y: 0 
   },
    velocity:{
      x: 0,
      y: 0
   },
    offset:{
      x: 0,
      y: 0
   }
})

//player.draw() // make it appear!! SHAMBLA!

const enemy = new Sprite({
    position: {
      x: 400,
      y: 100
  },
    velocity:{
      x: 0,
      y: 0
  },
    color: 'blue',
    offset:{
      x: -50,
      y: 0
   }
})
  


enemy.draw() // make enemy appear!!

console.log(player)
// WASD keys control
const keys = {
  a:{
    pressed: false
  },
  
  d:{
    pressed: false
  },

  w: {
    pressed: false
  },
  
  ArrowRight: {
    pressed: false
  },

  ArrowLeft: {
    pressed: false
  }
}
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

decreaseTimer()



function animate(){
  window.requestAnimationFrame(animate) // which function do I want to REPEAT FRAMES OVER AND OVER AGAIN?? an infinite loop
  //console.log('meo') // arbitrary argument 'go'
  c.fillStyle = 'black' //black rectangle
  c.fillRect(0, 0, canvas.width, canvas.height) // the same as painting the background to make te animation frame by frame
  player.update() //from line 24, instead of draw
  enemy.update() // update = draw + y.postion +=10 lun ó 
  

  player.velocity.x = 0 // DEFAULT VELOCITY to 0 after keyup
  enemy.velocity.x = 0 
  
  // player movement
  if (keys.a.pressed && player.lastKey === 'a'){
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastKey === 'd'){
    player.velocity.x = 5
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 5
  }  

  // detect collisions: if right side attack box >= enemey left side
  if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: enemy   
      }) &&
      player.isAttacking
  ) { 
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    console.log('player attack succesful')
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player 
    }) &&
    enemy.isAttacking
) { 
  enemy.isAttacking = false
  player.health -=20
  document.querySelector('#playerHealth').style.width = player.health + '%'
  console.log('enemy attack succesful')
  }

  // END GAME based on Health
  if (enemy.health <= 0 || player.health <=0 ){
     determineWinner({player, enemy, timerId}) // pass the timerId through to get the time to stop once health === 0

  }

}

animate()

//event listener = react to a specific event
// I. when PRESSED KEY DOWN 
window.addEventListener('keydown', (event) => {
  console.log(event.key)
  switch (event.key) {
     case 'd':
       keys.d.pressed = true //move 1 pixel every d pressed
       player.lastKey = 'd'
       break //grab key = "d" and do just "if-then"
    
    case 'a':
       keys.a.pressed = true
       player.lastKey = 'a'
       break

    case 'w':
       player.velocity.y = -20
       break

    case ' ':  //SPACEBAR
       player.attack()
       break

  // SECOND PLAYER PROPERTY INDEPEDENT FROM ONE  - diffferntlastkey
    case 'ArrowRight':
        keys.ArrowRight.pressed = true //move 1 pixel every d pressed
        enemy.lastKey = 'ArrowRight'
        break //grab key = "d" and do just "if-then"
     
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
 
    case 'ArrowUp':
        enemy.velocity.y = -20
        break
    case 'ArrowDown':
        enemy.attack() = true
        break 

  }
  console.log(event.key)
})

// II. when RELEASE KEY UP
window.addEventListener('keyup', (event) => {
  switch (event.key) {
     case 'd':
       keys.d.pressed = false  //move 1 pixel every d pressed
       break //grab key = "d" and do just "if-then"

    case 'a':
       keys.a.pressed = false
       break
    // KHÔNG CẦN case 'w':keys.w.pressed = false do đã có gravity làm nhiệm vụ kéo về!
    }

  switch (event.key) {
     case 'ArrowRight':
        keys.ArrowRight.pressed = false  //move 1 pixel every d pressed
        break //grab key = "d" and do just "if-then"
 
     case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
  console.log(event.key)
})
// 'keydown' = press any key!! 

