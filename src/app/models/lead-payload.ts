export interface LeadPayload {
    projectSlug: string;
    projectName: string;
    name: string;
    phone: string;
    email?: string;
    message?: string;
  
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    gclid?: string;
    userAgent?: string;
}