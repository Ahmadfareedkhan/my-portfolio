
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";

const CONTACT_EMAIL = "ahmadkhanfareed388@gmail.com";
const FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didFailSubmit, setDidFailSubmit] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDidFailSubmit(false);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Inquiry from ${formData.name}`,
          _captcha: "false"
        })
      });

      if (!response.ok) {
        throw new Error("Submission request failed");
      }

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I will get back to you shortly."
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setDidFailSubmit(true);
      toast({
        title: "Submission failed",
        description: "Please try again or use direct email below.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <h2 className="section-heading">Get In Touch</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Card className="bg-gradient-to-br from-tech-blue to-tech-teal text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription className="text-white/80">
                Feel free to reach out through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <a 
                    href={`mailto:${CONTACT_EMAIL}`} 
                    className="hover:underline hover:text-white/90"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Phone</p>
                  <a 
                    href="tel:+923320702124" 
                    className="hover:underline hover:text-white/90"
                  >
                    +92 332 070 2124
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/ahmad-ml-engineer-ai-expert" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white/90"
                  >
                    @ahmad-ml-engineer-ai-expert
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/70">GitHub</p>
                  <a 
                    href="https://github.com/Ahmadfareedkhan" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white/90"
                  >
                    @Ahmadfareedkhan
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Use the form or send a direct email if submission fails.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can I help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-3">
                <Button
                  type="submit"
                  className="bg-tech-blue hover:bg-tech-blue/90 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {didFailSubmit && (
                  <Button variant="outline" type="button" asChild className="w-full">
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20Inquiry&body=Hi%20Ahmad%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project.`}
                    >
                      Send via Email Instead
                    </a>
                  </Button>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  Form delivery is handled via a free hosted service.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
