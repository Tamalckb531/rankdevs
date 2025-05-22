import { leetcodeQuery } from "@/lib/graphqlQuery";

export async function GET(req: Request, context: any) {
  const { username } = await context.params;

  const body = {
    query: leetcodeQuery,
    variables: { username },
  };

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from LeetCode");
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
