import React from "react";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsOfService } from "./TermsOfService";

interface HoveredTextProps {
  legal: string;
}

export const HoveredText: React.FC<HoveredTextProps> = ({legal}) => {
    switch (legal) {
      case 'Privacy Policy':
        return (<PrivacyPolicy />)
      case 'Terms of Service':
        return (<TermsOfService />)
      default:
        break;
    }
    return (null)
};
