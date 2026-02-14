import { useEffect, useState } from "react";
import "./Home.style.css";
import { IEmployee, PageEnum } from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const Home = () => {
    const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

    useEffect(() => {
        const listInString = window.localStorage.getItem("EmployeeList")
        if(listInString){
            updateEmployeeList(JSON.parse(listInString));
        }
    }, []);

    // Fonction centralisée pour mettre à jour la liste + localStorage
    const updateEmployeeList = (list: IEmployee[]) => {
        setEmployeeList(list);
        window.localStorage.setItem("EmployeeList", JSON.stringify(list));
    };

    const onAddEmployeeClickHnd = () => {
        setShownPage(PageEnum.add);
    };

    const showListPage = () => {
        setShownPage(PageEnum.list);
    };

    const addEmployee = (data: IEmployee) => {
        updateEmployeeList([...employeeList, data]);
    };

    const deleteEmployee = (data: IEmployee) => {
        const filteredData = employeeList.filter(emp => emp.id !== data.id);
        updateEmployeeList(filteredData);
    };

    const editEmployeeData = (data: IEmployee) => {
        setShownPage(PageEnum.edit);
        setDataToEdit(data);
    };

    const updateData = (data: IEmployee) => {
        const updatedList = employeeList.map(emp =>
            emp.id === data.id ? data : emp
        );
        updateEmployeeList(updatedList);
        setShownPage(PageEnum.list);
    };

    return (
        <>
            <article className="article-header">
                <header>
                    <h1>React: Simple CRUD Application</h1>
                </header>
            </article>

            <section className="section-content">
                {shownPage === PageEnum.list && (
                    <>
                        <input
                            type="button"
                            value="Add Employee"
                            onClick={onAddEmployeeClickHnd}
                            className="add-employee-btn"
                        />
                        <EmployeeList
                            list={employeeList}
                            onDeleteClickHnd={deleteEmployee}
                            onEdit={editEmployeeData}
                        />
                    </>
                )}

                {shownPage === PageEnum.add && (
                    <AddEmployee
                        onBackBtnClickHnd={showListPage}
                        onSubmitClickHnd={addEmployee}
                    />
                )}

                {shownPage === PageEnum.edit && (
                    <EditEmployee
                        data={dataToEdit}
                        onBackBtnClickHnd={showListPage}
                        onUpdateClickHnd={updateData}
                    />
                )}
            </section>
        </>
    );
};

export default Home;