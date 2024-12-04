import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ShoppingBasket } from "lucide-react";
import * as React from "react";

interface EmailConfirmationTemplateProps {
  userFirstname?: string;
  confirmEmailLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailConfirmationTemplate = ({
  userFirstname,
  confirmEmailLink,
}: EmailConfirmationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm Your Account- Welcome to SnapShop</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/dropbox-logo.png`}
            width="40"
            height="40"
            alt="Dropbox"
          />
          <ShoppingBasket width={40} height={40}/>
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
                We receive an account registeration with this email address.
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Activate account
            </Button>
            <Text style={text}>
              To activate your account, please click on the button above.
              <Link style={anchor} href="https://dropbox.com">
                Visit our official website
              </Link>
            </Text>
            <Text style={text}>Happy Shopping!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailConfirmationTemplate.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as EmailConfirmationTemplateProps;

export default EmailConfirmationTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#16A34A",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
