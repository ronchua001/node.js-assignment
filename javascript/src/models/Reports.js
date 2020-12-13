const db = require("../util/database");

const getWorkloadReport = async () => {
    try {
        let teachers = await db.query('SELECT * FROM Teachers');
        let obj = teachers[0];
        for (let i of obj) {
            // get subjects tied to the teacher
            let subjects = await db.query(`SELECT DISTINCT subjectCode,name FROM Subjects INNER JOIN Teachers_Subjects ON Teachers_Subjects.subjectCode_FK = Subjects.subjectCode WHERE email_FK = '${i.email}';`);
            i['subject'] = subjects[0];
        }

        //adding the number of classes taught for the subject for the teacher
        for (let i of obj) {
            for (let j of i.subject) {
                let classCount = await db.query(`SELECT DISTINCT count(DISTINCT classCode) FROM Classes INNER JOIN Classes_Teachers ON Classes_Teachers.classCode_FK = Classes.classCode INNER JOIN Teachers_Subjects ON Classes_Teachers.email_FK = Teachers_Subjects.email_FK WHERE Classes_Teachers.email_FK = '${i.email}' and Teachers_Subjects.subjectCode_FK = '${j.subjectCode}';`);
                j[`numberOfClasses`] = classCount[0];
            }
            let subjects = await db.query(`SELECT DISTINCT count(DISTINCT classCode) FROM Classes INNER JOIN Classes_Teachers ON Classes_Teachers.classCode_FK = Classes.classCode INNER JOIN Teachers_Subjects ON Classes_Teachers.email_FK = Teachers_Subjects.email_FK WHERE Classes_Teachers.email_FK = 'dummy1@gmail.com' and Teachers_Subjects.subjectCode_FK = 'ENG';`)
        }

        //format the object
        let robj = {};
        for (let i of obj) {
            let array = [];
            for (let j of i.subject) {
                let innerobj = {};
                innerobj['subjectCode'] = j.subjectCode;
                innerobj['subjectName'] = j.name;
                innerobj['numberOfClasses'] = Object.values(j.numberOfClasses[0])[0]; // extract count from sql return
                array.push(innerobj);
            }
            robj[i.name] = array;
        }

        return robj;

    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = getWorkloadReport;