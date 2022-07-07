class Sprite{ // DECONSTRUCTING! wrapping arguments position and velocity so the order doenst matter CLEANER AND MORE MANAGABLE!
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }){ // define a Function within a Class, define a property with a Sprite 
        this.position = position  //create a new constant of Sprite prefixed by -this. 
        this.width = 50
        this.height = 150
        this.image = new Image() // HTML image but with Javascript property
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax // SHOP ANIMATION 
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
       }
    draw(){
        c.drawImage
            (this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),    //crop PROPERTY FOR SHOP ANIMATION
            0,    // SHOP ANIMATION
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            ( this.image.width / this.framesMax )*this.scale, // SHOP ANIMATION 
            this.image.height*this.scale) // no static value plese!
    }
    
    animateFrames(){ // because used in both line 42 and 86 update()'s so create a function within class Sprite to clean up the codes
             // COPIED FROM UPDATE()
             this.framesElapsed++
             if (this.framesElapsed % this.framesHold === 0) {
                if (this.framesCurrent < this.framesMax - 1 ){// as long as framesCurrent < framesMax
                   this.framesCurrent++
             }  else {
             this.framesCurrent = 0 //repeat the animation process
             }
           }
            
    }
  
  
    update(){
        this.draw() //refercing the above
        this.animateFrames()
     }
 }
 // copy-and-pasted Sprite
 class Fighter extends Sprite { // DECONSTRUCTING! wrapping arguments position and velocity so the order doenst matter CLEANER AND MORE MANAGABLE!
   constructor({
          position, 
          velocity, 
          color = 'red', 
          imageSrc, 
          scale = 1, 
          framesMax = 1, 
          offset = {x: 0, y: 0}, 
          sprites,
          attackBox = { offset: {}, width: undefined, height: undefined }
          }){ // define a Function within a Class, define a property with a Sprite 
       super({
          position, //inherit directly from Sprite
          imageSrc,// properties within the parents
          scale,
          framesMax,
          offset,
          //framesCurrent,
          //framesElapsed,
          //framesHold,       
        })
       //this.position = position  //create a new constant of Sprite prefixed by -this. 
       this.velocity = velocity
       this.width = 50
       this.height = 150
       this.lastKey
       this.attackBox = { //GIVE property here!!follow the player around
        position: {
          x: this.position.x, // SHADOW parentposition?
          y: this.position.y
        },
        offset: attackBox.offset, // = "offset: offset," alone
        width: attackBox.width,
        height: attackBox.height,
       }
       this.color = color
       this.isAttacking
       this.health = 100
       this.framesCurrent = 0
       this.framesElapsed = 0
       this.framesHold = 5
       this.sprites = sprites 
       this.dead = false
       for (const sprite in this.sprites){ // sprite doesnt change so const?? 
// referencing IDLE or RUN object within sprites from const player
     // + referencing a property within with prefix +.image
          sprites[sprite].image = new Image()
          sprites[sprite].image.src = sprites[sprite].imageSrc
       }
       console.log(this.sprites);
   }
 
  
 

 
   update(){
       this.draw() //refercing the above
       // "this.velocity.y += gravity " instead of this line of code here and update every single frame put it in canvas.height constraints
       if (!this.dead) {
        this.animateFrames()
       }
       

       //attack boxes
       this.attackBox.position.x = this.position.x + this.attackBox.offset.x
       this.attackBox.position.y = this.position.y + this.attackBox.offset.y
       
       // DRAW THE ATTACK BOX
       //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
       this.position.x += this.velocity.x 
       this.position.y += this.velocity.y
   // if phần đầu cục + phần dài cục + phần cuối cùng đụng thành
   // gravity function 
      if(this.position.y  + this.height + this.velocity.y >= canvas.height - 96){ //prevent falling through the canvas
         this.velocity.y = 0 
         this.position.y = 330
       } 
       else this.velocity.y += gravity
       //console.log(this.position.y);
    }
 
    attack() {
      this.switchSprite('attack1') // activating on 
      this.isAttacking = true // only in a PERIOD OF TIME LMAO
      //setTimeout(() => {
      //   this.isAttacking = false // before frame 4 !!
      // }, 1000)
    }
     
    takeHit(){
      
      this.health -= 20
      // DEATH!!!
      if (this.health <= 0){
        this.switchSprite('death')
      } else 
      this.switchSprite('takeHit')
    }
 

   
   

  switchSprite(sprite){   
    // overriding with death  
    if (this.image === this.sprites.death.image){
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true 
        return
  
    }
    //}
    //overriding all other animation with the ATTACK ANIMATION                     
    if (this.image === this.sprites.attack1.image 
      && this.framesCurrent < this.sprites.attack1.framesMax - 1 ){ //this conditions allow for the sprites.framesMax to stop after 1 action REMEMBER TO FRAMESMAX - 1 
      return // to activate attack despite moving or jumping 
    }

    // OVERRIDE when fighter gets HIT so prioritize being hit becaus the code is after?
    if (this.image === this.sprites.takeHit.image && 
      this.framesCurrent < this.sprites.takeHit.framesMax - 1 ){
      return // if not attacking but get hit then get hit?
    }  
      switch(sprite) {// switch case statement
         case 'idle':
           if (this.image !== this.sprites.idle.image){
              this.image = this.sprites.idle.image
              this.framesMax = this.sprites.idle.framesMax
              this.framesCurrent = 0
           }
           
           //player.image = player.sprites.idle.image replace player with prefix -this. because player is an instance of class const player from class Fighter
           break
         case 'run':
           if (this.image !== this.sprites.run.image){
              this.image = this.sprites.run.image
              this.framesMax = this.sprites.run.framesMax
              this.framesCurrent = 0
           }
           break
         case 'jump':
           if (this.image !== this.sprites.jump.image){  
              this.image = this.sprites.jump.image
              this.framesMax = this.sprites.jump.framesMax // because the framesMax is different with Jump
              this.framesCurrent = 0
           }
           break

         case 'fall':
            if (this.image !== this.sprites.fall.image){  
               this.image = this.sprites.fall.image
               this.framesMax = this.sprites.fall.framesMax // because the framesMax is different with Jump
               this.framesCurrent = 0
            }
            break

         case 'attack1':
              if (this.image !== this.sprites.attack1.image){  
                 this.image = this.sprites.attack1.image
                 this.framesMax = this.sprites.attack1.framesMax // because the framesMax is different with Jump
                 this.framesCurrent = 0
              }
              break
         
         case 'takeHit':
              if (this.image !== this.sprites.takeHit.image){  
                   this.image = this.sprites.takeHit.image
                   this.framesMax = this.sprites.takeHit.framesMax // because the framesMax is different with Jump
                   this.framesCurrent = 0
              }
              break

         case 'death':
              if (this.image !== this.sprites.death.image){  
                     this.image = this.sprites.death.image
                     this.framesMax = this.sprites.death.framesMax // because the framesMax is different with Jump
                     this.framesCurrent = 0
              }
              break
           
    }
 }
}
 
   