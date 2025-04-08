
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Skills = () => {
  const skillCategories = [
    {
      category: "technical",
      title: "Technical Skills",
      skills: [
        { name: "Python", proficiency: 95 },
        { name: "PyTorch", proficiency: 90 },
        { name: "TensorFlow", proficiency: 85 },
        { name: "OpenCV", proficiency: 90 },
        { name: "Computer Vision", proficiency: 85 },
        { name: "NLP", proficiency: 88 },
        { name: "LLMs", proficiency: 92 },
        { name: "RAG", proficiency: 90 },
        { name: "MLOps", proficiency: 80 },
        { name: "CUDA", proficiency: 85 }
      ]
    },
    {
      category: "frameworks",
      title: "Frameworks & Tools",
      skills: [
        { name: "LangChain", proficiency: 92 },
        { name: "LangGraph", proficiency: 88 },
        { name: "CrewAI", proficiency: 85 },
        { name: "Autogen", proficiency: 83 },
        { name: "Flask", proficiency: 80 },
        { name: "FastAPI", proficiency: 85 },
        { name: "Django", proficiency: 75 },
        { name: "Gradio", proficiency: 90 },
        { name: "Streamlit", proficiency: 92 },
        { name: "Selenium", proficiency: 85 },
        { name: "Beautiful Soup", proficiency: 88 }
      ]
    },
    {
      category: "cloud",
      title: "Cloud & Infrastructure",
      skills: [
        { name: "AWS", proficiency: 82 },
        { name: "Azure", proficiency: 80 },
        { name: "GCP", proficiency: 78 },
        { name: "PostgreSQL", proficiency: 85 },
        { name: "MongoDB", proficiency: 80 },
        { name: "Git/GitHub", proficiency: 90 },
        { name: "Postman", proficiency: 85 }
      ]
    },
    {
      category: "soft",
      title: "Soft Skills",
      skills: [
        { name: "Leadership", proficiency: 90 },
        { name: "Teamwork", proficiency: 95 },
        { name: "Problem Solving", proficiency: 92 },
        { name: "Effective Communication", proficiency: 88 },
        { name: "OOP", proficiency: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16">
      <h2 className="section-heading">Skills & Expertise</h2>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              {skillCategories.map((cat) => (
                <TabsTrigger key={cat.category} value={cat.category}>
                  {cat.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {skillCategories.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  {category.skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress transition-all duration-1000 ease-out" 
                          style={{ width: `${skill.proficiency}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default Skills;
