// ================================
// HOSPITAL APPOINTMENT JAVASCRIPT
// ================================


// Get elements
const appointmentForm =
    document.getElementById("appointmentForm");

const successMessage =
    document.getElementById("successMessage");

const doctorSelect =
    document.getElementById("doctor");

const doctorSearch =
    document.getElementById("doctorSearch");

const doctorCards =
    document.querySelectorAll(".doctor-card");

const selectButtons =
    document.querySelectorAll(".select-doctor");

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.querySelector(".nav");


// ================================
// SELECT DOCTOR
// ================================

selectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const doctorName =
            button.getAttribute("data-doctor");

        doctorSelect.value = doctorName;

        document
            .getElementById("appointment")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ================================
// DOCTOR SEARCH
// ================================

doctorSearch.addEventListener(
    "input",
    function() {

        const searchValue =
            doctorSearch.value
                .toLowerCase()
                .trim();


        doctorCards.forEach(function(card) {

            const doctorName =
                card
                    .getAttribute("data-name")
                    .toLowerCase();

            const department =
                card
                    .getAttribute("data-department")
                    .toLowerCase();


            if (
                doctorName.includes(searchValue) ||
                department.includes(searchValue)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }
);


// ================================
// APPOINTMENT FORM
// ================================

appointmentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const patientName =
            document
                .getElementById("patientName")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const doctor =
            document
                .getElementById("doctor")
                .value;

        const date =
            document
                .getElementById("date")
                .value;

        const time =
            document
                .getElementById("time")
                .value;


        // Validation
        if (
            patientName === "" ||
            email === "" ||
            doctor === "" ||
            date === "" ||
            time === ""
        ) {

            alert(
                "Please fill all appointment details."
            );

            return;

        }


        // Show success
        successMessage.style.display = "block";


        // Hide form
        appointmentForm.style.display = "none";


        // Update success message
        successMessage.innerHTML = `

            <div>✓</div>

            <h3>
                Appointment Booked!
            </h3>

            <p>
                Thank you, ${escapeHTML(patientName)}.
            </p>

            <p>
                Doctor:
                <strong>${escapeHTML(doctor)}</strong>
            </p>

            <p>
                Date:
                <strong>${formatDate(date)}</strong>
            </p>

            <p>
                Time:
                <strong>${escapeHTML(time)}</strong>
            </p>

            <br>

            <button
                onclick="newAppointment()"
                class="book-btn">

                Book Another Appointment

            </button>

        `;


        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


// ================================
// NEW APPOINTMENT
// ================================

function newAppointment() {

    appointmentForm.reset();

    appointmentForm.style.display = "block";

    successMessage.style.display = "none";

}


// ================================
// FORMAT DATE
// ================================

function formatDate(dateValue) {

    const date =
        new Date(dateValue + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ================================
// MOBILE MENU
// ================================

menuBtn.addEventListener(
    "click",
    function() {

        nav.classList.toggle("show");

    }
);


// ================================
// MOBILE MENU CSS SUPPORT
// ================================

const mobileStyle =
    document.createElement("style");

mobileStyle.textContent = `

    @media (max-width: 700px) {

        .nav.show {

            display: flex;

            position: absolute;

            top: 78px;
            left: 0;
            right: 0;

            padding: 20px 6%;

            background: white;

            border-bottom:
                1px solid #edf1f5;

            box-shadow:
                0 15px 30px
                rgba(0,0,0,0.08);

            flex-direction: column;

            gap: 18px;

        }

    }

`;

document.head.appendChild(mobileStyle);


// ================================
// PROTECT USER INPUT
// ================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// ================================
// SET MINIMUM DATE
// ================================

const dateInput =
    document.getElementById("date");

if (dateInput) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.min = today;

}