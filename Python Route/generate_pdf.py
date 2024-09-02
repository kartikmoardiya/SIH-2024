from flask import Flask, request, send_file, abort
import os

app = Flask(__name__)


# Code For Cerate PDF
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

def create_pdf(filename, content, heading):
    c = canvas.Canvas(filename, pagesize=A4)
    width, height = A4
    y_position = height - 50

    # Draw the heading at the top of the first page
    c.setFont("Helvetica-Bold", 16)
    
    # Calculate the width of the heading text to center it
    heading_width = c.stringWidth(heading.upper(), "Helvetica-Bold", 16)
    heading_x_position = (width - heading_width) / 2  # Centering the heading

    c.drawString(heading_x_position, y_position, heading.upper())
    y_position -= 30  # Adjust space after the heading

    for item in content:
        title = item['title'].upper()
        description = item['description']
        link = item['link']
        
        # Draw the title in uppercase
        c.setFont("Helvetica-Bold", 14)
        c.setFillColorRGB(0, 0, 0)  # Reset color to black for title
        c.drawString(50, y_position, title)
        y_position -= 20

        # Draw the description in lowercase
        c.setFont("Helvetica", 12)
        for line in description.split('\n'):
            c.setFillColorRGB(0, 0, 0)  # Ensure description text is black
            c.drawString(50, y_position, line.lower())
            y_position -= 15  # Adjust line spacing

        # Add extra space before the link
        y_position -= 15  # Extra line space
        
        # Draw the label for the link
        c.setFillColorRGB(0, 0, 0)  # Set label color to black
        c.setFont("Helvetica-Oblique", 12)
        c.drawString(50, y_position, "Documentation/Video Link:")

        # Draw the clickable link separately to avoid extending the hyperlink to the label
        link_x_position = 200  # Adjust the x position of the link if needed
        c.setFillColorRGB(0, 0, 1)  # Set color to blue for the link
        link_width = c.stringWidth(link, "Helvetica-Oblique", 12)
        c.drawString(link_x_position, y_position, link)
        c.linkURL(link, (link_x_position, y_position, link_x_position + link_width, y_position + 12), relative=0)
        
        # Add extra space after the link (two lines)
        y_position -= 30  # Two extra line spaces after the link
        
        # Reset font and color after drawing the link to avoid continued formatting
        c.setFont("Helvetica", 12)
        c.setFillColorRGB(0, 0, 0)  # Reset to black
        
        # Check if the y_position is too low, if so, create a new page
        if y_position < 50:
            c.showPage()
            y_position = height - 50

    c.save()


# Route Create PDF
@app.route('/create-pdf', methods=['POST'])
def create_pdf_route():
    if not request.json or 'content' not in request.json or 'heading' not in request.json:
        abort(400)  # Bad request if JSON is invalid or required fields are missing
    
    content = request.json['content']
    heading = request.json['heading']
    filename = "./uploads/"+heading + ".pdf"
    
    # Create the PDF
    create_pdf(filename, content, heading)
    
    # Return the PDF file
    return send_file(filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=3000)


