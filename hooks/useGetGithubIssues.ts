import { useInfiniteQuery, } from "@tanstack/react-query";

const getGithubIssues = async (owner: string, repo: string, pageParam = 0) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?per_page=100&page=${pageParam}`);

  const responseData = await response.json();

  return responseData;
};

export const useGetGithubIssues = (owner: string, repo: string) => {
  return useInfiniteQuery({
    queryKey: ['githubIssues', owner, repo],
    queryFn: ({ pageParam = 1 }) => getGithubIssues(owner, repo, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  })
}