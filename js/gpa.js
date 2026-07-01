// =====================================
// Spanish GPA Pro V2 - FULL ENGINE
// (DETAILED PDF VERSION)
// =====================================


// ===== ELEMENTS =====

const inputs = document.querySelectorAll(".grade");

const calcBtn = document.getElementById("calcBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const pdfBtn = document.getElementById("pdfBtn");


// ===== TERM DETECTION =====

const isTerm1 = window.location.pathname.includes("term1");

const DATA_KEY = isTerm1 ? "term1_data" : "term2_data";
const GPA_KEY = isTerm1 ? "term1_gpa" : "term2_gpa";


// ===== GPA SYSTEM =====

function getGPA(mark){

    if(mark >= 97) return 4.0;
    if(mark >= 93) return 3.9;
    if(mark >= 90) return 3.7;
    if(mark >= 85) return 3.3;
    if(mark >= 80) return 3.0;
    if(mark >= 75) return 2.7;
    if(mark >= 70) return 2.3;
    if(mark >= 65) return 2.0;
    if(mark >= 60) return 1.7;
    if(mark >= 55) return 1.3;
    if(mark >= 50) return 1.0;
    return 0;
}


// ===== LETTER SYSTEM =====

function getLetter(mark){

    if(mark >= 97) return "A+";
    if(mark >= 93) return "A";
    if(mark >= 90) return "A-";
    if(mark >= 85) return "B+";
    if(mark >= 80) return "B";
    if(mark >= 75) return "B-";
    if(mark >= 70) return "C+";
    if(mark >= 65) return "C";
    if(mark >= 60) return "C-";
    if(mark >= 55) return "D+";
    if(mark >= 50) return "D";
    return "F";
}


// ===== LIVE UPDATE =====

inputs.forEach(input=>{

    input.addEventListener("input",()=>{

        let mark = parseFloat(input.value);

        let card = input.parentElement;
        let letter = card.querySelector(".letter");

        if(isNaN(mark)){
            letter.textContent = "-";
            card.classList.remove("good","bad");
            return;
        }

        letter.textContent = getLetter(mark);

        if(mark >= 60){
            card.classList.add("good");
            card.classList.remove("bad");
        }else{
            card.classList.add("bad");
            card.classList.remove("good");
        }

    });

});


// ===== CALCULATE =====

calcBtn.addEventListener("click",()=>{

    let totalPoints = 0;
    let totalCredits = 0;
    let totalMarks = 0;
    let subjects = [];

    inputs.forEach(input=>{

        let mark = parseFloat(input.value);
        let credit = parseFloat(input.dataset.credit);
        let name = input.parentElement.querySelector("h3").innerText;

        if(!isNaN(mark)){

            totalPoints += getGPA(mark) * credit;
            totalCredits += credit;
            totalMarks += mark;

            subjects.push({
                name,
                mark,
                credit,
                letter: getLetter(mark)
            });

        }

    });

    if(totalCredits === 0){
        alert("ادخل الدرجات أولاً");
        return;
    }

    let gpa = (totalPoints / totalCredits).toFixed(3);
    let avg = (totalMarks / subjects.length).toFixed(1);

    document.getElementById("gpa").textContent = gpa;
    document.getElementById("avg").textContent = avg + "%";
    document.getElementById("grade").textContent = getLetter(avg);

    localStorage.setItem(GPA_KEY, gpa);
    localStorage.setItem(DATA_KEY, JSON.stringify(subjects));

});


// ===== LOAD =====

window.addEventListener("load",()=>{

    let saved = JSON.parse(localStorage.getItem(DATA_KEY));

    if(saved && Array.isArray(saved)){

        inputs.forEach(input=>{

            let card = input.parentElement;
            let name = card.querySelector("h3").innerText;

            let found = saved.find(s => s.name === name);

            if(found){

                input.value = found.mark;

                let letter = card.querySelector(".letter");
                letter.textContent = found.letter;

                if(found.mark >= 60){
                    card.classList.add("good");
                }else{
                    card.classList.add("bad");
                }

            }

        });

    }

});


// ===== RESET =====

resetBtn.addEventListener("click",()=>{

    if(confirm("هل تريد مسح كل البيانات؟")){

        localStorage.removeItem(DATA_KEY);
        localStorage.removeItem(GPA_KEY);

        location.reload();

    }

});


// ===== PDF EXPORT (DETAILED REPORT) =====

pdfBtn.addEventListener("click",()=>{

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let gpa = document.getElementById("gpa").textContent;
    let avg = document.getElementById("avg").textContent;
    let grade = document.getElementById("grade").textContent;

    let title = isTerm1 ? "Term 1 Detailed Report" : "Term 2 Detailed Report";

    let y = 20;

    doc.setFontSize(18);
    doc.text("Spanish GPA Pro 🇪🇸", 20, y);
    y += 15;

    doc.setFontSize(14);
    doc.text(title, 20, y);
    y += 15;

    doc.text("================================", 20, y);
    y += 10;

    // SUBJECTS TABLE
    inputs.forEach(input=>{

        let card = input.parentElement;
        let name = card.querySelector("h3").innerText;
        let mark = input.value || 0;
        let credit = input.dataset.credit;
        let letter = card.querySelector(".letter").textContent;

        doc.text(
            `${name} | Mark: ${mark} | Credit: ${credit} | Grade: ${letter}`,
            20,
            y
        );

        y += 10;

    });

    y += 10;

    doc.text("================================", 20, y);
    y += 10;

    doc.text("GPA: " + gpa, 20, y);
    y += 10;

    doc.text("Average: " + avg, 20, y);
    y += 10;

    doc.text("Final Grade: " + grade, 20, y);
    y += 10;

    doc.text("Faculty of Al Alsun - KFS University", 20, y);

    doc.save(isTerm1 ? "Term1_Detailed_Report.pdf" : "Term2_Detailed_Report.pdf");

});
