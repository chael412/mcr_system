import PdfViewer from "@/Components/PdfViewer";
import React from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Show = () => {
    return (
        <div>
            Show
            <PdfViewer
                pdf={`https://filesystem.chael.online/files/ryugon_birthCertificate.pdf`}
            />
        </div>
    );
};

export default Show;
