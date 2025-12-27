function date() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentDay = now.getDate();

    // month labels
    const jan = 1, feb = 2, mar = 3, april = 4, may = 5, june = 6;
    const july = 7, aug = 8, sept = 9, oct = 10, nov = 11, dec = 12;

    // 1. Get the values FIRST
    const inputDay = document.getElementById("day").value;
    const inputMonth = document.getElementById("month").value;
    const inputYear = document.getElementById("year").value;

    // 2. define m, d, and y
    const d = Number(inputDay);
    const m = Number(inputMonth);
    const y = Number(inputYear);

    const Error1 = document.getElementById("error1");
    const Error2 = document.getElementById("error2");
    const Error3 = document.getElementById("error3");

    const resultY = document.getElementById("resulty");
    const resultM = document.getElementById("resultm");
    const resultD = document.getElementById("resultd");

    const Label1 = document.getElementById("label1");
    const Label2 = document.getElementById("label2");
    const Label3 = document.getElementById("label3");



    // CLEAN UP
    Error1.textContent = ""; Error2.textContent = ""; Error3.textContent = "";
    Label1.style.color = " hsl(0, 0%, 43%)"; Label2.style.color = " hsl(0, 0%, 43%)"; Label3.style.color = " hsl(0, 0%, 43%)";
    resultY.innerHTML = `<em style="color: blue;">- -</em> years`;
    resultM.innerHTML = `<em style="color: blue;">- -</em> months`;
    resultD.innerHTML = `<em style="color: blue;">- -</em> days`;


    // 3. EMPTY CHECK
    if (inputYear === "" || inputMonth === "" || inputDay === "") {
        if (inputDay === "") { Error1.textContent = "This field is required"; Label1.style.color = "red"; }
        if (inputMonth === "") { Error2.textContent = "This field is required"; Label2.style.color = "red"; }
        if (inputYear === "") { Error3.textContent = "This field is required"; Label3.style.color = "red"; }
        return;
    }

    // 4. REGEX CHECK
    if (!/^\d+$/.test(inputDay) || !/^\d+$/.test(inputMonth) || !/^\d+$/.test(inputYear)) {
        Error1.textContent = "Must be a valid whole number";
        Label1.style.color = "red";
        return;
    }

    // 5. RANGE CHECKS
    if ((m === sept || m === april || m === june || m === nov) && (d > 30)) {
        Error1.textContent = "Must be a valid day";
        Label1.style.color = "red";
        return;
    }
    if ((m === jan || m === mar || m === july || m === aug || m === oct || m === dec || m === may) && (d > 31)) {
        Error1.textContent = "Must be a valid day";
        Label1.style.color = "red";
        return;
    }



    // Leap Year logic for the input date
    let isLeapInPast = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    if (m === feb) {
        if (isLeapInPast && d > 29) {
            Error1.textContent = "Must be a valid day";
            Label1.style.color = "red";
            return;
        } else if (!isLeapInPast && d > 28) {
            Error1.textContent = "Must be a valid day";
            Label1.style.color = "red";
            return;
        }
    }

    if (m > 12) {
        Error2.textContent = "Must be a valid month";
        Label2.style.color = "red";
        return;
    }

    if (d > 31 || d < 1) {
        Error1.textContent = "Must be a valid day";
        Label1.style.color = "red";
        return;
    }

  if (y > currentYear || (y === currentYear && m > currentMonth) || (y === currentYear && m === currentMonth && d > currentDay)) {
    Error3.textContent = "Must be in the past";
    Label3.style.color = "red";
    return;
}

    // 6. ARITHMETIC WITH BORROWING LOGIC
    let calcY = currentYear - y;
    let calcM = currentMonth - m;
    let calcD = currentDay - d;

    // STEP A: If days are negative, borrow from months
    if (calcD < 0) {
        calcM = calcM - 1;
        let prevM = currentMonth - 1;
        if (prevM === 0) prevM = 12;

        let daysInPrevMonth;
        if (prevM === feb) {
            let isLeapNow = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
            daysInPrevMonth = isLeapNow ? 29 : 28;
        } else if (prevM === april || prevM === june || prevM === sept || prevM === nov) {
            daysInPrevMonth = 30;
        } else {
            daysInPrevMonth = 31;
        }
        calcD = calcD + daysInPrevMonth;
    }
 

    // STEP B: If months are negative, borrow from years
    if (calcM < 0) {
        calcY = calcY - 1;
        calcM = calcM + 12;
    }

    // 7. DISPLAY RESULTS
    resultY.innerHTML = `<em style="color: blue;">${calcY}</em> years`;
    resultM.innerHTML = `<em style="color: blue;">${calcM}</em> months`;
    resultD.innerHTML = `<em style="color: blue;">${calcD}</em> days`;

}

const btn = document.getElementById("btn");
btn.addEventListener("click", date);

i9

