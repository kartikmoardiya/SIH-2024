const express = require('express');
const app = express()
const router = express.Router()
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


// Function to create a PDF
function createPDF(filename, content, heading) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4' });
        const filePath = path.join(__dirname, filename);
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        const width = doc.page.width;
        const height = doc.page.height;
        let yPosition = 50;

        // Draw the heading at the top of the first page
        doc.font('Helvetica-Bold').fontSize(16);
        
        // Calculate the width of the heading text to center it
        const headingWidth = doc.widthOfString(heading.toUpperCase());
        const headingXPosition = (width - headingWidth) / 2; // Centering the heading

        doc.text(heading.toUpperCase(), headingXPosition, yPosition);
        yPosition += 30; // Adjust space after the heading

        content.forEach(item => {
            const title = item.title.toUpperCase();
            const description = item.description;
            const link = item.link;

            // Draw the title in uppercase
            doc.font('Helvetica-Bold').fontSize(14).fillColor('black');
            doc.text(title, 50, yPosition);
            yPosition += 20;

            // Draw the description in lowercase
            doc.font('Helvetica').fontSize(12).fillColor('black');
            doc.text(description.toLowerCase(), 50, yPosition);
            yPosition += doc.heightOfString(description, { width: width - 100 });

            // Add extra space before the link
            yPosition += 15; // Extra line space

            // Draw the label for the link
            doc.font('Helvetica-Oblique').fontSize(12).fillColor('black');
            doc.text('Documentation/Video Link:', 50, yPosition);

            // Draw the clickable link
            const linkXPosition = 200; // Adjust the x position of the link if needed
            doc.font('Helvetica-Oblique').fontSize(12).fillColor('blue');
            doc.text(link, linkXPosition, yPosition, { link: link, underline: true });

            // Add extra space after the link (two lines)
            yPosition += 30; // Two extra line spaces after the link

            // Check if the y_position is too low, if so, create a new page
            if (yPosition > height - 50) {
                doc.addPage();
                yPosition = 50;
            }
        });

        doc.end();

        writeStream.on('finish', () => {
            resolve(filePath);
        });

        writeStream.on('error', reject);
    });
}

// Route to create PDF
router.post('/create-pdf', async (req, res) => {
    const { content, heading } = req.body;

    if (!content || !heading) {
        return res.status(400).send('Bad request: content or heading missing');
    }

    const filename = `${heading}.pdf`;

    try {
        const filePath = await createPDF(filename, content, heading);
        res.sendFile(filePath, { headers: { 'Content-Disposition': `attachment; filename="${filename}"` } }, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
            // Optionally, delete the file after sending it
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                }
            });
        });
    } catch (error) {
        console.error('Error creating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router