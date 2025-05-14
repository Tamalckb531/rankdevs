"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import useUserStore from "@/store/useUserStore";
import useInfo from "@/hooks/useInfo";
import Spinner from "../Spinner";
import { useEffect } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  firstname: z.string().min(2).max(12),
  lastname: z.string().min(2).max(15),
  isHireable: z.boolean(),
  imgLink: z.string().optional(),
  bio: z.string().min(8).max(65),
  location: z.string().min(5),
  apiKey: z.string().min(8),
  twitterUsername: z.string().optional(),
  peerlistLink: z.string().optional(),
  leetcodeLink: z.string().optional(),
  codeforcesLink: z.string().optional(),
  portfolio: z.string().optional(),
  email: z.string().email().optional(),
  linkedIn: z.string().optional(),
});

export function InfoForm() {
  const user = useUserStore((state) => state.user);
  const { mutate, isPending, isError, error } = useInfo();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apiKey: "",
      twitterUsername: "",
      peerlistLink: "",
      leetcodeLink: "",
      codeforcesLink: "",
      portfolio: "",
      email: "",
      linkedIn: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        apiKey: user.apiKey || "",
        twitterUsername: user.twitterUsername || "",
        peerlistLink: user.peerlistLink || "",
        leetcodeLink: user.leetcodeLink || "",
        codeforcesLink: user.codeforcesLink || "",
        portfolio: user.portfolio || "",
        email: user.email || "",
        linkedIn: user.linkedIn || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isError && !isPending) {
    }
  }, [isPending, isError]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { apiKey, ...rest } = data;

    // Convert empty strings to null
    const sanitizedData = Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );
    mutate(sanitizedData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-3 lg:w-[50vw] md:w-[60vw]"
      >
        <h1 className=" text-center text-2xl">Add or edit your Info </h1>
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ApiKey</FormLabel>
              <FormControl>
                <div className=" flex items-center justify-center w-full gap-2">
                  <Input readOnly {...field} />
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(field.value);
                      toast("apiKey copied to the clipboard");
                    }}
                  >
                    <Copy />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Copy this apiKey and paste it in your code editor
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter : </FormLabel>
              <FormControl>
                <Input placeholder="TamalCDip" {...field} />
              </FormControl>
              <FormDescription>Add your twitter username here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="peerlistLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peerlist : </FormLabel>
              <FormControl>
                <Input placeholder="https://peerlist.io/tamaldip" {...field} />
              </FormControl>
              <FormDescription>Add your peerlist account here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leetcodeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leetcode : </FormLabel>
              <FormControl>
                <Input placeholder="TamalCDip" {...field} />
              </FormControl>
              <FormDescription>Add Your Leetcode username here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codeforcesLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code-Force </FormLabel>
              <FormControl>
                <Input placeholder="TamalCDip" {...field} />
              </FormControl>
              <FormDescription>
                Add your codeforce username here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio : </FormLabel>
              <FormControl>
                <Input placeholder="tamal.com" {...field} />
              </FormControl>
              <FormDescription>Add your Portfolio link here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email : </FormLabel>
              <FormControl>
                <Input placeholder="ckbtamaldipnew@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Add your Email account here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn : </FormLabel>
              <FormControl>
                <Input placeholder="TamalCDip" {...field} />
              </FormControl>
              <FormDescription>Add your LinkedIn username here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <div className=" block p-2 text-red-400 my-3">{error.message}</div>
        )}
        <Button type="submit" disabled={isPending || !user}>
          {isPending ? (
            <div className=" flex items-center justify-center gap-2">
              <Spinner /> <span>Please Wait....</span>
            </div>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </Form>
  );
}
