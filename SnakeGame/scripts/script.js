class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/*
comece criando as variáveis globais do jogo.

    (A) canvas : este é o canvas do html
    (B) context : este é o contexto do canvas
    (C) box : este é o tamanho da caixa
    (D) snake : esta é a cobrinha, a personagem principal do game.
    (E) direction : este é o sentido/direção em que a cobrinha vai andar.
    (F) food : é a comida que a cobrinha come e cresce.

    A. o canvas é um elemento html já existente no index.html do boilerplaite que vcs recebeream. Lembre-se como "puxamos" do html os elementos via DOM para criá-lo.
    */
const canvas = document.getElementById("snake");

/*
B. Este é um elemento interno ao canvas, portanto, assim que criado seu canvas, vc pode selecionar seu contexto, neste caso ele é 2d (documentação pode te ajudar).
*/
const context = canvas.getContext("2d");

/*
C. Este é o tamanho geral do campo de jogo. Ele é um integer de valor 32.
*/
let box = 32;

/*
D. Esta é a personagem principal, cobrinha. Ela é um array de coordenadas multiplicadas pelo tamanho do box.

    A posição inicial da snake é x: 8 e y:8 multiplicados pelo valor de box.
*/
let snake = [];
snake[0] = new Segment(8 * box, 8 * box);

/*
E. Seu valor é uma string e o default é "right".
*/
let direction = "right";

/*
F. É um objeto de coordenadas aleatórias;
*/
let food = new Segment(Math.floor(Math.random() * 16) * box, Math.floor(Math.random() * 16) * box);

/*
G. Array de cores para criar o efeito arco íris
*/
const colors = ["red", "darkorange", "yellow", "chartreuse", "lightskyblue", "blueviolet", "violet"];

/*
Precisamos de uma função chamada "createBG" -- criar background --  que desenha nosso quadro do game.
Para isso precisamos utilizar o contexto do canvas, criado anteriormente, e
configurar sua cor (fillStyle) e desenhar o retângulo (fillRect). Os parâmetros
do retângulo são (0,0,16 * box, 16 * box).
*/
function createBG(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
};

/*
Crie uma função chamada "createSnake". Esta funçao é responsável por gerar o posicionamento
 da cobrinha no jogo. Ela é uma sequência de quadradinhos verdes.
 Portantoe precisamos "pintar" o canvas de verde de acordo com o tamanho e coordenadas da snake.

 Conforme ela come os "foods" ela aumenta. Isso significa um aumento na Array.
 Portanto precisamos de um loop que esteja sempre atento à array recriando a cobrinha no contexto do canva.
 */
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        let colorIndex;
        if (i > 6) {
            colorIndex = i % 7;
        } else {
            colorIndex = i;
        }
        context.fillStyle = colors[colorIndex];
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/*
O jogo demanda uma funcionalidade que "renderize" também o "food".
 Crie uma função "createFood". A mesma lógica de criação do background e da cobrinha é aplicada.

 preciamos definir a coloração do contexto (fillStyle) e desenhá-lo em formato retangular (fillRect).
 */
function createFood() {
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, 32, 32);
};

/*
A cobrinha vai andar, certo?

 Para encapsular essa mecânica, crie uma função "update" que receberá um parâmetro "event".
 Este evento é o "keydown" que representa o momento que o jogador movimenta a cobrinha para um lado ou outro pressionando teclas do teclado, as famosas setinhas.

 Precisamos identificar se essa tecla pressionada foi uma setinha, e qual das setinhas.
 Para isso usamos o event do "keydown" para confirmar seu "keyCode". Tambpem precisamos checar se a direção apertada não é a oposta da atual. Neste caso não há movimento.

 Cada keydown vai gerar um valor no parâmetro "direction". Criado lá no primeiro exercício com o default igual a "right".

 Lembre-se, a partir desse input evento que vamos verificar qual é a tecla, portando, direção, precisamos tomar decisão de pra onde a cobrinha vai andar.
*/
function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
};

/*
Chegamos ao grande epicentro do jogo.

Seu algoritmo principal de funcionamento.

Crie uma função chamada "startGame".

Este é o primeiro elemento do algorimto principal:

é a mecânica de movimentação, fazendo  a cobrinha atravessar a tela pro outro lado.

if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;


Ok, de posse da mecânica principal do movimento da cobrinha.
Precisamos de uma lógica de checagem para verificar se a cobrinha bateu nela mesma.
O que gera o evento game over.

Para isso. Lembrem-se da primeira semana de aula da mecânica do joguinho do Mario.
Lá tinhamos um algoritmo para detectar a colisão do Mario com o obstáculo.

A array que representa a snake é composta por objetos que armazenam as coordenads de cada quadradinho da snake. Crie um loop de checagem que verifica se algum dos eixos tem mais de um quadradinho na mesma coordenada, se tiver, é game over, pois a cobrinha bateu nela mesma.

Para o game over, crie um alerta para o usuario e pause o jogo utilizando "clearInterval"

Se nenhum dos eixos estiver se tocando, segue o o jogo!

Logo após esse loop, invoque as funções: createBG, createSnake, createFood em sequencia.
*/
function startGame() {
    if (snake[0].x > 15 * box) snake[0].x = 0;
    if (snake[0].x < 0) snake[0].x = 16 * box;
    if (snake[0].y > 15 * box) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (
            (snake[0].x + box - 1 < snake[i].x)
            ||
            (snake[0].x > snake[i].x + box - 1)
            ||
            (snake[0].y + box - 1 < snake[i].y)
            ||
            (snake[0].y > snake[i].y + box - 1)
        ) {
            continue;
        } else {
            alert("Game over");
            clearInterval(game);
        };
    };
    createBG(context);
    createSnake();
    createFood();

    /*
    Agora, declare duas variaveis: sankeX e snakeY. Elas precisam guardar os respectivos valroes de x e y do primeiro item da array snake. Estas duas coordenadas serão sempre a cabeça da snake.
    
    agora precisamos do mecanismo de direcionamento da snake, que se dará pelas coordenadas
    de sua "cabeça".
    
    Como segue abaixo.
    
    if( direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    /*
    Precisamos checar se a cobra comeu a comida ou não e também fazer a cobra andar.
    
    Com base nas coordenadas de food e snake vamos verificar se essas posições se sobrepõe.
    
    Caso seja negativa, a cobrinha ta andando normalmente sem comer a comida. então para
    que o movimento de andar aconteça, tiramos o ultimo quadradinho da array snake.
    
    Caso contrário, então, a cobra come a comida - suas coordenadas se cruzam - então criamos um novo food.
    
    ao final dessa parte criamos uma nova peça pra ser a cbaeça da cobra. "newHead".
    
    E adicionamoa-as a primeira posição da array snake.
    */
    let newHead = new Segment(snakeX, snakeY);
    if (
        (snakeX + box - 1 < food.x)
        ||
        (snakeX > food.x + box - 1)
        ||
        (snakeY + box - 1 < food.y)
        ||
        (snakeY > food.y + box - 1)
    ) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 16) * box;
        food.y = Math.floor(Math.random() * 16) * box;
        createFood();

    };
    snake.unshift(newHead);
};
/*
Crie um eventLisneter para o evento de 'keydown' e configure seu callback para executar a função update.

Crie uma variável game que irá chamar a função setInterval. a função startGame é o callback da nossa função setInterval, e seu parametro de atualização será de 100 milissegundos.
 */
document.addEventListener("keydown", (event) => {
    update(event);
});

let game = setInterval(startGame, 100);
