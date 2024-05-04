import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailProps {
  url?: string;
}

export const Email = ({ url }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link 🧙🏻‍♂️</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Your magic link!</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={url}>
              👉 Click here to sign in 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you didn&apos;t request this, please ignore this email.
          </Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          <Link
            href="https://pdf.facupm.dev"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            pdf-ai
          </Link>
          , a project created by
          <br />
          <Link
            href="https://facupm.dev"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            Facundo
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

Email.PreviewProps = {
  url: "https://pdf.facupm.dev",
} as EmailProps;

export default Email;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};
