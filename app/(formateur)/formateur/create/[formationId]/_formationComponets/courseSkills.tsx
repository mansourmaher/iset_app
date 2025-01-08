"use client";

import { useState } from "react";
import { Plus, X, Target, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addSkillsToCourse } from "@/actions/course/course";

const MAX_SKILL_LENGTH = 100;
const TRUNCATE_LENGTH = 30;

interface CourseSkillsProps {
  skillse?: string[];
  courseId: string;
}

export default function CourseSkills({ skillse, courseId }: CourseSkillsProps) {
  const [skills, setSkills] = useState<string[]>(skillse || []);
  const [isloading, setIsLoading] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };
  const handelSubmit = async () => {
    setIsLoading(true);
    await addSkillsToCourse(courseId, skills);
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Skills & Competences
        </CardTitle>
        <CardDescription>
          What skills will students acquire on this course?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="e.g. JavaScript, React, Node.js"
              value={currentSkill}
              onChange={(e) =>
                setCurrentSkill(e.target.value.slice(0, MAX_SKILL_LENGTH))
              }
              onKeyPress={handleKeyPress}
              className={`pr-10 ${
                currentSkill.length >= MAX_SKILL_LENGTH
                  ? "border-destructive"
                  : ""
              }`}
            />
            {currentSkill.length > 0 && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                  currentSkill.length >= MAX_SKILL_LENGTH
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {currentSkill.length}/{MAX_SKILL_LENGTH}
              </span>
            )}
          </div>
          <Button
            onClick={addSkill}
            disabled={!currentSkill.trim()}
            variant={"primary"}
            size={"sm"}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {skills.map((skill, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center gap-1 animate-in fade-in cursor-pointer"
                    >
                      {truncateText(skill, TRUNCATE_LENGTH)}

                      <X
                        className="h-3 w-3 ml-1 hover:text-destructive focus:outline-none"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{skill}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        )}
        <div className="flex justify-end">
          <Button
            onClick={handelSubmit}
            disabled={skills.length === 0 || isloading}
            variant={"primary"}
            size={"sm"}
          >
            {isloading ? "Loading..." : "Save Changes"}
          </Button>
        </div>

        {currentSkill.length >= MAX_SKILL_LENGTH && (
          <div className="flex items-center text-destructive text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            La longueur maximale de la compétence est atteinte.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
