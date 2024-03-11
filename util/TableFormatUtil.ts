import { Issue } from "@/types/Issue";

export const formatDate = (issueDate: string) => {
    const date = new Date(issueDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() % 100}`
}

export const createTableEntries = (issues: { title: string; user: { login: string; }; created_at: string; }[]) => {
    const itemList: Issue[] = [];

    issues.forEach((issue) => {
        const item: Issue = {
            title: issue.title,
            author: issue.user.login,
            formattedDate: formatDate(issue.created_at)
        };
        itemList.push(item);
    });
    return itemList;
}
