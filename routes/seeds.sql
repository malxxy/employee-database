INSERT INTO department (id,name)
VALUES (1,"Information Technology"),
       (2,"Engineering"),
       (3,"HR"),
       (4,"Finance"),
       (5,"Marketing");

INSERT INTO role (id,title,salary,department_id)
VALUES (1,"Business Analyst","$95,000"),
       (2,"Software Engineer","$120,000"),
       (3,"Recruiter","$60,000"),
       (4,"Accountant","$99,000"),
       (5,"Marketing Manager","$63,000");

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES (1,"Mark","Newman","0903","55"),
        (2,"Jane","Schilaro","0932","55"),
        (3,"Trey","Cubane","0981","43"),
        (4,"Justin","Smith","7803","39"),
        (5,"Erin","Faine","0836","50");