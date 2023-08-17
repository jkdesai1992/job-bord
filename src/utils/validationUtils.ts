export const validateField = (name: string, value: string): string => {
    const val = value?.trim();
    switch (name) {
        case "jobTitle":
            if (val === "") {
                return "Job title is required.";
            }
            return "";
        case "companyName":
            if (val === "") {
                return "Company name is required.";
            }
            return "";
        case "industry":
            if (val === "") {
                return "Industry name is required.";
            }
            return "";
        default:
            return "";
    }
};