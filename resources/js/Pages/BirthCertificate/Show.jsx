import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import ClipLoader from "react-spinners/ClipLoader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import useAppUrl from "@/hooks/useAppUrl";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Show = ({ birth_certificate }) => {
    const API_URL = useAppUrl();
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false); // 👈 for 3s delay

    console.log(birth_certificate);

    const fileUrl = birth_certificate.file
        ? `${API_URL}/${birth_certificate.file}`
        : null;

    useEffect(() => {
        if (!birth_certificate.file) {
            setLoading(false);
        }

        const timer = setTimeout(() => {
            setShowContent(true);
        }, 800);

        return () => clearTimeout(timer);
    }, [birth_certificate.file]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const handlePrint = () => {
        const win = window.open(fileUrl);
        win.onload = () => win.print();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold">Birth Certificates</h2>
            }
        >
            <Head title="Birth Certificates" />
            <div className="flex flex-col items-center">
                <div className="px-4 py-1">
                    {/* Spinner while waiting */}
                    {!showContent && (
                        <div className="flex justify-center items-center flex-col h-64">
                            <ClipLoader color="#2563eb" size={80} />
                            <span className="text-xl text-blue-600">
                                Loading...
                            </span>
                        </div>
                    )}

                    {/* Content appears after 3s */}
                    {showContent && (
                        <>
                            <div className="flex justify-center gap-2 font-semibold text-xl bg-gray-200 px-4 py-2 mb-1">
                                <h3>
                                    {`${birth_certificate.firstname} ${
                                        birth_certificate.middlename ?? ""
                                    } ${birth_certificate.lastname}`}
                                </h3>
                                <span>Birth Certificate</span>
                            </div>

                            {fileUrl ? (
                                <div>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handlePrint}
                                            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Print
                                        </button>
                                    </div>

                                    <div className="h-[520px] overflow-auto border border-gray-400 p-2">
                                        <Document
                                            file={fileUrl}
                                            onLoadSuccess={
                                                onDocumentLoadSuccess
                                            }
                                            onLoadError={() =>
                                                setLoading(false)
                                            }
                                            loading={null}
                                        >
                                            {!loading &&
                                                Array.from(
                                                    new Array(numPages),
                                                    (_, i) => (
                                                        <Page
                                                            key={i + 1}
                                                            pageNumber={i + 1}
                                                        />
                                                    )
                                                )}
                                        </Document>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-red-600 font-semibold text-center py-10">
                                    No birth certificate uploaded.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
