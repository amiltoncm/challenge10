/**
 * Selecionar a área do canvas.
 */
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

/**
 * Pegar o tamanho máximo da tela.
 */
const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

/**
 * Função para gerar número aleatório.
 */
function randomize(minValue, maxValue) {
  const number =
    Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  return number
}

/**
 * Objeto da bola.
 */
function Ball(posX, posY, velocityX, velocityY, color, size) {
  this.posX = posX
  this.posY = posY
  this.velocityX = velocityX
  this.velocityY = velocityY
  this.color = color
  this.size = size
}

/**
 * Desenhando a bola na tela dentro do canvas.
 */
Ball.prototype.draw = function () {
  context.beginPath()
  context.fillStyle = this.color
  context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI)
  context.fill()
}

/**
 * Atualizando os dados da bola.
 */
 Ball.prototype.update = function() {
  if ((this.posX + this.size) >= width) {
    this.velocityX = -(this.velocityX);
  }

  if ((this.posX - this.size) <= 0) {
    this.velocityX = -(this.velocityX);
  }

  if ((this.posY + this.size) >= height) {
    this.velocityY = -(this.velocityY);
  }

  if ((this.posY - this.size) <= 0) {
    this.velocityY = -(this.velocityY);
  }

  this.posX += this.velocityX;
  this.posY += this.velocityY;
}

/**
 * Detectando colisões.
 */
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.posX - balls[j].posX
      const dy = this.posY - balls[j].posY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[j].size) {
          balls[j].posX = (balls[j].posX * 1) * -1
          balls[j].posY = (balls[j].posY * 1) * -1
          this.posX = (this.posX * 1) * -1
          this.posY = (this.posY * 1) * -1

          // Mudar cor da bola.        
//        balls[j].color = this.color =
//          'rgb(' +
//          randomize(0, 255) +
//          ',' +
//          randomize(0, 255) +
//          ',' +
//          randomize(0, 255) +
//          ')'

      }
    }
  }
}

/**
 * Array para guardar as bolas.
 */
let balls = []

/**
 * Controle da quantidade máxima de bolas.
 */
const maxBalls = 30

/**
 * Velocidade máxima.
 */

/**
 * Função de loop, cria o cenário e faz a animação.
 * Cria tamanho e cores aleatórias.
 */
function loop() {
  context.fillStyle = 'rgba(0, 0, 0, 0.25)'
  context.fillRect(0, 0, width, height)

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw()
    balls[i].update()
    balls[i].collisionDetect()
  }

  requestAnimationFrame(loop)
}

/**
 * Chama o loop.
 */
loop()

function newBall() {
  if (balls.length <= maxBalls) {
    let size = randomize(7, 25)
    let ball = new Ball(
      randomize(0 + size, width - size), // posX
      randomize(0 + size, height - size), // posY
      randomize(1, 10), // velocityX
      randomize(1, 10), // velocityY
      'rgb(' + // color
        randomize(0, 255) +
        ',' +
        randomize(0, 255) +
        ',' +
        randomize(0, 255) +
        ')',
      size //size
    )
    balls.push(ball)
  }
}
