import { useState } from "react";
import "./EmployeeForm.style.css";
import { IEmployee } from "./Employee.type";

type Props = {
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: IEmployee) => void;
};

const AddEmployee = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const { onBackBtnClickHnd, onSubmitClickHnd } = props;

    /**
     * 1 Nettoyage et formatage du prénom
     * - supprime tirets et caractères spéciaux
     * - autorise un seul espace entre les mots
     * - majuscule au début de chaque mot
     */
    const formatFirstName = (value: string) => {
        return value
            .replace(/-/g, " ")                 // remplace les tirets par un espace
            .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")     // enlève chiffres & caractères spéciaux
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ")               // un seul espace entre les mots
            .split(" ")
            .map(
                word => word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
    };

    /**
     * 2 Saisie libre du prénom
     * → on ne bloque PAS l’espace pendant la frappe
     */
    const onFirstNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    /**
     * 3 Formatage du prénom quand l'utilisateur quitte le champ
     */
    const onFirstNameBlurHnd = () => {
        setFirstName(formatFirstName(firstName));
    };

    /**
     * 4 Nom toujours en majuscule
     */
    const onLastNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value.toUpperCase());
    };

    /**
     * 5 Email toujours en minuscule
     */
    const onEmailNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.toLowerCase());
    };

    /**
     * 6 Validation simple de l'email
     */
    const isValidEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    /**
     * 7 Envoi du formulaire avec données propres
     */
    const onSubmitBtnClickHnd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            alert("Veuillez entrer un email valide");
            return;
        }

        const data: IEmployee = {
            id: new Date().toISOString(),
            firstName: formatFirstName(firstName),
            lastName: lastName.trim(),
            email: email.trim()
        };

        onSubmitClickHnd(data);
        onBackBtnClickHnd();
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmitBtnClickHnd} className="employee-form">
                <div>
                    <label>Prénom :</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={onFirstNameChangeHnd}
                        onBlur={onFirstNameBlurHnd}
                        required
                        placeholder="Ex: Jean Baptiste"
                    />
                </div>

                <div>
                    <label>Nom :</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={onLastNameChangeHnd}
                        required
                        placeholder="Ex: RALAIBIA"
                    />
                </div>

                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={onEmailNameChangeHnd}
                        required
                        placeholder="ex: mon_email@gmail.com"
                        style={{ textTransform: "lowercase" }}
                    />
                </div>

                <div className="buttons">
                    <button type="submit">Ajouter</button>
                    <button type="button" onClick={onBackBtnClickHnd}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
