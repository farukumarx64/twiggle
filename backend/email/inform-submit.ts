import axios from "axios";
const elasticEmailApiKey = process.env.NEXT_PUBLIC_ELASTIC_EMAIL_KEY;

export default async function informSubmit(email: string) {
  const apiUrl = "https://api.elasticemail.com/v2/email/send";

  const params = {
    apiKey: elasticEmailApiKey,
    from: "faruku777@gmail.com",
    to: "f.umaridris.mail@gmail.com",
    subject: "+1 Twiggle Subscriber",
    bodyHtml: `<p>You just got +1 subscriber to your twiggle newsletter! <br>His email is ${email}`,
  };

  try {
    const response = await axios.post(apiUrl, null, { params });
    console.log("Email sent: Confirmation email sent");
  } catch (error: any) {
    console.error("Error sending email:", error.message);
  }
}
