"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlanningSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  addPlanning,
  deletePlaning,
  getPlaning,
} from "@/actions/palnning/planning";

interface SessionEntry {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
}
interface Props {
  sessionId: string;
  inititalPlaning: Awaited<ReturnType<typeof getPlaning>>;
}
export default function Planning({ sessionId, inititalPlaning }: Props) {
  const [sessionEntries, setSessionEntries] = useState<any>(
    inititalPlaning.planning
  );
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof PlanningSchema>>({
    resolver: zodResolver(PlanningSchema),
    defaultValues: {
      date: "",
      startDatetime: "",
      endDatetime: "",
      descreption: "",
    },
  });

  const handeldeletePlan = async (id: string) => {
    await deletePlaning(id);
    window.location.reload();
  };

  const handleAddSession = async (data: z.infer<typeof PlanningSchema>) => {
    setError("");
    setSucces("");
    if (new Date(form.getValues("date")).getTime() < new Date().getTime()) {
      form.setError("date", {
        message: "Date must be in the past",
      });

      return;
    }
    startTransition(() => {
      addPlanning(data, sessionId).then((result) => {
        setError(result?.error);
        setSucces(result?.success);
        form.reset();
        window.location.reload();
      });
    });
  };

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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionEntries.map((entry: any) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(entry.date, "PP")}</TableCell>
                  <TableCell>{entry.startDatetime}</TableCell>
                  <TableCell>{entry.endDatetime}</TableCell>

                  <TableCell>
                    <div className="max-w-prose line-clamp-2">
                      {entry.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"destructive"}
                      onClick={() => handeldeletePlan(entry.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Session</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddSession)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("date") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("date") ? (
                          format(form.getValues("date"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          /> */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                required
                                type="date"
                                placeholder="Date"
                              />
                            </FormControl>
                            <FormMessage>
                              {form.formState.errors.date?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="startDatetime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="start-time"
                            type="time"
                            placeholder="Start time"
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.startDatetime?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="endDatetime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            placeholder="End time"
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.endDatetime?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="descreption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter session description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant={"primary"} className="w-full">
                Add Session
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
