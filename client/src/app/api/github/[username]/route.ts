import { githubQuery } from "@/lib/graphqlQuery";

export async function GET(
  req: Request,
  context: { params: { username: string; date: string } }
) {
  const { username, date } = await context.params;

  const clientDate = new Date(parseInt(date));
  const to = clientDate.toISOString(); // current time
  const from = new Date(
    clientDate.setFullYear(clientDate.getFullYear() - 1)
  ).toISOString(); // 1 year back

  const token: string = process.env.GITHUB_TOKEN || "no token cuh..";
  console.log(token);

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
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
