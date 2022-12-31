import { GradeBookSetup } from "./entities/gradeBookSeutp";
import { Activity } from "./entities/activity";
import { Student } from "./entities/student";
import { Teacher } from "./entities/teacher";
import { Summary } from "./entities/summary";
import { reporteCalificaciones } from "./entities/reportecalificaciones";

let students: Student[] = [];
let teachers: Teacher[] = [];
let gradesBookSetup: GradeBookSetup[] = [];
let activity: Activity[] = [];
let Summary: Summary[] = [];

enum Area {
    Desarrollo = "Desarrollo de Software",
    Marketing = "Marketing",
    Turismo = "Turismo",
}

function addStudent(): void {
    let currentStudent: Student = {
        fullName: readFormHtml("fullName"),
        identification:readFormHtml("identification"),
        mail: readFormHtml("mail"),
        direction: readFormHtml("direction"),
        enrollment: parseInt(readFormHtml("enrollment")),
        level: readFormHtml("level"),
    }
    students.push(currentStudent);
    console.table(students);
    initSelect();
}

function addTeacher(): void {
    let currentTeacher: Teacher = {
        fullName: readFormHtml("fullName-teacher"),
        identification:readFormHtml("identification-teacher"),
        mail: readFormHtml("mail-teacher"),
        direction: readFormHtml("direction-teacher"),
        title: readFormHtml("title-teacher"),
        area: readFormHtml("area-teacher")
    }
    teachers.push(currentTeacher);
    //console.log(teachers);
    console.table(teachers);
    initSelect();
}

function addActivity(): void {
    let currentActivity: Activity = {
        name: readFormHtml("name-activity")
    }
    activity.push(currentActivity);
    console.table(activity);
    initSelect();
}

function addGradeBookSetup(): void {
    let currentGradeBookSetup: GradeBookSetup = {
        value: readFormHtml("value-gradebook"),
        course: readFormHtml("course-gradebook"),
        activity: readFormHtml("activity"),
        maximunGrade: parseInt(readFormHtml("maximungrade-gradebook")),
    }
    gradesBookSetup.push(currentGradeBookSetup);
    console.table(gradesBookSetup);
    initSelect();
}

function addSummary(): void {
    let currentSummary: Summary = {
        namestudent: readFormHtml("detail-student"),
        namecourse: readFormHtml("detail-course"),
        note: readFormHtml("detail-note"),
        nameteacher: readFormHtml("detail-teacher"),
      
    }
    Summary.push(currentSummary);
    console.table(Summary);
 
    let promedy1 = (document.querySelector("#detail-note")! as HTMLInputElement);
    let statusSpan = document.querySelector("#status");
    if (Number(promedy1.value) >= 70) {
        console.log("Aprobado");
        statusSpan!.textContent = "Aprobado"
    } else {
        console.log("Reprobado")
        statusSpan!.textContent = "Reprobado"
    }
    }


function initSelect(): void {
    let area = document.getElementById("area-teacher") as HTMLSelectElement;
    let areas = Object.values(Area);
    area.innerHTML =""
    areas.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value;
            option.text = value,
            area.add(option);
        }
    );

    let activities = document.getElementById("activity") as HTMLSelectElement;
    document.querySelectorAll("#activity option").forEach(option => option.remove());
    activity.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value.name;
            option.text = value.name;
            activities.add(option)
        }
    );

    let name_Student = document.getElementById("detail-student") as HTMLSelectElement;
    document.querySelectorAll("#detail-student option").forEach(option => option.remove());
    students.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value.fullName;
            option.text = value.fullName,
            name_Student.add(option);
        }
    );

    let detail_Course = document.getElementById("detail-course") as HTMLSelectElement;
    document.querySelectorAll("#detail-course option").forEach(option => option.remove());
    gradesBookSetup.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value.course;
            option.text = value.course,
            detail_Course.add(option);
        }
    );

    let name_Teacher = document.getElementById("detail-teacher") as HTMLSelectElement;
    document.querySelectorAll("#detail-teacher option").forEach(option => option.remove());
    teachers.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value.fullName;
            option.text = value.fullName,
            name_Teacher.add(option);
        }
    );

    class ReporteCalificaciones{
        static crearLibroCalificaciones(): reporteCalificaciones[] {
            throw new Error("Method not implemented.");
        }
        constructor(public students:Student[], 
                    public summary: Summary[],
                    public gradesBookSetup: GradeBookSetup[],
                    public activity: Activity[],
                    public teachers?: Teacher[]){
      
                      
        }
        public crearLibroCalificaciones(): reporteCalificaciones[]{
            let reporteLibroCalificaciones:reporteCalificaciones[]=[];

            this.summary.forEach(
                (calificacion) => {
                let notaLibroCalificaciones=gradesBookSetup.filter((iten)=> iten.value === calificacion.note) [0]
                let estudianteActual = students.filter((student) => student.identification === calificacion.namestudent)[0];
                 
                let librocalificacionesactual=gradesBookSetup.filter((item)=>item.value === notaLibroCalificaciones.activity )
                let filaCalificaciones:reporteCalificaciones =
                {
                     curso:notaLibroCalificaciones.course,
                    student:estudianteActual.fullName,
                    enrollment:estudianteActual.enrollment,
                    level: estudianteActual.level,
                    fullName: estudianteActual.fullName,
                    identification:estudianteActual.identification,
                    mail: estudianteActual.mail,
                    direction: estudianteActual.direction,
                    value: notaLibroCalificaciones.value,
                    course: notaLibroCalificaciones.course,
                    activity: notaLibroCalificaciones.activity,
                    maximunGrade: notaLibroCalificaciones.maximunGrade,
                    namestudent: calificacion.namestudent,
                    namecourse: calificacion.namecourse,
                    note:calificacion.note ,
                    nameteacher: calificacion.nameteacher,
                }
                reporteLibroCalificaciones.push(filaCalificaciones);
            })

            return reporteLibroCalificaciones;
        }
                  
 }    
    
    function reporteCalificaciones(): void{
       let reporteCalf:ReporteCalificaciones = new  ReporteCalificaciones(
        students,Summary,gradesBookSetup,activity);
        let filaCalificaciones:reporteCalificaciones[]= ReporteCalificaciones.crearLibroCalificaciones();
        let reporteTabla:HTMLTableElement = document.getElementById("reporte") as HTMLTableElement;
    
        filaCalificaciones.forEach((fila) =>{
             let tr:HTMLTableRowElement;
             let td:HTMLTableCellElement;
             tr = reporteTabla.insertRow(0);
             td = tr.insertCell(0);
             td.innerHTML = fila.curso;
             td = tr.insertCell(1);
             td.innerHTML = fila.fullName;

             reporteTabla.appendChild(tr);

        })
    }
    
}
initSelect();

function readFormHtml(id: string): string {
    return (<HTMLInputElement>document.getElementById(id))!.value;
}