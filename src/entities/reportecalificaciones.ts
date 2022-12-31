import { Student } from "./student";
import { GradeBookSetup } from "./gradeBookSeutp";
import { Summary } from "./summary";

export interface reporteCalificaciones extends Student,GradeBookSetup,Summary{
    curso:string;
    student:string;
}