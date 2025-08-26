/**
 * Submission Manager - Handles user problem submissions
 */
class SubmissionManager {
    constructor() {
        this.submissions = this.loadSubmissions();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Submit problem button
        const submitBtn = document.getElementById('submitProblemBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.showSubmitModal());
        }

        // Close submit modal
        const closeSubmitBtn = document.getElementById('closeSubmitProblem');
        if (closeSubmitBtn) {
            closeSubmitBtn.addEventListener('click', () => this.hideSubmitModal());
        }

        // Cancel submit
        const cancelBtn = document.getElementById('cancelSubmit');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideSubmitModal());
        }

        // Form submission
        const form = document.getElementById('problemSubmissionForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Close modal on outside click
        const modal = document.getElementById('submitProblemModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideSubmitModal();
                }
            });
        }
    }

    showSubmitModal() {
        const modal = document.getElementById('submitProblemModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideSubmitModal() {
        const modal = document.getElementById('submitProblemModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.resetForm();
        }
    }

    resetForm() {
        const form = document.getElementById('problemSubmissionForm');
        if (form) {
            form.reset();
            this.clearMessages();
        }
    }

    clearMessages() {
        const messages = document.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
    }

    showMessage(message, type = 'success') {
        this.clearMessages();
        
        const form = document.getElementById('problemSubmissionForm');
        if (!form) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        form.insertBefore(messageDiv, form.firstChild);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const problemData = this.parseFormData(formData);
        
        if (!this.validateProblemData(problemData)) {
            return;
        }

        try {
            // Add submission timestamp and ID
            problemData.id = this.generateId();
            problemData.submittedAt = new Date().toISOString();
            problemData.status = 'pending'; // pending, approved, rejected
            
            // Save submission
            this.submissions.push(problemData);
            this.saveSubmissions();
            
            // Show success message
            this.showMessage('Problem submitted successfully! We will review it and add it to our collection.', 'success');
            
            // Reset form and close modal after delay
            setTimeout(() => {
                this.hideSubmitModal();
            }, 2000);
            
        } catch (error) {
            console.error('Error submitting problem:', error);
            this.showMessage('Error submitting problem. Please try again.', 'error');
        }
    }

    parseFormData(formData) {
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'constraints' || key === 'examples') {
                // Parse constraints and examples as arrays
                data[key] = value.trim() ? value.trim().split('\n').filter(line => line.trim()) : [];
            } else if (key === 'tags') {
                // Parse tags as array
                data[key] = value.trim() ? value.trim().split(',').map(tag => tag.trim()) : [];
            } else {
                data[key] = value.trim();
            }
        }
        
        return data;
    }

    validateProblemData(data) {
        // Required fields
        const requiredFields = ['title', 'category', 'difficulty', 'description'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showMessage(`Please fill in the ${field} field.`, 'error');
                return false;
            }
        }

        // Validate title length
        if (data.title.length < 5 || data.title.length > 100) {
            this.showMessage('Title must be between 5 and 100 characters.', 'error');
            return false;
        }

        // Validate description length
        if (data.description.length < 20 || data.description.length > 2000) {
            this.showMessage('Description must be between 20 and 2000 characters.', 'error');
            return false;
        }

        // Validate email if provided
        if (data.userEmail && !this.isValidEmail(data.userEmail)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    loadSubmissions() {
        try {
            const stored = localStorage.getItem('dsa_submissions');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading submissions:', error);
            return [];
        }
    }

    saveSubmissions() {
        try {
            localStorage.setItem('dsa_submissions', JSON.stringify(this.submissions));
        } catch (error) {
            console.error('Error saving submissions:', error);
        }
    }

    getSubmissions(status = null) {
        if (status) {
            return this.submissions.filter(sub => sub.status === status);
        }
        return this.submissions;
    }

    getSubmissionById(id) {
        return this.submissions.find(sub => sub.id === id);
    }

    updateSubmissionStatus(id, status) {
        const submission = this.getSubmissionById(id);
        if (submission) {
            submission.status = status;
            submission.reviewedAt = new Date().toISOString();
            this.saveSubmissions();
            return true;
        }
        return false;
    }

    // Export submissions for admin review
    exportSubmissions() {
        const dataStr = JSON.stringify(this.submissions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `dsa_submissions_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Import submissions (for admin use)
    importSubmissions(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (Array.isArray(data)) {
                        this.submissions = data;
                        this.saveSubmissions();
                        resolve(true);
                    } else {
                        reject(new Error('Invalid data format'));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('File read error'));
            reader.readAsText(file);
        });
    }

    // Get submission statistics
    getSubmissionStats() {
        const stats = {
            total: this.submissions.length,
            pending: this.submissions.filter(s => s.status === 'pending').length,
            approved: this.submissions.filter(s => s.status === 'approved').length,
            rejected: this.submissions.filter(s => s.status === 'rejected').length,
            byCategory: {},
            byDifficulty: {}
        };

        // Count by category
        this.submissions.forEach(sub => {
            stats.byCategory[sub.category] = (stats.byCategory[sub.category] || 0) + 1;
            stats.byDifficulty[sub.difficulty] = (stats.byDifficulty[sub.difficulty] || 0) + 1;
        });

        return stats;
    }
}

// Initialize submission manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.submissionManager = new SubmissionManager();
});



