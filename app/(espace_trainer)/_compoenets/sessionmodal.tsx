"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  TagIcon,
  FolderIcon,
  Eye,
} from "lucide-react";
import { getSpecificSession } from "@/actions/session/session";

interface Props {
  id: string;
}

export default function SessionTrainingDialog({ id }: Props) {
  const [open, setOpen] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const session = await getSpecificSession({ sessionId: id });
      setSessionData(session);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (open) fetchData();
  }, [id, open]);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Eye size={16} />
          <span>View Details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        {sessionData ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {sessionData.session?.title || "Session Title"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Session Information</h3>
                <p className="text-sm text-muted-foreground">
                  {sessionData.session?.description ||
                    "No description available"}
                </p>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {sessionData.session?.startDate
                      ? format(new Date(sessionData.session.startDate), "PPP")
                      : "Start Date"}{" "}
                    -{" "}
                    {sessionData.session?.endDate
                      ? format(new Date(sessionData.session.endDate), "PPP")
                      : "End Date"}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Formateurs:</h4>
                  <ul className="list-disc list-inside text-sm">
                    {sessionData.session?.formateurs?.length > 0 ? (
                      sessionData.session.formateurs.map((formateur: any) => (
                        <li key={formateur.id}>{formateur.user.email}</li>
                      ))
                    ) : (
                      <li>No formateurs available</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Training Information</h3>
                <p className="text-sm text-muted-foreground">
                  {sessionData.session.training?.description ||
                    "No training description available"}
                </p>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {sessionData.session.training?.duration ||
                      "No duration specified"}{" "}
                    Hours
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionData.session.training?.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    )) || <span>No tags available</span>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionData.session.training?.category?.map(
                      (category: string) => (
                        <Badge key={category} variant="outline">
                          <FolderIcon className="w-3 h-3 mr-1" />
                          {category}
                        </Badge>
                      )
                    ) || <span>No categories available</span>}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading session details...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
