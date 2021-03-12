import { $Values } from "../../utility-types/dist/index";
export declare const SearchPattern: {
    CREDIT_CARD_NUMBER: string;
    DATE: string;
    TIME: string;
    EMAIL_ADDRESS: string;
    INTERNATIONAL_PHONE_NUMBER: string;
    IP_V4: string;
    IP_V6: string;
    MAC_ADDRESS: string;
    NORTH_AMERICAN_PHONE_NUMBER: string;
    SOCIAL_SECURITY_NUMBER: string;
    URL: string;
    US_ZIP_CODE: string;
    VIN: string;
};
export declare type SearchPatternType = $Values<typeof SearchPattern>;
