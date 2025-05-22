import { githubQuery } from "@/lib/graphqlQuery";

export async function GET(
  req: Request,
  context: { params: { username: string } }
) {
  const { username } = await context.params;
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  const date = dateParam ? parseInt(dateParam) : Date.now();
  if (isNaN(date)) {
    return new Response(JSON.stringify({ error: "Invalid date" }), {
      status: 400,
    });
  }

  const clientDate = new Date(date);
  const to = clientDate.toISOString();
  const from = new Date(
    clientDate.setFullYear(clientDate.getFullYear() - 1)
  ).toISOString();

  const token: string = process.env.GITHUB_TOKEN || "no token cuh..";

  let hasNextPage = true;
  let endCursor: string | null = null;
  let allRepos: any[] = [];
  let userData = null;

  try {
    while (hasNextPage) {
      const body = {
        query: githubQuery,
        variables: {
          username,
          from,
          to,
          after: endCursor,
        },
      };
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch from Github");
      }
      const resData: any = await res.json();

      if (!userData) userData = resData.data.user;

      const repos = resData.data.user.reposForStarFork.nodes;
      const pageInfo = resData.data.user.reposForStarFork.pageInfo;

      allRepos.push(...repos);
      endCursor = pageInfo.endCursor;
      hasNextPage = pageInfo.hasNextPage;
    }

    userData.reposForStarFork.nodes = allRepos;

    return new Response(JSON.stringify(userData), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
