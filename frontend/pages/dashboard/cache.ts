interface Cache {
    schedule: Schedule,
    assignments: UpcomingAssignment[],
    grades: ClassGrades[]
}

export interface Schedule {
    monday: Event[],
    tuesday: Event[],
    wednesday: Event[],
    thursday: Event[],
    friday: Event[],
}

interface Event {
    className: string, //'BAEP-470',
    startTime: string, //'8:00',
    endTime: string, //'8:50',
    classType: string, //'Lecture'
}

export interface UpcomingAssignment {
    assignmentTitle: string,
    className: string,
    dueDate: number
}

export interface ClassGrades {
    className: string,
    assignments: SubmittedAssignment[]
}

interface SubmittedAssignment {
    assignmentTitle: string,
    status: "Needs Grading" | "Graded" | "Not Submitted",
    grade: string
}

export default Cache;