const canvas = document.querySelector('canvas') //querySelector = select ELEMENTS from HTML 

//const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7 // downward acceleration as we go down

class Sprite{ // DECONSTRUCTING! wrapping arguments position and velocity so the order doenst matter CLEANER AND MORE MANAGABLE!
   constructor({position, velocity}){ // define a Function within a Class, define a property with a Sprite 
       this.position = position  //create a new constant of Sprite prefixed by -this. 
       this.velocity = velocity
       this.height = 150
       this.lastKey
   }

  

   draw(){
      c.fillStyle = 'red'
      c.fillRect(this.position.x, this.position.y, 50, this.height) // pass position from Spirte from player to draw, this.position.x
   }

   update(){
       this.draw() //refercing the above
       // "this.velocity.y += gravity " instead of this line of code here and update every single frame put it in canvas.height constraints
       
       this.position.x += this.velocity.x 
       this.position.y += this.velocity.y
   // if phần đầu cục + phần dài cục + phần cuối cùng đụng thành
       if(this.position.y  + this.height + this.velocity.y >= canvas.height){ //prevent falling through the canvas
         this.velocity.y = 0 
       } 
       else this.velocity.y += gravity
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

function animate(){
  window.requestAnimationFrame(animate) // which function do I want to REPEAT FRAMES OVER AND OVER AGAIN?? an infinite loop
  console.log('go') // arbitrary argument 'go'
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

