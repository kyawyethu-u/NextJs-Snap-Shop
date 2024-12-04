import {
    Body,
    Container,
    Column,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Button,
  } from "@react-email/components";
  import * as React from "react";

  
  interface resetPasswordEmailProps {
    username?: string;
    updatedDate?: Date;
    resetPasswordLink: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const resetPasswordEmail = ({
    username,
    updatedDate,
    resetPasswordLink
  }: resetPasswordEmailProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(updatedDate);
  
    return (
      <Html>
        <Head />
        <Preview>You requested to update the password for your SnapShop account</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
                <h2 style={logoTitle}>SnapShop</h2>
            </Section>
            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>
            <Section style={content}>
              <Text style={paragraph}>Hi {username},</Text>
              <Text style={paragraph}>
                You updated the password for your SnapShop account on{" "}
                {formattedDate}. If this was you, then no further action is
                required.
              </Text>
              <Text style={paragraph}>
                However if you did NOT perform this password change, please
                reset your account password immediately.
              </Text>
              <Button style={button} href={resetPasswordLink}>
               Change new password</Button>

              <Text style={paragraph}>
                Still have questions? Please contact{" "}
                <Link style={link} href= {resetPasswordLink}>
                 SnapShop Support
                </Link>
              </Text>
              <Text style={paragraph}>
                Thanks,
                <br />
                SnapShop Support Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  resetPasswordEmail.PreviewProps = {
    username: "SnapShop user",
    updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
  } as resetPasswordEmailProps;
  
  export default resetPasswordEmail;
  
  const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";
  
  const main = {
    backgroundColor: "#efeef1",
    fontFamily,
  };
  
  const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
  };
  
  const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
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

  const content = {
    padding: "5px 20px 10px 20px",
  };
  
  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
  };

  const logoTitle = {
    fontsize: "22px",
    fontWeight: "600",

  }
  
  const sectionsBorders = {
    width: "100%",
    display: "flex",
  };
  
  const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
  };
  
  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  };
  
  const link = {
    textDecoration: "underline",
  };