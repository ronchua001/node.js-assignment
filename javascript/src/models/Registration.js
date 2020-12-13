const db = require("../util/database");

module.exports = class Registration {
    constructor(teachers, students, subjects, classes) {
        this.teachers = teachers;
        this.students = students;
        this.subjects = subjects;
        this.classes = classes;
    }

    async registerUser() {
        try {
            //Tables insertion
            await db.query('INSERT INTO Teachers SET ? ON DUPLICATE KEY UPDATE `name` = VALUES(`name`)', [this.teachers]);
            await db.query('INSERT INTO Students (`email`,`name`) VALUES ? ON DUPLICATE KEY UPDATE `name` = VALUES(`name`)', [this.students.map(student => [student.email, student.name])]);
            await db.query('INSERT INTO Classes  SET ? ON DUPLICATE KEY UPDATE `name` = VALUES(`name`)', [this.classes]);
            await db.query('INSERT INTO Subjects SET ? ON DUPLICATE KEY UPDATE `name` = VALUES(`name`)', [this.subjects]);
            //relationships insertion
            await db.query('INSERT INTO Classes_Students VALUES ?', [this.students.map(student => [this.classes.classCode, student.email])]);
            await db.query('INSERT INTO Classes_Teachers VALUES (?,?)', [this.classes.classCode, this.teachers.email]);
            await db.query('INSERT INTO Teachers_Subjects VALUES (?,?)', [this.teachers.email, this.subjects.subjectCode]);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }
}
