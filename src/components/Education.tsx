
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Certificate } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "Superior University Lahore",
      location: "Lahore, Pakistan",
      year: "2024",
      icon: <BookOpen className="h-6 w-6" />
    }
  ];
  
  const certifications = [
    {
      name: "DeepLearning Specialization",
      issuer: "Coursera, DeepLearning.ai, Stanford Online",
      year: "2025",
      icon: <Certificate className="h-6 w-6" />
    },
    {
      name: "Machine Learning Specialization",
      issuer: "Coursera, DeepLearning.ai, Stanford Online",
      year: "2024",
      icon: <Certificate className="h-6 w-6" />
    },
    {
      name: "Introduction to Generative AI by Google",
      issuer: "Google",
      year: "2024",
      icon: <Certificate className="h-6 w-6" />
    }
  ];

  return (
    <section id="education" className="py-16">
      <h2 className="section-heading">Education & Certifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Academic Education</h3>
          {education.map((item, index) => (
            <Card key={index} className="card-hover mb-4 animate-fade-in">
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="p-2 bg-muted rounded-md">
                  {item.icon}
                </div>
                <div>
                  <CardTitle>{item.degree}</CardTitle>
                  <CardDescription>{item.institution}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.location} • {item.year}</p>
              </CardContent>
            </Card>
          ))}
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Involvement</h3>
            <Card className="card-hover animate-fade-in">
              <CardContent className="pt-6">
                <p className="font-medium">Participated in AI competition</p>
                <p className="text-sm text-muted-foreground">PUCIT • PUCON</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Professional Certifications</h3>
          {certifications.map((cert, index) => (
            <Card 
              key={index} 
              className="card-hover mb-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="p-2 bg-muted rounded-md">
                  {cert.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{cert.name}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Issued in {cert.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
