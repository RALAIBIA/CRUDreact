import { useState } from "react";
import { IEmployee } from "./Employee.type";
import "./EmployeeForm.style.css";

type Props = {
    data: IEmployee;
    onBackBtnClickHnd: () => void;
    onUpdateClickHnd: (data: IEmployee) => void;
};

const EditEmployee = (props: Props) => {
    const { data,onBackBtnClickHnd, onUpdateClickHnd } = props;

    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [email, setEmail] = useState(data.email);

    const onFirstNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const onLastNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const onEmailNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onSubmitBtnClickHnd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateeData: IEmployee = {
            id: data.id,
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        onUpdateClickHnd(updateeData);
        onBackBtnClickHnd();
    };

    return (
        <div className="form-container">
            <div>
                <h3>Edit Employee Form</h3>
            </div>

            <form onSubmit={onSubmitBtnClickHnd}>
                <div>
                    <label>First Name: </label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={onFirstNameChangeHnd}
                    />
                </div>

                <div>
                    <label>Last Name: </label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={onLastNameChangeHnd}
                    />
                </div>

                <div>
                    <label>Email add: </label>
                    <input 
                        required
                        type="email"
                        value={email}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|org|net)$"
                        placeholder="exemple@gmail.com" 
                        onChange={onEmailNameChangeHnd} 
                    />
                </div>

                <div>
                    <input 
                        type="button" 
                        value="Back" 
                        onClick={onBackBtnClickHnd}
                    />
                    <input type="submit" value="Update Employee" />
                </div>
            </form>
        </div>
    );

};
export default EditEmployee;