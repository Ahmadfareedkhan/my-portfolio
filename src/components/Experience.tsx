
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      title: "AI Developer",
      company: "Octaloop Technologies",
      period: "June 2024 - Present",
      location: "Lahore, Pakistan",
      achievements: [
        "Developed Thumbily, an AI-powered video thumbnail generator service that automatically creates high-quality, content-relevant thumbnails for videos with minimal user input.",
        "Developed \"Donna AI,\" an advanced legal assistant for UK law using OpenAI technologies—built a full-stack application featuring real-time voice interaction capabilities, an interactive chatbot with natural conversation flow, an intelligent document processing system with semantic search functionality, and secure conversation management with automatic summarization.",
        "Contributed to AI solutions generating YouTube and Twitch highlights for gaming streams, decreasing the cost of servers by 30%, reducing the computational resources without losing efficiency."
      ]
    },
    {
      title: "Associate AI Engineer",
      company: "Zikra Infotech LLC",
      period: "May 2024 - March 2025",
      location: "Plano, Texas, United States - Remote",
      achievements: [
        "Developed Z360: an AI-powered SaaS platform that enhances business operations with integrated solutions such as live chat, centralized calling, and voice agents utilizing OpenAI.",
        "Leveraged the Pipecat framework to create a more accurate conversational agent, reducing operational costs by 50-60%."
      ]
    },
    {
      title: "Machine Learning Engineer & Python Developer",
      company: "Falcon IT Consulting",
      period: "December 2023 - May 2024",
      location: "Lahore, Pakistan",
      achievements: [
        "Developed AI-powered body size measurement and personalized footwear sizing solution using OpenCV and MediaPipe, enhancing fashion and e-commerce experiences.",
        "Created a chatbot to automate proposal generation using NLP, reducing costs and improving client satisfaction."
      ]
    },
    {
      title: "Machine Learning Intern",
      company: "DevFusion",
      period: "August 2023 - December 2022",
      location: "Lahore, Pakistan",
      achievements: [
        "Worked as a lead on a Anti-Spoofing Face Recognition Attendance System using OpenCV, YOLO v8 and trained model using CUDA.",
        "Developed a chatbot for cosmetic Business leveraging natural language processing (NLP) techniques and TensorFlow, resulting in a 30% increase in customer engagement and a 25% improvement in response accuracy."
      ]
    }
  ];

  return (
    <section id="experience" className="py-16">
      <h2 className="section-heading">Professional Experience</h2>
      
      <div className="relative pl-6 border-l-2 border-tech-teal/30">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className={`mb-10 timeline-dot animate-slide-in`} 
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <Badge className="bg-tech-teal text-white">{exp.company}</Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {exp.period} | {exp.location}
            </p>
            
            <Card className="card-hover">
              <CardContent className="pt-6">
                <ul className="list-disc list-outside ml-5 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
