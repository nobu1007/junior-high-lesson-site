/**
 * 中学教材サイト — 練習問題ユーティリティ
 * 選択式・穴埋め式の判定とフィードバック表示を提供する。
 */
"use strict";

/* ---------- 選択式 ---------- */
function initChoiceQuiz(quizEl) {
  const choices = quizEl.querySelectorAll(".choices li");
  const btnCheck = quizEl.querySelector(".btn-check");
  const feedback = quizEl.querySelector(".feedback");
  let selected = null;

  choices.forEach(function (li) {
    li.addEventListener("click", function () {
      choices.forEach(function (c) { c.classList.remove("selected"); });
      li.classList.add("selected");
      selected = li;
    });
  });

  if (btnCheck) {
    btnCheck.addEventListener("click", function () {
      if (!selected) return;
      choices.forEach(function (c) { c.classList.remove("correct", "wrong"); });
      var isCorrect = selected.dataset.correct === "true";
      selected.classList.add(isCorrect ? "correct" : "wrong");
      if (feedback) {
        feedback.textContent = isCorrect
          ? selected.dataset.msgCorrect || "正解！よくできました！"
          : selected.dataset.msgWrong || "おしい！もう一度考えてみよう。";
        feedback.className = "feedback show " + (isCorrect ? "feedback--correct" : "feedback--wrong");
      }
    });
  }
}

/* ---------- 穴埋め式 ---------- */
function initFillBlankQuiz(quizEl) {
  var btnCheck = quizEl.querySelector(".btn-check");
  var feedback = quizEl.querySelector(".feedback");

  if (btnCheck) {
    btnCheck.addEventListener("click", function () {
      var inputs = quizEl.querySelectorAll(".fill-blank");
      var allCorrect = true;
      inputs.forEach(function (input) {
        var answer = (input.dataset.answer || "").trim();
        var value = input.value.trim();
        if (value === answer) {
          input.style.borderBottomColor = "var(--color-success)";
        } else {
          input.style.borderBottomColor = "var(--color-danger)";
          allCorrect = false;
        }
      });
      if (feedback) {
        feedback.textContent = allCorrect
          ? "全問正解！すばらしい！"
          : "まちがいがあるよ。ヒントを読んで、もう一度やってみよう。";
        feedback.className = "feedback show " + (allCorrect ? "feedback--correct" : "feedback--wrong");
      }
    });
  }
}

/* ---------- 解説の折りたたみ ---------- */
function initExplanationToggles() {
  document.querySelectorAll(".explanation-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var body = btn.nextElementSibling;
      if (body && body.classList.contains("explanation-body")) {
        body.classList.toggle("open");
        btn.textContent = body.classList.contains("open") ? "解説をとじる" : "解説を見る";
      }
    });
  });
}

/* ---------- 初期化 ---------- */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".quiz-question[data-type='choice']").forEach(initChoiceQuiz);
  document.querySelectorAll(".quiz-question[data-type='fill']").forEach(initFillBlankQuiz);
  initExplanationToggles();
});
