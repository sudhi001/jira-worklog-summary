class WorklogForm {
    constructor(formId, dateRangeId, startDateId, endDateId) {
        this.form = document.getElementById(formId);
        this.dateRangeInput = document.getElementById(dateRangeId);
        this.startDateInput = document.getElementById(startDateId);
        this.endDateInput = document.getElementById(endDateId);
        
        if (!this.form || !this.dateRangeInput || !this.startDateInput || !this.endDateInput) {
            console.error('WorklogForm: Required elements not found');
            return;
        }
        
        this.flatpickr = null;
        this.init();
    }
    
    init() {
        this.initializeDateRangePicker();
        this.setDefaultDates();
        this.attachEventListeners();
    }
    
    initializeDateRangePicker() {
        const existingStart = this.startDateInput.value;
        const existingEnd = this.endDateInput.value;
        const today = this.getTodayDate();
        
        let initialDates = [];
        if (existingStart && existingEnd) {
            initialDates = [existingStart, existingEnd];
        } else if (existingStart) {
            initialDates = [existingStart, existingStart];
        } else {
            initialDates = [today, today];
        }
        
        this.flatpickr = flatpickr(this.dateRangeInput, {
            mode: 'range',
            dateFormat: 'Y-m-d',
            defaultDate: initialDates,
            minDate: null,
            maxDate: today,
            allowInput: false,
            clickOpens: true,
            onChange: (selectedDates, dateStr, instance) => {
                this.handleDateRangeChange(selectedDates);
            },
            onReady: (selectedDates, dateStr, instance) => {
                this.updateHiddenInputs(selectedDates.length > 0 ? selectedDates : initialDates);
            }
        });
    }
    
    setDefaultDates() {
        if (!this.startDateInput.value) {
            this.startDateInput.value = this.getTodayDate();
        }
        if (!this.endDateInput.value) {
            this.endDateInput.value = this.getTodayDate();
        }
    }
    
    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    handleDateRangeChange(selectedDates) {
        if (selectedDates.length === 2) {
            const [startDate, endDate] = selectedDates;
            this.startDateInput.value = this.formatDate(startDate);
            this.endDateInput.value = this.formatDate(endDate);
        } else if (selectedDates.length === 1) {
            this.startDateInput.value = this.formatDate(selectedDates[0]);
            this.endDateInput.value = this.formatDate(selectedDates[0]);
        }
    }
    
    updateHiddenInputs(selectedDates) {
        if (selectedDates.length >= 1) {
            this.startDateInput.value = this.formatDate(selectedDates[0]);
            if (selectedDates.length === 2) {
                this.endDateInput.value = this.formatDate(selectedDates[1]);
            } else {
                this.endDateInput.value = this.formatDate(selectedDates[0]);
            }
        }
    }
    
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    attachEventListeners() {
        this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
        this.attachQuickRangeButtons();
    }
    
    attachQuickRangeButtons() {
        const quickButtons = document.querySelectorAll('.quick-range-btn');
        quickButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const range = button.getAttribute('data-range');
                this.setQuickRange(range);
            });
        });
    }
    
    setQuickRange(range) {
        const { startDate, endDate } = this.calculateDateRange(range);
        this.setDateRange(startDate, endDate);
        this.form.submit();
    }
    
    calculateDateRange(range) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let startDate, endDate;
        
        switch (range) {
            case 'today':
                startDate = new Date(today);
                endDate = new Date(today);
                break;
                
            case 'yesterday':
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 1);
                endDate = new Date(startDate);
                break;
                
            case 'thisWeek':
                startDate = new Date(today);
                const dayOfWeek = startDate.getDay();
                const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
                startDate.setDate(diff);
                endDate = new Date(today);
                break;
                
            case 'thisMonth':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date(today);
                break;
                
            case 'lastMonth':
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
                
            case 'thisYear':
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = new Date(today);
                break;
                
            case 'lastYear':
                startDate = new Date(today.getFullYear() - 1, 0, 1);
                endDate = new Date(today.getFullYear() - 1, 11, 31);
                break;
                
            default:
                startDate = new Date(today);
                endDate = new Date(today);
        }
        
        return {
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate)
        };
    }
    
    setDateRange(startDate, endDate) {
        this.startDateInput.value = startDate;
        this.endDateInput.value = endDate;
        
        if (this.flatpickr) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            this.flatpickr.setDate([start, end], false);
        }
    }
    
    handleFormSubmit(event) {
        if (this.isDateRangeInvalid()) {
            event.preventDefault();
            this.showValidationError();
            if (this.flatpickr) {
                this.flatpickr.open();
            }
        }
    }
    
    isDateRangeInvalid() {
        return (
            this.startDateInput.value &&
            this.endDateInput.value &&
            this.endDateInput.value < this.startDateInput.value
        );
    }
    
    showValidationError() {
        alert('End Date must be greater than or equal to Start Date.');
    }
    
    destroy() {
        if (this.flatpickr) {
            this.flatpickr.destroy();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WorklogForm('worklogForm', 'dateRange', 'startDate', 'endDate');
});
