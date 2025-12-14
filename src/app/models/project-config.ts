export interface ProjectConfig {
    slug: string;
    name: string;
    location: string;
    bannerImage: string;
    shortDescription: string;
    highlights?: ProjectHighlight[];
    amenities?: ProjectAmenity[];
    gallery?: string[];
    floorPlans?: FloorPlan[];
    locationInfo?: LocationInfo;
    brochure?: BrochureInfo;
    seo?: SeoInfo;
}

export interface ProjectHighlight {
    label: string;
    value: string;
}

export interface ProjectAmenity {
    key: string;
    label: string;
}

export interface FloorPlan {
    type: string;
    area: string;
    image: string;
}

export interface LocationLandmark {
    label: string;
    distance: string;
}

export interface LocationInfo {
    address: string;
    mapEmbedUrl: string;
    landmarks?: LocationLandmark[];
}

export interface BrochureInfo {
    title: string;
    subtitle: string;
}

export interface SeoInfo {
    title: string;
    description: string;
    image?: string;
}