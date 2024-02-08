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
    let food;

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

   createBG(context);

   /*
   Crie uma função chamada "createSnake". Esta funçao é responsável por gerar o posicionamento
    da cobrinha no jogo. Ela é uma sequência de quadradinhos verdes.
    Portantoe precisamos "pintar" o canvas de verde de acordo com o tamanho e coordenadas da snake.

    Conforme ela come os "foods" ela aumenta. Isso significa um aumento na Array.
    Portanto precisamos de um loop que esteja sempre atento à array recriando a cobrinha no contexto do canva.
    */
   function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
   }
   createSnake();

   /*
   O jogo demanda uma funcionalidade que "renderize" também o "food".
    Crie uma função "createFood". A mesma lógica de criação do background e da cobrinha é aplicada.

    preciamos definir a coloração do contexto (fillStyle) e desenhá-lo em formato retangular (fillRect).
    */
   function createFood() {
    food = new Segment(Math.floor(Math.random() * 16 * box), Math.floor(Math.random() * 16 * box));
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, 32, 32);
   };
   createFood();