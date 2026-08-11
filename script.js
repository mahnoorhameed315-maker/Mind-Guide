function startAssessment() {

    document.getElementById("home").style.display = "none";
    document.getElementById("assessment").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function analyzeAnswers() {

    let answers = [];

    // Check all 15 questions
    for (let i = 1; i <= 15; i++) {

        let selected = document.querySelector(
            'input[name="q' + i + '"]:checked'
        );

        if (!selected) {

            alert("Please answer all 15 questions before seeing your results.");

            return;
        }

        answers.push(Number(selected.value));
    }


    // --------------------------------
    // DIFFERENT PSYCHOLOGICAL AREAS
    // --------------------------------

    let stressScore =
        answers[1] +
        answers[5] +
        answers[7] +
        answers[10];

    let sleepScore =
        answers[2] +
        answers[3];

    let concentrationScore =
        answers[4] +
        answers[6];

    let socialScore =
        answers[8] +
        answers[9];

    let routineScore =
        answers[12] +
        answers[13];

    let emotionalScore =
        answers[0] +
        answers[11];


    // --------------------------------
    // AREA INFORMATION
    // --------------------------------

    let areas = [

        {
            name: "🧠 Stress & Worry",
            score: stressScore,
            max: 16,

            explanation:
                "Your responses suggest that stress, worry, or feeling overwhelmed may be affecting your daily experience.",

            suggestions: [
                "Break large responsibilities into smaller and manageable tasks.",
                "Take short breaks when you feel mentally overloaded.",
                "Notice which situations or responsibilities create the most stress.",
                "Try slow breathing, relaxation, or another calming activity.",
                "Talk to someone you trust when stress becomes difficult to manage."
            ]
        },


        {
            name: "😴 Sleep & Energy",
            score: sleepScore,
            max: 8,

            explanation:
                "Your responses suggest that sleep quality or daytime tiredness may deserve some attention.",

            suggestions: [
                "Try to maintain a consistent sleep and wake-up routine.",
                "Give yourself enough time for rest.",
                "Create a calm and relaxing routine before sleeping.",
                "Avoid filling your entire day with demanding activities.",
                "If sleep difficulties continue, consider speaking with a qualified professional."
            ]
        },


        {
            name: "🎯 Concentration & Motivation",
            score: concentrationScore,
            max: 8,

            explanation:
                "Your responses suggest that concentration or motivation may sometimes be difficult for you.",

            suggestions: [
                "Divide large tasks into smaller goals.",
                "Work on one task at a time.",
                "Reduce distractions when you need to concentrate.",
                "Take short planned breaks while studying or working.",
                "Set small achievable goals instead of expecting yourself to complete everything at once."
            ]
        },


        {
            name: "🤝 Social & Emotional Connection",
            score: socialScore,
            max: 8,

            explanation:
                "Your responses suggest that expressing feelings or feeling connected to others may be an area worth paying attention to.",

            suggestions: [
                "Talk about your feelings with someone you trust.",
                "Spend time with people who make you feel supported.",
                "Write down your thoughts when it is difficult to express them verbally.",
                "Allow yourself to ask for support when you need it.",
                "Try to maintain meaningful social connections."
            ]
        },


        {
            name: "🌱 Daily Routine & Enjoyment",
            score: routineScore,
            max: 8,

            explanation:
                "Your responses suggest that your daily routine or opportunities for enjoyable activities may need some attention.",

            suggestions: [
                "Create a simple and realistic daily routine.",
                "Make time for activities that you genuinely enjoy.",
                "Balance responsibilities with rest and enjoyable activities.",
                "Set small daily goals that are realistic for you.",
                "Avoid expecting yourself to be productive all the time."
            ]
        },


        {
            name: "💭 Emotional Well-being",
            score: emotionalScore,
            max: 8,

            explanation:
                "Your responses provide some indication that your overall emotional experience may deserve attention.",

            suggestions: [
                "Give yourself time to recognize and understand your feelings.",
                "Write down emotions that you find difficult to explain.",
                "Spend time doing activities that help you feel calm or positive.",
                "Talk with someone supportive when you are having a difficult time.",
                "Remember that asking for support is a healthy step."
            ]
        }

    ];


    // Highest score first
    areas.sort(function(a, b) {
        return b.score - a.score;
    });


    // --------------------------------
    // MAIN AREA
    // --------------------------------

    let mainArea = areas[0];

    let mainLevel;

    if (mainArea.score <= mainArea.max * 0.35) {

        mainLevel = "🌿 Generally Positive";

    } else if (mainArea.score <= mainArea.max * 0.65) {

        mainLevel = "🌱 Some Attention May Help";

    } else {

        mainLevel = "💡 Area Worth Focusing On";
    }


    // --------------------------------
    // START RESULT
    // --------------------------------

    let resultHTML = `

        <div class="result-header">

            <h2>🌿 Your MindGuide Reflection</h2>

            <p>
                Thank you for completing the self-reflection.
                Your responses can help highlight areas of your
                current daily well-being that may deserve attention.
            </p>

        </div>


        <div class="main-area">

            <h2>⭐ Main Area to Focus On</h2>

            <h3>${mainArea.name}</h3>

            <h4>${mainLevel}</h4>

            <p>
                ${mainArea.explanation}
            </p>

            <h4>What you can work on:</h4>

            <ul>
    `;


    // Main suggestions
    mainArea.suggestions.forEach(function(item) {

        resultHTML += `<li>${item}</li>`;

    });


    resultHTML += `

            </ul>

        </div>

        <hr>

        <h2>📊 Your Other Areas</h2>

        <p>
            The following sections show what your responses suggest
            about different areas of everyday psychological well-being.
        </p>

    `;


    // --------------------------------
    // ALL OTHER AREAS
    // --------------------------------

    areas.forEach(function(area) {

        let percentage =
            (area.score / area.max) * 100;


        let level;


        if (percentage <= 35) {

            level = "🌿 Looks relatively positive";

        } else if (percentage <= 65) {

            level = "🌱 Some attention may help";

        } else {

            level = "💡 Worth focusing on";
        }


        // Create suggestion list
        let suggestionList = "";

        area.suggestions.forEach(function(item) {

            suggestionList += `
                <li>${item}</li>
            `;

        });


        resultHTML += `

            <div class="result-section">

                <h3>${area.name}</h3>

                <p>
                    <strong>${level}</strong>
                </p>

                <p>
                    ${area.explanation}
                </p>

                <h4>💡 Suggestions for improvement</h4>

                <ul class="suggestion-list">

                    ${suggestionList}

                </ul>

            </div>

        `;

    });


    // --------------------------------
    // FINAL MESSAGE
    // --------------------------------

    resultHTML += `

        <hr>

        <div class="general-advice">

            <h2>🌼 Remember</h2>

            <p>
                Psychological well-being is not about being happy
                all the time. Everyone experiences stress, tiredness,
                worry, low motivation, and difficult emotions at
                different points in life.
            </p>

            <p>
                The purpose of MindGuide is to help you pause,
                reflect, and identify areas that you may want to
                improve.
            </p>

        </div>


        <div class="disclaimer">

            <h3>⚠️ Important</h3>

            <p>
                MindGuide is an educational self-reflection tool.
                It is not a psychological diagnosis, clinical
                assessment, or substitute for professional care.
            </p>

            <p>
                If difficulties are persistent, become difficult
                to manage, or significantly interfere with everyday
                life, consider talking with a qualified mental-health
                professional or another trusted adult.
            </p>

        </div>


        <button onclick="restartAssessment()">
            🔄 Take Assessment Again
        </button>

    `;


    // Show result
    document.getElementById("result").innerHTML = resultHTML;


    // Scroll to result
    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });

}



// --------------------------------
// TAKE ASSESSMENT AGAIN
// --------------------------------

function restartAssessment() {

    document
        .querySelectorAll('input[type="radio"]')
        .forEach(function(input) {

            input.checked = false;

        });


    document.getElementById("result").innerHTML = "";


    document.getElementById("assessment").style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

