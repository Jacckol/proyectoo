"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let gradesBookSetup = [];
let activity = [];
let Summary = [];
var Area;
(function (Area) {
    Area["Desarrollo"] = "Desarrollo de Software";
    Area["Marketing"] = "Marketing";
    Area["Turismo"] = "Turismo";
})(Area || (Area = {}));
function addStudent() {
    let currentStudent = {
        fullName: readFormHtml("fullName"),
        identification: readFormHtml("identification"),
        mail: readFormHtml("mail"),
        direction: readFormHtml("direction"),
        enrollment: parseInt(readFormHtml("enrollment")),
        level: readFormHtml("level"),
    };
    students.push(currentStudent);
    console.table(students);
    initSelect();
}
function addTeacher() {
    let currentTeacher = {
        fullName: readFormHtml("fullName-teacher"),
        identification: readFormHtml("identification-teacher"),
        mail: readFormHtml("mail-teacher"),
        direction: readFormHtml("direction-teacher"),
        title: readFormHtml("title-teacher"),
        area: readFormHtml("area-teacher")
    };
    teachers.push(currentTeacher);
    //console.log(teachers);
    console.table(teachers);
    initSelect();
}
function addActivity() {
    let currentActivity = {
        name: readFormHtml("name-activity")
    };
    activity.push(currentActivity);
    console.table(activity);
    initSelect();
}
function addGradeBookSetup() {
    let currentGradeBookSetup = {
        value: readFormHtml("value-gradebook"),
        course: readFormHtml("course-gradebook"),
        activity: readFormHtml("activity"),
        maximunGrade: parseInt(readFormHtml("maximungrade-gradebook")),
    };
    gradesBookSetup.push(currentGradeBookSetup);
    console.table(gradesBookSetup);
    initSelect();
}
function addSummary() {
    let currentSummary = {
        namestudent: readFormHtml("detail-student"),
        namecourse: readFormHtml("detail-course"),
        note: readFormHtml("detail-note"),
        nameteacher: readFormHtml("detail-teacher"),
    };
    Summary.push(currentSummary);
    console.table(Summary);
    let promedy1 = document.querySelector("#detail-note");
    let statusSpan = document.querySelector("#status");
    if (Number(promedy1.value) >= 70) {
        console.log("Aprobado");
        statusSpan.textContent = "Aprobado";
    }
    else {
        console.log("Reprobado");
        statusSpan.textContent = "Reprobado";
    }
}
function initSelect() {
    let area = document.getElementById("area-teacher");
    let areas = Object.values(Area);
    area.innerHTML = "";
    areas.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value,
            area.add(option);
    });
    let activities = document.getElementById("activity");
    document.querySelectorAll("#activity option").forEach(option => option.remove());
    activity.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.name;
        option.text = value.name;
        activities.add(option);
    });
    let name_Student = document.getElementById("detail-student");
    document.querySelectorAll("#detail-student option").forEach(option => option.remove());
    students.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.fullName;
        option.text = value.fullName,
            name_Student.add(option);
    });
    let detail_Course = document.getElementById("detail-course");
    document.querySelectorAll("#detail-course option").forEach(option => option.remove());
    gradesBookSetup.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.course;
        option.text = value.course,
            detail_Course.add(option);
    });
    let name_Teacher = document.getElementById("detail-teacher");
    document.querySelectorAll("#detail-teacher option").forEach(option => option.remove());
    teachers.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.fullName;
        option.text = value.fullName,
            name_Teacher.add(option);
    });
    class ReporteCalificaciones {
        constructor(students, summary, gradesBookSetup, activity, teachers) {
            this.students = students;
            this.summary = summary;
            this.gradesBookSetup = gradesBookSetup;
            this.activity = activity;
            this.teachers = teachers;
        }
        crearLibroCalificaciones() {
            let reporteLibroCalificaciones = [];
            this.summary.forEach((calificacion) => {
                let notaLibroCalificaciones = gradesBookSetup.filter((iten) => iten.value === calificacion.note)[0];
                let estudianteActual = students.filter((student) => student.identification === calificacion.namestudent)[0];
                let librocalificacionesactual = gradesBookSetup.filter((item) => item.value === notaLibroCalificaciones.activity);
                let filaCalificaciones = {
                    curso: notaLibroCalificaciones.course,
                    student: estudianteActual.fullName,
                    enrollment: estudianteActual.enrollment,
                    level: estudianteActual.level,
                    fullName: estudianteActual.fullName,
                    identification: estudianteActual.identification,
                    mail: estudianteActual.mail,
                    direction: estudianteActual.direction,
                    value: notaLibroCalificaciones.value,
                    course: notaLibroCalificaciones.course,
                    activity: notaLibroCalificaciones.activity,
                    maximunGrade: notaLibroCalificaciones.maximunGrade,
                    namestudent: calificacion.namestudent,
                    namecourse: calificacion.namecourse,
                    note: calificacion.note,
                    nameteacher: calificacion.nameteacher,
                };
                reporteLibroCalificaciones.push(filaCalificaciones);
            });
            return reporteLibroCalificaciones;
        }
    }
    function generarReporte() {
        let reporteCalf = new ReporteCalificaciones(students, Summary, gradesBookSetup, activity);
        let filaCalificaciones = ReporteCalificaciones.crearLibroCalificaciones();
        let reporteTabla = document.getElementById("reporte");
        filaCalificaciones.forEach((fila) => {
            let tr;
            let td;
            tr = reporteTabla.insertRow(0);
            td = tr.insertCell(0);
            td.innerHTML = fila.curso;
            td = tr.insertCell(1);
            td.innerHTML = fila.fullName;
            reporteTabla.appendChild(tr);
        });
    }
}
initSelect();
function readFormHtml(id) {
    return document.getElementById(id).value;
}
