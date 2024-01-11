import axios from "axios";
const elasticEmailApiKey = process.env.NEXT_PUBLIC_ELASTIC_EMAIL_KEY;

export default async function confirmNewsletter(email: string) {
  const apiUrl = "https://api.elasticemail.com/v2/email/send";

  const params = {
    apiKey: elasticEmailApiKey,
    from: "faruku777@gmail.com",
    to: email,
    subject: "+1 Twiggle Community Member!",
    bodyHtml: `<div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h2>Welcome to Twiggle's Newsletter Community!</h2>
        </div>
        <p>Hello there!</p>
        <p>We are thrilled to inform you that you've successfully subscribed to Twiggle's newsletter! Welcome to our community of digital enthusiasts, where we share the latest updates, tips, and exciting news related to Twiggle and the ever-evolving world of online presence.</p>
        <p>At Twiggle, our mission is to simplify and enhance the way you navigate the digital landscape. As a valued subscriber, you'll be among the first to receive exclusive content, feature announcements, and insider insights to help you make the most of your Twiggle experience.</p>
        <p>Stay tuned for upcoming newsletters that will provide you with valuable information, inspiration, and perhaps a surprise or two! We're excited to embark on this journey together and are grateful to have you as part of our Twiggle community.</p>
        <p>If you have any questions, suggestions, or just want to say hello, feel free to reply to this email. Your feedback is incredibly important to us.</p>
        <p>Thank you for choosing Twiggle. Let's make your online journey extraordinary!</p>

        <div style="margin-top: 20px; text-align: center; font-size: 0.8em;">
            <p>Best regards,<br>Faruk Umar Idris<br>Twiggle Team<br></p>
        </div>
    </div>
</div>`,
  };

  try {
    const response = await axios.post(apiUrl, null, { params });
    console.log("Email sent: Newsletter Email Sent");
    return true;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
  }
}
