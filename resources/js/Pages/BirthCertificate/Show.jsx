import PdfViewer from "@/Components/PdfViewer";
import React from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

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
