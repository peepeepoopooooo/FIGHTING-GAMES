const canvas = document.querySelector('canvas') //querySelector = select ELEMENTS from HTML 

//const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7 // downward acceleration as we go down

const background = new Sprite({
  position:{
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png' // /. start from index.js then img folder then background.png

})

const shop = new Sprite({
  position:{
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png', // /. start from index.js then img folder then background.png
  scale: 2.75,
  framesMax: 6 // SHOP ANIMATION 
})

const player = new Fighter({ //create a new object from this Claass (object oriented) following this this.position and this.velocity
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
   },
   imageSrc: './img/samuraiMack/Idle.png',
   framesMax: 8,
   scale: 2.5, 
   offset: {
      x: 215,
      y: 167,
   },
   sprites: {
      idle: {
         imageSrc: './img/samuraiMack/Idle.png',
         framesMax: 8
      },
      run: {
        imageSrc: './img/samuraiMack/Run.png',
        framesMax: 8 //cai số frame á 
      },
      jump: {
        imageSrc: './img/samuraiMack/Jump.png',
        framesMax: 2 //cai số frame á 
      },
      fall: {
        imageSrc: './img/samuraiMack/Fall.png',
        framesMax: 2,

      },
      attack1: {
        imageSrc: './img/samuraiMack/Attack1.png',
        framesMax: 6,

      },
      takeHit: {
        imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
        framesMax: 4,
      },
      death: {
        imageSrc: './img/samuraiMack/Death.png',
        framesMax: 6,
      },

   },
      attackBox:{
          offset:{
            x: 100,
            y: 50,
          },
          width: 160,
          height: 50
      },
})

//player.draw() // make it appear!! SHAMBLA!

const enemy = new Fighter({
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
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5, 
  offset: {
     x: 215,
     y: 157,
  },
  sprites: {
     idle: {
        imageSrc: './img/kenji/Idle.png',
        framesMax: 4,
     },
     run: {
       imageSrc: './img/kenji/Run.png',
       framesMax: 8 //cai số frame á 
     },
     jump: {
       imageSrc: './img/kenji/Jump.png',
       framesMax: 2 //cai số frame á 
     },
     fall: {
       imageSrc: './img/kenji/Fall.png',
       framesMax: 2,

     },
     attack1: {
       imageSrc: './img/kenji/Attack1.png',
       framesMax: 4,

     },
     takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3,
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7,
    },



  },
  attackBox:{
    offset:{
      x: -170, // objects are drawn from top left corner
      y: 50,
    },
    width: 170,
    height: 50
  },
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


decreaseTimer()

function animate(){
  window.requestAnimationFrame(animate) // which function do I want to REPEAT FRAMES OVER AND OVER AGAIN?? an infinite loop
  //console.log('meo') // arbitrary argument 'go'
  c.fillStyle = 'black' //black rectangle
  c.fillRect(0, 0, canvas.width, canvas.height) // the same as painting the background to make te animation frame by frame
  background.update() // cái OOP const background = new Sprite á 
  shop.update()                    // LAYER THE SHOP BEFORE THE PLAYER AND AFTERT HE BACKGROUND
  
  // SEPERATE BACKGROUND FROM CHARACTER
  c.fillStyle = 'rgba(255,255,255, 0)' // rgba ( red, green, blue, opacity)
  c.fillRect(0,0, canvas.width,canvas.height)
  
  player.update() //from line 24, instead of draw
  enemy.update() // update = draw + y.postion +=10 lun ó 
  
  player.velocity.x = 0 // DEFAULT VELOCITY to 0 after keyup
  enemy.velocity.x = 0 
  
  // player movement
  
  // player + IDLE movement - default setting:
  
  // sprite này về framesMax = 9
  //player.image = player.sprites.idle.image

  // player + MOVING movement
  if (keys.a.pressed && player.lastKey === 'a'){
      player.velocity.x = -5
      player.switchSprite('run')
    // line 131 below determines what animation goes with what action: determine when RUN animation get plays with which  button
    //player.image = player.sprites.run.image // select run property
  } else if (keys.d.pressed && player.lastKey === 'd'){
      player.velocity.x = 5
      player.switchSprite('run')
    //player.image = player.sprites.run.image
  } else {
      player.switchSprite('idle') 
  }
  
  // player + JUMP movement
  //if (keys.' '.pressed && player.lastKey === ' '){
  if (player.velocity.y < 0){
    player.switchSprite('jump')
     //player.image = player.sprites.jump.image
     //player.framesMax = player.sprites.jump.framesMax // because the framesMax is different with Jump
  } else if (player.velocity.y > 0){
    player.switchSprite('fall')
  }
  

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {  // when not moving on x-axis
    enemy.switchSprite('idle')
  }

  // enemy + JUMP movement
  //if (keys.' '.pressed && player.lastKey === ' '){
    if (enemy.velocity.y < 0){
      enemy.switchSprite('jump')
       //player.image = player.sprites.jump.image
       //player.framesMax = player.sprites.jump.framesMax // because the framesMax is different with Jump
    } else if (enemy.velocity.y > 0){
      enemy.switchSprite('fall')
    }
  // detect collisions && enemy get hit : if right side attack box >= enemey left side
  if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: enemy   
      }) &&
      player.isAttacking && 
      player.framesCurrent === 4 // meticulous that the health decreases when hit
  ) { 
      enemy.takeHit()
      player.isAttacking = false // to stop the animation after action set
      //enemy.health -= 20
      //document.querySelector('#enemyHealth').style.width = enemy.health + '%'
      gsap.to('#enemyHealth', {
        width: enemy.health + '%'
      })

      console.log('player attack succesful')
  }

  // if player misses the enemy
  if (player.isAttacking && player.framesCurrent === 4 ){
    player.isAttacking = false
  }


// detect collisions && player get hit : if right side attack box >= enemey left side
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player 
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
) { 
  player.takeHit()
  enemy.isAttacking = false
  //player.health -=20
  //document.querySelector('#playerHealth').style.width = player.health + '%'
  console.log('enemy attack succesful')
  gsap.to('#playerHealth', { //animate smoother healthline
    width: player.health + '%'
  })
  }

  // if enemy misses the player
  if (enemy.isAttacking && enemy.framesCurrent === 2 ){
    enemy.isAttacking = false
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
  if (!player.dead){
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
    }
  }

  if(!enemy.dead){
  switch(event.key){ // indepedent switch case
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
        enemy.attack() // yaes i got this right
        break 
    }
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

