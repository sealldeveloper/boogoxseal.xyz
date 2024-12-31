// Improved Adobe Animate to Incredibox Converter

class IncrediboxConverter {
    constructor() {
        // DOM Element References
        this.spritesheetInput = document.querySelector('input[name="spritesheet"]');
        this.jsonInput = document.querySelector('input[name="json"]');
        this.hdSelector = document.querySelector('input[name="resolution"]:checked');
        this.headsPerRowInput = document.querySelector('input[name="heads-per-row"]');
        this.submitButton = document.getElementById('submit-convert');
        
        // State variables
        this.spritesheet = null;
        this.jsonData = null;
        this.resolution = 'hd'; // default
        this.headsPerRow = 8; // default
        
        // Bind methods
        this.init();
    }

    init() {
        // Setup event listeners
        this.spritesheetInput.addEventListener('change', this.handleSpritesheetUpload.bind(this));
        this.jsonInput.addEventListener('change', this.handleJSONUpload.bind(this));
        
        // Resolution selector
        document.querySelectorAll('input[name="resolution"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.resolution = e.target.value;
            });
        });
        
        // Heads per row input
        this.headsPerRowInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.headsPerRow = isNaN(value) ? 8 : Math.max(1, Math.min(value, 20));
        });
        
        // Submit button
        this.submitButton.addEventListener('click', this.convertSpritesheet.bind(this));
    }

    // Handle spritesheet file upload
    handleSpritesheetUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.spritesheet = img;
                    this.validateInputs();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Handle JSON file upload
    handleJSONUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    this.jsonData = JSON.parse(e.target.result);
                    this.validateInputs();
                } catch (error) {
                    console.error('Invalid JSON file', error);
                    alert('The uploaded JSON file is invalid. Please check the file.');
                }
            };
            reader.readAsText(file);
        }
    }

    // Validate inputs before conversion
    validateInputs() {
        const isValid = this.spritesheet && this.jsonData;
        this.submitButton.disabled = !isValid;
        
        if (isValid) {
            // Additional validation checks
            if (!this.jsonData.frames || !Array.isArray(this.jsonData.frames)) {
                alert('JSON file does not contain valid frame data.');
                this.submitButton.disabled = true;
            }
        }
    }

    // Main conversion method
    convertSpritesheet() {
        if (!this.spritesheet || !this.jsonData) {
            alert('Please upload both spritesheet and JSON files.');
            return;
        }

        // Create canvas for processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate grid dimensions
        const totalFrames = this.jsonData.frames.length;
        const headsPerRow = Math.min(this.headsPerRow, totalFrames);
        const rows = Math.ceil(totalFrames / headsPerRow);

        // Set canvas size based on resolution
        const cellSize = this.resolution === 'hd' ? 512 : 256;
        canvas.width = headsPerRow * cellSize;
        canvas.height = rows * cellSize;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Process and draw each frame
        this.jsonData.frames.forEach((frameData, index) => {
            const sourceX = frameData.frame.x;
            const sourceY = frameData.frame.y;
            const sourceWidth = frameData.frame.w;
            const sourceHeight = frameData.frame.h;

            // Calculate grid position
            const gridX = (index % headsPerRow) * cellSize;
            const gridY = Math.floor(index / headsPerRow) * cellSize;

            // Calculate scaling and positioning
            const scale = Math.min(
                cellSize / sourceWidth, 
                cellSize / sourceHeight
            );
            const scaledWidth = sourceWidth * scale;
            const scaledHeight = sourceHeight * scale;
            
            const offsetX = (cellSize - scaledWidth) / 2;
            const offsetY = (cellSize - scaledHeight) / 2;

            // Draw the frame
            ctx.drawImage(
                this.spritesheet, 
                sourceX, sourceY, 
                sourceWidth, sourceHeight, 
                gridX + offsetX, gridY + offsetY, 
                scaledWidth, scaledHeight
            );
        });

        // Create downloadable link
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `incredibox-spritesheet-${this.resolution}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}

// Initialize the converter when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new IncrediboxConverter();
});