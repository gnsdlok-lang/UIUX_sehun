
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


const SecformData = {
    choice:"", title:"", suggest: false
}

function recordingshowStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !==index;});
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const recordingDialog = document.querySelector("#recording-dialog");
const recordingCancel = document.querySelector("#recording-cancel");
const recordingConfirm = document.querySelector("#recording-confirm");

function revokeRecordingAgreement(){
    agreeCheck.checked = false;
    trainingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recordingDialog.showModal();
});
recordingCancel.addEventListener("click", () =>{
    recordingDialog.close()
    revokeRecordingAgreement()
});
recordingDialog.addEventListener("cancle", revokeRecordingAgreement);
recordingConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recordingDialog.close();
    trainingFlow.hidden = false;
    recordingshowStep(0);
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
        SecformData.choice = choiceValue;
        return true;
    }
}

optionNext.addEventListener("click", () => {
    if(!validateRadio()) return;
    recordingshowStep(1)
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
    SecformData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if(!validateTitle()) return;
    summaryTitle.textContent = SecformData.title;
    summaryDuration.textContent = SecformData.choice;
    recordingshowStep(2)
})
titlePrev.addEventListener("click", () => {
    recordingshowStep(0)
})
suggest.addEventListener("change", (e) => {
    SecformData.suggest = e.target.checked;
    
    if (e.target.checked) {
        suggestThank.hidden = false; 
    } else {
        suggestThank.hidden = true; 
    }
});
summaryPrev.addEventListener("click", () => {
    recordingshowStep(1); 
});

finishButton.addEventListener("click", () => {
    console.log("최종 제출 데이터:", SecformData);
    recordingshowStep(3);
});
restartButton.addEventListener("click", () => {
    SecformData.choice = "";
    SecformData.title = "";
    SecformData.suggest = false;
    choiceValue = null;

    const checkedRadio = document.querySelector('input[name="random_1"]:checked');
    if(checkedRadio) checkedRadio.checked = false;
    
    titleInput.value = "";
    titleNameConnet.textContent = "결과 미리보기";
    suggest.checked = false;
    suggestThank.hidden = true;

    recordingshowStep(0);
});

const mealFlow = document.querySelector("#meal-flow");
const mealSteps = mealFlow.querySelectorAll(".meal-step");
const progressItemsMeal = mealFlow.querySelectorAll(".progress_item");

const startMealBtn = document.querySelector("#start-meal-btn");
const mealStartDialog = document.querySelector("#meal-start-dialog");
const startCancel = document.querySelector("#start-cancel");
const startConfirm = document.querySelector("#start-confirm");

const purposeError = document.querySelector("#purpose-error");
const purposeNext = document.querySelector("#purpose-next");

const categoryCheckboxes = document.querySelectorAll('input[name="meal_category"]');
const categoryPreview = document.querySelector("#category-preview");
const categoryError = document.querySelector("#category-error");
const categoryPrev = document.querySelector("#category-prev");
const categoryNext = document.querySelector("#category-next");

const resultImage = document.querySelector("#result-image");
const resultName = document.querySelector("#result-name");
const resultPrev = document.querySelector("#result-prev");
const resultRerun = document.querySelector("#result-rerun");
const resultExit = document.querySelector("#result-exit");

const mealExitDialog = document.querySelector("#meal-exit-dialog");
const exitSave = document.querySelector("#exit-save");
const exitClose = document.querySelector("#exit-close");

const DinnerformData = {
    purpose: "",
    categories: [],
    finalResult: null
};


