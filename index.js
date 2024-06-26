#!/usr/bin/env node 

import { writeJsonFile, readJsonFile, figIt } from "./src/helpers.js"
import { index, create, show, destroy, edit, save } from "./src/jobsController.js";
import inquirer from "inquirer";
const inform = console.log;

const run = () => {

    let updatedJobs = []
    let showSaved = false

    const jobs = readJsonFile("./data", "sampleJobs.json"); 
    const savedJobs = readJsonFile("./data", "sampleSavedJobs.json")
    const employeeNameArr = Object.keys(jobs) 
    const savedJobsEmployeeNameArr = Object.keys(savedJobs)

    const questionObject = {
        startQuestions: [
            {
            name: "start", 
            type: "list", 
            message: "What would you like to do?",
            choices: [
                "index all",
                "create a new job or new employee",
                "show an employees jobs",
                "destroy a job or an emplooyee",
                "update a job or employee",
                "saved jobs",
                "exit"
            ],
            }
        ],
        createQuestions: [
            {
                name: "decision",
                type: "list",
                message: "Would you like to create an employee or job for employee?",
                choices: [
                    "employee",
                    "job"
                ]
            }
        ],
        employeeCreateQuestions: [
            {
                name: "employee",
                type: "input",
                message: "What is the name of the employee you want to create?"
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company?"
            },
            {
                name: "position",
                type: "input",
                message: "What is the position within the company?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the position?",
            },
            {
                name: "interview",
                type: "input",
                message: "When is the earliest interview available?",
            }
        ], 
        jobCreateQuestions: [
            {
                name: "employee",
                type: "list",
                message: "Who is the employee you want to add a job for?",
                choices: employeeNameArr
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company?"
            },
            {
                name: "position",
                type: "input",
                message: "What is the position within the company?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the position?",
            },
            {
                name: "interview",
                type: "input",
                message: "When is the earliest interview available?",
            }
        ],
        showQuestions: [
            {
                name: "showQuestions",
                type: "list",
                message: "What employee yould you like to show?",
                choices: employeeNameArr
            }
        ],  
        destroyQuestions: [
            {
                name: "decision",
                type: "list",
                message: "Would you like to delete an employee or a job from an employee?",
                choices: [
                    "employee",
                    "job"
                ]
            }
        ],
        employeeDestroyQuestions: [
            {
                name: "employee",
                type: "list",
                message: "Who is the employee you would like to destroy?",
                choices: employeeNameArr
            }
        ],   
        jobDestroyQuestions: [
            {
                name: "employee",
                type: "list",
                message: "What employees data do you want to access?",
                choices: employeeNameArr
            },
            {
                name: "job",
                type: "input",
                message: "What is the companys name you would like to destroy?"
            }
        ],
        updateQuestions: [
            {
                name: "employee",
                type: "list",
                message: "Which employee would you like to edit?",
                choices: employeeNameArr
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company you would like to edit?"
            },
            {
                name: "section",
                type: "input",
                message: "What is the section you would like to update?"
            },
            {
                name: "value",
                type: "input",
                message: "What would you like the new value to be?"
            }
        ],
        savedUpdateQuestions: [
            {
                name: "employee",
                type: "list",
                message: "Which employee woul you like to edit?",
                choices: savedJobsEmployeeNameArr
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company you would like to edit?"
            },
            {
                name: "section",
                type: "input",
                message: "What is the section you would like to update?"
            },
            {
                name: "value",
                type: "input",
                message: "What would you like the new value to be?"
            }
        ],
        saveQuestions: [
            {
                name: "saveQuestions",
                type: "list",
                message: "What would you like to access in the save section?",
                choices: [
                    "save a job",
                    "index all saved jobs",
                    "show a saved job",
                    "destroy a saved job",
                    "update a saved job",
                    "back"
                ]
            }
        ],
        savedShowQuestions: [
            {
                name: "saveShow",
                type: "list",
                message: "What employee yould you like to show?",
                choices: savedJobsEmployeeNameArr
            }
        ],
        savedJobDestroyQuestions: [
            {
                name: "employee",
                type: "list",
                message: "What employees data do you want to access?",
                choices: savedJobsEmployeeNameArr
            },
            {
                name: "job",
                type: "input",
                message: "What is the companys name you would like to destroy?"
            }
        ],
        savedEmployeeDestroyQuestions: [
            {
                name: "employee",
                type: "list",
                message: "Who is the employee you would like to destroy?",
                choices: savedJobsEmployeeNameArr
            }
        ],
        saveAJob: [
            {
                name: "employee",
                type:  "list",
                message: "Which employee would you like to save a job for?",
                choices: employeeNameArr
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company you would like to save for that employee?"
            }
        ],
        continueQuestions: [
            {
                name: "continueQuestions",
                type: "list",
                message: "Would you like to do something else?",
                choices: [
                    "Yes",
                    "No"
                ]
            }
        ],
    }

    const { startQuestions, createQuestions, employeeCreateQuestions, jobCreateQuestions, showQuestions, savedShowQuestions,destroyQuestions, employeeDestroyQuestions, savedJobDestroyQuestions, savedEmployeeDestroyQuestions, jobDestroyQuestions, updateQuestions, savedUpdateQuestions, saveQuestions, saveAJob, continueQuestions } = questionObject

    const runAgain = () => {
        inquirer.prompt(continueQuestions).then(({continueQuestions}) => {
            if(continueQuestions === "Yes") {
                if(showSaved) {
                    runSavedDisplay()
                }else {
                    run()
                }
            }else {
                figIt("Thanks for using Jortal")
            }     
        })
    }  

    const createEmployeeOrJob = (data) => {
        if(data === "employee"){return employeeCreateQuestions}
        if(data === "job"){return jobCreateQuestions}
    }

    const deleteEmployeeOrJob = (data, save) => {
        if(data === "employee"){
            console.log("Console log is here", data)
            if (save) {return savedEmployeeDestroyQuestions}
            else { return employeeDestroyQuestions} 
        }else if(data === "job"){
            if (save) {return savedJobDestroyQuestions}
            else { return jobDestroyQuestions} 
        }
    }

    const runSavedDisplay = () => {
        inquirer.prompt(saveQuestions).then(({saveQuestions}) => {

            const savedAction = saveQuestions.split(" ")[0];
            let updatedSavedJobs = []
            showSaved = true
            
            switch (savedAction) {
                case "index":
                    const jobsView = index(savedJobs);
                    inform(jobsView);
                    runAgain()
                    break;
                case "show":
                    inquirer.prompt(savedShowQuestions).then(({saveShow}) => {
                        inform(show(savedJobs, saveShow));
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case "destroy":
                    inform(index(jobs));
                    inquirer.prompt(destroyQuestions).then(({decision}) => {
                        const data = deleteEmployeeOrJob(decision, saveQuestions)
                        inquirer.prompt(data).then(({employee, job})=> {
                            updatedSavedJobs = destroy(savedJobs, employee, job, data);
                            writeJsonFile("./data", "sampleSavedJobs.json", updatedSavedJobs)
                        }).then(() => {
                            runAgain()
                        })
                    })
                    break;
                case "update":
                    inquirer.prompt(savedUpdateQuestions).then(({employee, company, section, value}) => {
                        updatedSavedJobs = edit(savedJobs, employee, company, section, value);
                        writeJsonFile("./data", "sampleSavedjobs.json", updatedSavedJobs)
                    }).then(() => {
                        runAgain();
                    })
                    break;
                case "save": 
                    inquirer.prompt(saveAJob).then(({employee, company}) => {
                        updatedSavedJobs = save(jobs,savedJobs, employee, company);
                        writeJsonFile("./data", "sampleSavedjobs.json", updatedSavedJobs)
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case"back": 
                    run()
                    break;
            }
        })
    }
 
    figIt("Welcome To Jortal")
    inquirer.prompt(startQuestions).then(({start})=> {
        const action = start.split(" ")[0]
        switch (action) {
            case "index":
                const jobsView = index(jobs);
                inform(jobsView);
                runAgain()
                break;
            case "create":
                inquirer.prompt(createQuestions).then(({decision})=> {
                    const data = createEmployeeOrJob(decision)
                    inquirer.prompt(data).then(({employee, company, position, salary, interview}) => {
                        updatedJobs = create(jobs, employee, company, position, salary, interview)
                        writeJsonFile("./data", "sampleJobs.json", updatedJobs)
                    }).then(() => {
                    runAgain()
                })
                })
                break;
            case "show":
                inquirer.prompt(showQuestions).then(({showQuestions}) => {
                    inform(show(jobs, showQuestions));
                }).then(() => {
                    runAgain()
                })
                break;
            case "destroy":
                inform(index(jobs));
                inquirer.prompt(destroyQuestions).then(({decision}) => {
                    const data = deleteEmployeeOrJob(decision)
                    inquirer.prompt(data).then(({employee, job})=> {
                        updatedJobs = destroy(jobs, employee, job, data);
                        writeJsonFile("./data", "sampleJobs.json", updatedJobs)
                    }).then(() => {
                        runAgain()
                    })
                })
                break;
            case "update":
                inquirer.prompt(updateQuestions).then(({employee, company, section, value}) => {
                    updatedJobs = edit(jobs, employee, company, section, value);
                    writeJsonFile("./data", "sampleJobs.json", updatedJobs)
                }).then(() => {
                    runAgain()
                })
                break;
            case "saved":
                runSavedDisplay()
                break;   
            case "exit":
                figIt("Thanks for using Jortal")
                break;
        }
    }); 
}

run()