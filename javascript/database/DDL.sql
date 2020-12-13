
CREATE TABLE IF NOT EXISTS Teachers
(
  email VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS Students
(
  email VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS Classes
(
  classCode CHAR(5) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (classCode)
);

CREATE TABLE IF NOT EXISTS Subjects
(
  subjectCode CHAR(3) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (subjectCode)
);

-- Create a association table for many-many relationship for class and students
CREATE TABLE IF NOT EXISTS Classes_Students 
(
  classCode_FK CHAR(5) NOT NULL,
  email_FK VARCHAR(45) NOT NULL,
  CONSTRAINT FOREIGN KEY (classCode_FK) REFERENCES Classes(classCode) ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (email_FK) REFERENCES Students(email) ON UPDATE CASCADE
);

-- Create a association table for many-many relationship for class and teacher
CREATE TABLE IF NOT EXISTS Classes_Teachers 
(
  classCode_FK CHAR(5) NOT NULL,
  email_FK VARCHAR(45) NOT NULL,
  CONSTRAINT FOREIGN KEY (classCode_FK) REFERENCES Classes(classCode) ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (email_FK) REFERENCES Teachers(email) ON UPDATE CASCADE
);

-- Create a association table for many-many relationship for teacher and subject
CREATE TABLE IF NOT EXISTS Teachers_Subjects 
(
  email_FK VARCHAR(45) NOT NULL,
  subjectCode_FK CHAR(3) NOT NULL,
  CONSTRAINT FOREIGN KEY (email_FK) REFERENCES Teachers(email) ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (subjectCode_FK) REFERENCES Subjects(subjectCode) ON UPDATE CASCADE
);

INSERT INTO Teachers(`email`, `name`) VALUES
(
  'dummy1@gmail.com', 'dummy teacher name 1'
),
( 
  'dummy2@gmail.com', 'dummy teacher name 2'
),
( 
  'dummy2@gmail.com', 'dummy teacher name 2-edited'
)ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO Classes VALUES
(
  'P1-1', 'P1 Integrity'
),
( 
  'P1-2', 'P2 Honesty'
),
( 
  'P1-2', 'P2 Honesty-edited'
)ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO Subjects VALUES
(
  'ENG', 'English'
),
( 
  'MAT', 'Maths'
)ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);


INSERT INTO Teachers_Subjects VALUES 
(
  'dummy1@gmail.com', 'ENG'
),
(
  'dummy1@gmail.com', 'MAT'
),
(
  'dummy2@gmail.com', 'MAT'
);

INSERT INTO Classes_Teachers VALUES 
(
  'P1-1', 'dummy1@gmail.com'
),
(
  'P1-2', 'dummy2@gmail.com'
),
(
  'P1-1', 'dummy1@gmail.com'
);