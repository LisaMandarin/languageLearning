import { qs } from "./util.js";
import jsPDF from "jspdf";

const saveBtnElem = qs('#saveBtn');

function saveAsPDF() {
    // ----- basic pdf setting -----
    const pdf = new jsPDF({
        lineHeight: 1 
    });

    pdf.setFont('NotoSansTC-VariableFont_wght');  // set Chinese font

    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margins = {left: 10, right: 10, top: 10, bottom: 10};
    const maxWidth = pageWidth - (margins.left + margins.right);
    // ----- end of basic pdf setting -----

    // ----- generate translation section -----
    const translationContent = qs('#translationArea').innerText;
    const splitTranslation = pdf.splitTextToSize(translationContent, maxWidth);  // split text to fit within the maxWidth
    console.log("Translations: ", splitTranslation);

    let currentY = margins.top;  // starting Y for translation header
    pdf.text('Translations:', margins.left, currentY);  // add header
    currentY += 10;  // starting Y for translation content
    
    for (let line of splitTranslation) {
        if (currentY + 10 > pageHeight - margins.bottom) {  // ensure enough space for new content
            pdf.addPage();
            currentY = margins.top;  // reset margin top for new page
        }
        pdf.text(line, margins.left, currentY);  // output translation content
        currentY += 10  // increase by line height
    }
    // ----- end of generate translation section -----

    currentY += 5; // gap between sections

    // ----- generate notes section -----
    if (currentY + 10 > pageHeight - margins.bottom) {  // ensure enough space for new content
        pdf.addPage();
        currentY = margins.top;  // reset margin top for new page
    }
    pdf.text('Note: ', margins.left, currentY);
    currentY += 10; // starting Y for notes content

    const notesContent = qs('#notesArea').innerText;
    const splitNotes = pdf.splitTextToSize(notesContent, maxWidth);  // split text to fit within the maxWidth
    console.log("notes: ", splitNotes)
    for (let line of splitNotes) {
        if (currentY +10 > pageHeight - margins.bottom) {
            pdf.addPage();
            currentY = margins.top;
        }
        pdf.text(line, margins.left, currentY);
        currentY += 10;
    }    
    // ----- end of generate notes section -----

    pdf.save('句句通.pdf');
}

saveBtnElem.addEventListener('click', saveAsPDF)