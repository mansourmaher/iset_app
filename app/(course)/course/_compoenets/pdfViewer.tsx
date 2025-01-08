"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import React from "react";
import { useToaster } from "react-hot-toast";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getResourceById } from "@/actions/lesson/lesson";

interface PdfView {
  res:Awaited<ReturnType<typeof getResourceById>>
}

function PdfViewr({res}:PdfView) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);

  const { width, ref } = useResizeDetector();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    // <div>
    //   <Document
    //     file="https://utfs.io/f/q5pimLxVq7kFo21fYUez5Ty8Q9jadkibrLB2JmMVZ0E7HgwA"
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <p>
    //     Page {pageNumber} of {numPages}
    //   </p>
    // </div>
    <div className="flex flex-col space-y-6">
      <div ref={ref}>
        <Document
          loading={
            <div className="flex justify-center">
              <Loader className="my-24 h-6 w-6 animate-spin" />
            </div>
          }
          onLoadError={() => {
            return <div className="flex justify-center">Error loading PDF</div>;
          }}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          file={res?.url}
        >
          {new Array(numPages).fill(0).map((_, i) => (
            <Page key={i} className="w-full" pageNumber={i + 1} />
          ))}
        </Document>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Page
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>
          {/* <Slider
            defaultValue={[20]}
            max={100}
            step={1}
            className="w-[100px]"
          /> */}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === numPages}
        >
          Next Page
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default PdfViewr;
