INSERT INTO department (name)
VALUES ("Information Technology"),
       ("Engineering"),
       ("HR"),
       ("Finance"),
       ("Marketing");

INSERT INTO roles (title,salary,department_id)
VALUES ("Business Analyst",95000,4),
       ("Software Engineer",120000,2),
       ("Recruiter",70000,3),
       ("Accountant",99000,4),
       ("Marketing Manager",89000,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mark","Newman",1,null),
        ("Jane","Schilaro",4,1),
        ("Trey","Cubane",3,1),
        ("Justin","Smith",2,null),
        ("Erin","Faine",5,4);