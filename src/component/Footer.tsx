import React from "react";
import "./Footer.style.css";

type Props = {
    onBack?: () => void; // Optionnel, pour un bouton Retour
    onQuit?: () => void; // Optionnel, pour un bouton Quitter
};

const Footer = ({ onBack, onQuit }: Props) => {
    return (
        <footer className="footer">
            <div className="footer-left">
                &copy; {new Date().getFullYear()} Mon Entreprise. Tous droits réservés.
            </div>

            <div className="footer-center">
                {onBack && (
                    <button className="footer-btn" onClick={onBack}>
                        ← Retour
                    </button>
                )}
                {onQuit && (
                    <button className="footer-btn" onClick={onQuit}>
                        Quitter
                    </button>
                )}
            </div>

            <div className="footer-right">
                <a href="/contact">Contact</a> | <a href="/about">À propos</a>
            </div>
        </footer>
    );
};

export default Footer;