function MealshowStep(index) {
    mealSteps.forEach((step, i) => { 
        step.hidden = i !== index;
    });
    progressItemsMeal.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

function resetFlow() {
    DinnerformData.purpose = "";
    DinnerformData.categories = [];
    DinnerformData.finalResult = null;

    const checkedRadio = document.querySelector('input[name="meal_purpose"]:checked');
    if(checkedRadio) checkedRadio.checked = false;
    categoryCheckboxes.forEach(cb => cb.checked = false);

    purposeError.textContent = "";
    categoryError.textContent = "";
    categoryPreview.textContent = "";
}

function runRandomizer() {
    let candidateList = [];
    const targetData = menuData[DinnerformData.purpose]; 
    
    DinnerformData.categories.forEach(category => {
        if (targetData[category]) {
            candidateList = candidateList.concat(targetData[category]);
        }
    });

    const randomIndex = Math.floor(Math.random() * candidateList.length);
    DinnerformData.finalResult = candidateList[randomIndex];

    resultImage.src = `./assets/images/${DinnerformData.finalResult.id}.PNG`;
    resultImage.alt = DinnerformData.finalResult.name;
    resultName.textContent = DinnerformData.finalResult.name;
}


startMealBtn.addEventListener("click", () => {
    mealStartDialog.showModal();
});

startCancel.addEventListener("click", () => {
    mealStartDialog.close();
    mealFlow.hidden = true; 
});



startConfirm.addEventListener("click", () => {
    resetFlow();
    mealStartDialog.close();
    mealFlow.hidden = false;
    MealshowStep(0); 
    mealFlow.scrollIntoView({behavior: "smooth"});
});


purposeNext.addEventListener("click", () => {
    const checkedRadio = document.querySelector('input[name="meal_purpose"]:checked');
    if (!checkedRadio) {
        purposeError.textContent = "목적을 선택해주세요";
        return;
    }
    purposeError.textContent = "";
    DinnerformData.purpose = checkedRadio.value;
    MealshowStep(1); 
});


categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const checkedValues = Array.from(categoryCheckboxes)
                                   .filter(cb => cb.checked)
                                   .map(cb => cb.value);
        if (checkedValues.length > 0) {
            categoryPreview.textContent = `[${checkedValues.join(", ")} 항목이 선택되었습니다]`;
            categoryError.textContent = "";
        } else {
            categoryPreview.textContent = "";
        }
    });
});


categoryPrev.addEventListener("click", () => {
    MealshowStep(0);
});


categoryNext.addEventListener("click", () => {
    const checkedValues = Array.from(categoryCheckboxes)
                               .filter(cb => cb.checked)
                               .map(cb => cb.value);
    
    if (checkedValues.length === 0) {
        categoryError.textContent = "항목을 선택해주세요";
        return;
    }
    
    DinnerformData.categories = checkedValues;
    runRandomizer(); 
    MealshowStep(2); 
});


resultPrev.addEventListener("click", () => {
    MealshowStep(1); 
});


resultRerun.addEventListener("click", () => {
    runRandomizer(); 
});


resultExit.addEventListener("click", () => {
    mealExitDialog.showModal();
});


exitSave.addEventListener("click", () => {
    alert(`${DinnerformData.finalResult.name} 메뉴 저장기능 업데이트중`);
    mealExitDialog.close();
    mealFlow.hidden = true;
});


exitClose.addEventListener("click", () => {
    mealExitDialog.close();
    mealFlow.hidden = true;
});

const menuData = {
    "식사": {
        "한식": [{ id: "011", name: "김치찌개" }, { id: "012", name: "제육볶음" }, { id: "013", name: "비빔밥(돌솥비빔밥)" }, { id: "014", name: "된장찌개(순두부찌개)" }, { id: "015", name: "구운 생선" }, { id: "016", name: "냉면" }, { id: "017", name: "분식" }],
        "중식": [{ id: "021", name: "짜장면(짬뽕)" }, { id: "022", name: "마파두부" }, { id: "023", name: "마라탕" }],
        "양식": [{ id: "031", name: "파스타" }, { id: "032", name: "스테이크" }, { id: "033", name: "샐러드" }, { id: "034", name: "햄버거" }, { id: "035", name: "샌드위치" }, { id: "036", name: "피자" }, { id: "037", name: "치킨" }],
        "일식": [{ id: "041", name: "초밥" }, { id: "042", name: "사시미 정식" }, { id: "043", name: "돈카츠" }, { id: "045", name: "라멘" }, { id: "046", name: "우동(소바)" }, { id: "047", name: "카레" }, { id: "048", name: "규동" }]
    },
    "회식": {
        "한식": [{ id: "111", name: "삼겹살" }, { id: "112", name: "곱창" }, { id: "113", name: "해물파전(막걸리)" }, { id: "114", name: "보쌈(족발)" }, { id: "115", name: "부대찌개" }, { id: "116", name: "닭갈비" }],
        "중식": [{ id: "121", name: "코스요리" }, { id: "122", name: "깐풍기" }, { id: "123", name: "양꼬치" }, { id: "124", name: "양장피(유린기)" }],
        "양식": [{ id: "131", name: "스테이크" }, { id: "132", name: "파스타" }, { id: "133", name: "치킨(맥주)" }, { id: "134", name: "와인바" }],
        "일식": [{ id: "141", name: "계절회" }, { id: "142", name: "초밥" }, { id: "143", name: "오뎅집" }, { id: "144", name: "이자카야" }]
    }
};