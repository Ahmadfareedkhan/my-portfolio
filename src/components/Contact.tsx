
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to a server
    console.log("Form submitted:", formData);
    
    // Show success notification
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
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
                    href="mailto:ahmadkhanfareed388@gmail.com" 
                    className="hover:underline hover:text-white/90"
                  >
                    ahmadkhanfareed388@gmail.com
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
                I'll get back to you as soon as possible
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
              <CardFooter>
                <Button type="submit" className="bg-tech-blue hover:bg-tech-blue/90 w-full">
                  Send Message
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
