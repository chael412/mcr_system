import PdfViewer from "@/Components/PdfViewer";
import React from "react";
import { pdfjs } from "react-pdf";

// ✅ point worker to CDN (fixes MIME issue on deployment)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
