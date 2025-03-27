// Using EmailJS instead of nodemailer for simpler email sending without SMTP credentials

type EmailData = {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: EmailData): Promise<boolean> {
  try {
    // EmailJS configuration
    // These values should be stored in environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration");
      return false;
    }

    // Using EmailJS API directly from the server
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          subject: `Portfolio Contact from ${data.name}`,
          to_name: "Portfolio Owner",
          reply_to: data.email,
        }
      })
    });

    // Log for debugging
    console.log("EmailJS response status:", response.status);
    
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to send email:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}


