interface Cache {
    schedule: Schedule,
    assignments: CompiledAssignments,
    grades: CompiledGrades,
    announcements: any
}

// Keys are sources
// i.e. Blackboard, Canvas, USCDen
export interface CompiledAnnouncements {
    [key : string]: Announcement[]
}

export interface Announcement {
    announcementTitle: string,
    postedBy: string,
    postedOn: string,
    postedTo: string,
    details: string
}

export interface Schedule {
    monday: Event[],
    tuesday: Event[],
    wednesday: Event[],
    thursday: Event[],
    friday: Event[],
}

export interface Event {
    className: string, //'BAEP-470',
    startTime: string, //'8:00',
    endTime: string, //'8:50',
    classType: "Lecture" | "Discussion" | "Quiz", //'Lecture',
    classLocation: string
}

export interface UpcomingAssignment {
    assignmentTitle: string,
    className: string,
    dueDate: number
}

export interface CompiledAssignments {
    // Key is Blackboard, Gradescope, etc (source)
    [s : string]: UpcomingAssignment[], 
}


export interface CompiledGrades {
    // Key is Blackboard, Gradescope, etc (source)
    [s : string]: ClassGrades, 
}

interface ClassGrades {
    // Key is class (i.e. Math225, CSCI270, etc)
    [s : string]: IndividualGrade[]
}

export interface IndividualGrade {
    assignmentTitle: string,
    status: "Needs Grading" | "Graded" | "Not Submitted",
    grade: string
}



export interface Note {
    noteTitle: string,
    noteId: string,
    noteContent: string
}


export default Cache;