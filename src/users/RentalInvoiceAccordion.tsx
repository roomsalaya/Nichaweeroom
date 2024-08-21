import React from 'react';
import AppNavbar from '../component/AppNavbar'; // Adjust the import path if needed
import './RentalInvoiceAccordion.css'; // Import the CSS file

const RentalInvoiceAccordion: React.FC = () => {
    return (
        <>
            <AppNavbar />
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            บิลค่าเช่า
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the first invoice item's details.</strong> You can add more information here, such as rental amount, due date, and other relevant details.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RentalInvoiceAccordion;
