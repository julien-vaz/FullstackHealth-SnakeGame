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