
const serviceName = "Random Service";
const subscribeForm = document.querySelector("#subscribeForm");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

let isSubscribed = false;
let submitCount = 0;



function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 소식 신청이 완료 되었습니다.";
    } 
    return "이메일을 입력한 뒤 신청해주세요.";
}


function handleSubscribe(event) {
    event.preventDefault();
    const subscriberEmail = emailInput.value.trim();
    if (subscriberEmail === "") {
        subscribeMessage.textContent = "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }
    isSubscribed = true;
    submitCount += 1;
    subscribeMessage.textContent =
         makeSubscribeMessage(subscriberEmail, isSubscribed);
    subscribeMessage.classList.add("is-success");
    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick(event) {
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";

}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);
    nicknameCount.textContent = currentLength + " / " + maxLength;
}

nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
    const agree = agreeCheck.checked;

    startButton.disabled = !agree;
    agreeMessage.textContent = agree
         ? "동의하셨습니다."
         : "시작하려면 동의가 필요합니다.";
        
    if (agree) {
        agreeMessage.classList.add("is-ready");
    } else {
        agreeMessage.classList.remove("is-ready");
    }
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function(tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function(panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activeateTab(clickedTab) {
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");
    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanels();
    activeateTab(event.currentTarget);
}

tabs.forEach(function(tab) {
    tab.addEventListener("click", handleTabClick);
});

const trainingFlow = document.querySelector("#training-flow");
const flowSteps = trainingFlow.querySelectorAll(".step");
const progressItems = trainingFlow.querySelectorAll(".progress_item");

const choiceError = document.querySelector("#choice-error")
const optionNext = document.querySelector("#option-next")

const titleInput = document.querySelector("#presentation-title");
const titleNameConnet = document.querySelector("#nameConnet");
const titleError = document.querySelector("#title-error")
const titlePrev = document.querySelector("#title-prev")
const titleNext = document.querySelector("#title-next")

const summaryPrev = document.querySelector("#summary-prev")
const finishButton = document.querySelector("#finish-button")
const suggest = document.querySelector("#suggest")
const suggestThank = document.querySelector("#suggest-thank");
const restartButton = document.querySelector("#restart-button")
const summaryTitle = document.querySelector("#summary-title")
const summaryDuration = document.querySelector("#summary-duration")
const summarySuggest = document.querySelector("#summary-suggest")


const formData = {
    choice:"", title:"", suggest: false
}

function showStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !==index;});
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const recodingDialog = document.querySelector("#recording-dialog");
const recodingCancel = document.querySelector("#recording-cancel");
const recodingConfirm = document.querySelector("#recording-confirm");

function revokeRecordingAgreement(){
    agreeCheck.checked = false;
    trainingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recodingDialog.showModal();
});
recodingCancel.addEventListener("click", () =>{
    recodingDialog.close()
    revokeRecordingAgreement()
});
recodingDialog.addEventListener("cancle", revokeRecordingAgreement);
recodingConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recodingDialog.close();
    trainingFlow.hidden = false;
    showStep(0);
    trainingFlow.scrollIntoView({behavior: "smooth"});
});
let choiceValue = null
function validateRadio() {
    const choiceRadio = document.querySelector('input[name="random_1"]:checked');
    if (choiceRadio == null) {
        choiceError.textContent = "랜덤 항목을 선택해 주세요";
        return false;
    } else {choiceError.textContent = "";
        choiceValue = choiceRadio.value
        formData.choice = choiceValue;
        return true;
    }
}

optionNext.addEventListener("click", () => {
    if(!validateRadio()) return;
    showStep(1)
})


function titleConnet() {
    const titleinputTrim = titleInput.value.trim()
    const titleinputView = titleInput.value
    if (!titleinputTrim){
        titleNameConnet.textContent = "결과 미리보기"
    } else {
        titleNameConnet.textContent = `${titleinputView} ${choiceValue}`;
    }
}
titleInput.addEventListener("input", titleConnet);

function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "항목(목적어)를 입력해주세요"
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if(!validateTitle()) return;
    summaryTitle.textContent = formData.title;
    summaryDuration.textContent = formData.choice;
    showStep(2)
})
titlePrev.addEventListener("click", () => {
    showStep(0)
})
suggest.addEventListener("change", (e) => {
    formData.suggest = e.target.checked;
    
    if (e.target.checked) {
        suggestThank.hidden = false; 
    } else {
        suggestThank.hidden = true; 
    }
});
summaryPrev.addEventListener("click", () => {
    showStep(1); 
});

finishButton.addEventListener("click", () => {
    console.log("최종 제출 데이터:", formData);
    showStep(3);
});
restartButton.addEventListener("click", () => {
    formData.choice = "";
    formData.title = "";
    formData.suggest = false;
    choiceValue = null;

    const checkedRadio = document.querySelector('input[name="random_1"]:checked');
    if(checkedRadio) checkedRadio.checked = false;
    
    titleInput.value = "";
    titleNameConnet.textContent = "결과 미리보기";
    suggest.checked = false;
    suggestThank.hidden = true;

    showStep(0);
});

