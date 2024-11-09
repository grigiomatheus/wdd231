document.getElementById("currentYear").textContent = `${new Date().getFullYear()}`;
document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;

const courseCatalog = [
    { name: "CSE 110", type: "CSE", completed: true },
    { name: "WDD 130", type: "WDD", completed: true },
    { name: "CSE 111", type: "CSE", completed: true },
    { name: "CSE 210", type: "CSE", completed: false },
    { name: "WDD 131", type: "WDD", completed: true },
    { name: "WDD 231", type: "WDD", completed: false },
];

function renderCourses(courseList) {
    const container = document.getElementById("courses-container");
    container.innerHTML = "";

    courseList.forEach((course) => {
        const courseDiv = document.createElement("div");
        const courseName = document.createElement("p")

        courseName.textContent = course.name;

        courseDiv.appendChild(courseName);
        courseDiv.classList.add("course-item");
        courseDiv.classList.add(course.completed ? "course-completed" : "course-incompleted");

        container.appendChild(courseDiv);
    });
}

function filterCourses(courseList, type) {
    var filteredCourses = courseList.filter((course) => course.type === type);
    renderCourses(filteredCourses);
}

document.getElementById("show-all").addEventListener("click", () => renderCourses(courseCatalog));
document.getElementById("show-cse").addEventListener("click", () => filterCourses(courseCatalog, "CSE"));
document.getElementById("show-wdd").addEventListener("click", () => filterCourses(courseCatalog, "WDD"));

document.getElementById("show-all").click();

const hamburgerMenu = document.getElementById("hamburger-menu");
const navMenu = document.querySelector("nav.menu");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
});
