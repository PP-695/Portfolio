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
    
    // Enhanced logging to check if environment variables are loaded
    console.log("Environment variables check:", {
      serviceIdExists: !!serviceId,
      templateIdExists: !!templateId,
      publicKeyExists: !!publicKey
    });
    
    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration");
      return false;
    }

    // Using EmailJS API directly from the server with improved request
    const payload = {
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
    };
    
    console.log("Sending email with payload:", JSON.stringify(payload, null, 2));
    
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      },
      body: JSON.stringify(payload)
    });

    // Enhanced logging
    console.log("EmailJS response status:", response.status);
    const responseText = await response.text();
    console.log("EmailJS response body:", responseText || "(empty response)");
    
    if (response.status === 200) {
      console.log("Email sent successfully");
      return true;
    } else {
      console.error("Failed to send email. Status:", response.status, "Response:", responseText);
      return false;
    }
  } catch (error) {
    console.error("Error sending email:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return false;
  }
}


