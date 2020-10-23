"use strict";
{
    const $question = document.getElementById("question");
    const $commentary = document.getElementById("commentary");
    const $answerDisplay = document.getElementById("answerDisplay");
    const $buttonAll = document.getElementById("buttonAll");
    const $answer = document.getElementById("answer");
    const $next = document.getElementById("next");
    const $result = document.getElementById("result");
    const $scoreLabel = document.querySelector("#result > p");

    const quiz = shuffle([
        {q: "うさぎの歯は何本？", c: ["2本", "14本", "28本", "38本"], a: "28本", k: "前歯で固い草を切り、奥歯ですり潰して食べています"},
        {q: "ご長寿うさぎのギネス記録は？", c: ["13歳5ヶ月", "18歳10ヶ月", "20歳8ヶ月", "28歳2ヶ月"], a: "18歳10ヶ月", k: "うさぎの平均寿命は7年くらい(種類にもよります)なので18歳10ヶ月は長生きですね"},
        {q: "片目で見える範囲は何度？", c: ["190度", "200度", "210度", "220度"], a: "190度", k: "両目で見えない死角は目と目の間のおでこから尻尾にかけての縦ラインだそうです"},
        {q: "警戒中は(？)の動きが速くなる", c: ["足", "耳", "ひげ", "鼻"], a: "鼻", k: "鼻をヒクヒクさせて匂いを嗅ぎ続けます"},
        {q: "ピーターラビットのモデルになったうさぎの種類は？", c: ["ネザーランドドワーフ", "レッキス", "ホーランドロップイヤー", "ミニウサギ"], a: "ネザーランドドワーフ", k: "耳が短く体が丸っこいのが特徴でピーターラビットのモデルにもなりました"}
    ]);

    let quizNumber = 0;
    let correct = 0;
    let score = 0;

    function shuffle(arr){
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(Cbutton){
        if(quiz[quizNumber].a === Cbutton.textContent){
            correct = 1;
        } else {
            correct = 0;
        }
    }

    function quizDislay(){
        $answerDisplay.textContent = "";
        $commentary.textContent = "";
        $question.textContent = quiz[quizNumber].q;
        for(let i = 0; i < quiz[quizNumber].c.length; i++){
            const Cbutton = document.createElement("button");
            Cbutton.classList.add("btn");
            document.getElementById("buttonAll").appendChild(Cbutton);
            Cbutton.textContent = quiz[quizNumber].c[i];
            Cbutton.getAttribute("ontouchstart","");
            Cbutton.addEventListener("click", () => {
                checkAnswer(Cbutton);
                $answer.classList.remove("noClick");
            });
        }
    }
    quizDislay();

    $answer.addEventListener("click", () => {
        if ($answer.classList.contains("noClick")){
            return;
        }
        $question.classList.add("red");
        $buttonAll.textContent = "";
        $question.textContent = "正解は：" + quiz[quizNumber].a;
        $commentary.textContent = quiz[quizNumber].k;
        if (correct === 1){
            $answerDisplay.textContent = "結果：正解";
            score++;
            correct = 0;
        } else {
            $answerDisplay.textContent = "結果：不正解";
        }
        $answer.classList.add("noClick");
        $next.classList.remove("disabled");
        if(quizNumber === 2){
            $next.textContent = "結果";
        } else {
            return;
        }
    });

    $next.addEventListener("click", () => {
        if ($next.classList.contains("disabled")){
            return;
        }
        $question.classList.remove("red");
        $next.classList.add("disabled");
        if (quizNumber === 2){
            $result.classList.remove("hidden");
            $scoreLabel.textContent = `正解数:${score} / 3`;
        } else {
            quizNumber++;
            quizDislay();
        }
    });
}