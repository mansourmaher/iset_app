import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
interface Props {
  inititalPlaning: any;
}

function Planingsession({ inititalPlaning }: Props) {
  const sessionEntries = inititalPlaning;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Training Session Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionEntries.map((entry: any) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(entry.date, "PPP")}</TableCell>
                  <TableCell>{entry.startDatetime}</TableCell>
                  <TableCell>{entry.endDatetime}</TableCell>

                  <TableCell>
                    <div className="max-w-prose line-clamp-2">
                      {entry.description}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Planingsession;
