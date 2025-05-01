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

const FormSchema = z.object({
  apiKey: z.string().min(8),
  twitter: z.string().optional(),
  peerlist: z.string().optional(),
  leetcode: z.string().optional(),
  codeforce: z.string().optional(),
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
      twitter: user?.twitterUsername || "",
      peerlist: user?.peerlistLink || "",
      leetcode: user?.leetcodeLink || "",
      codeforce: user?.codeforcesLink || "",
      portfolio: user?.portfolio || "",
      email: user?.email || "",
      linkedIn: user?.linkedIn || "",
    },
    values: {
      apiKey: user?.apiKey || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
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
                  <div className=" cursor-pointer">
                    <Copy />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
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
          name="peerlist"
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
          name="leetcode"
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
          name="codeforce"
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
          name="portfolio"
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
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
