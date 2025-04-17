export const formatStatus = (status) => {
    if (!status) return '';
    
    // Convert from PENDING to Pending
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };
  
  // Format date strings
  export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Handle API errors
  export const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data.message || 'Server error';
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response from server. Please check your connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      return 'Error in request setup: ' + error.message;
    }
  };