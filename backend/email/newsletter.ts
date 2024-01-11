import Database from "../databases/database";
import confirmNewsletter from "./confirm-newsletter";
import informSubmit from "./inform-submit";

export default async function newsletter(email: string) {
  const newsletterDB = new Database();
  const verified = await newsletterDB.verifyData(email);
  if (verified) {
    await newsletterDB.insertData(email);
    const isLetterSent = await confirmNewsletter(email);
    if(isLetterSent) {
      await newsletterDB.isEmailSent(email);
    }
    //informSubmit(email);
    return verified;
  } else if (verified === undefined) {
    return verified;
  } else {
    return verified;
  }
}
